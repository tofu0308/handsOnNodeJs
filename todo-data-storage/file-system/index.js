
'use strict'
const { extname } = require('path')
const { readdir, readFile, writeFile, unlink } = require('fs').promises

exports.fetchAll = async () => {
  // 同一ディレクトリ内に存在するJSONファイルをすべて取得
  const files = (await readdir(__dirname))
    .filter(file => extname(file) === '.json')
  return Promise.all(
    files.map(file =>
      readFile(`${__dirname}/${file}`, 'utf8').then(JSON.parse)
    )
  )
}
exports.fetchByCompleted = completed => exports.fetchAll()
  .then(all => all.filter(todo => todo.completed === completed))
exports.create = todo =>
  writeFile(`${__dirname}/${todo.id}.json`, JSON.stringify(todo))
exports.update = async (id, update) => {
  const fileName = `${__dirname}/${id}.json`
  return readFile(fileName, 'utf8').then(
    content => {
      const todo = {
        ...JSON.parse(content),
        ...update
      }
      return writeFile(fileName, JSON.stringify(todo)).then(() => todo)
    },
    // ファイルが存在しない場合はnullを返し、それ以外はそのままエラーにする
    err => err.code === 'ENOENT' ? null : Promise.reject(err)
  )
}
exports.remove = id => unlink(`${__dirname}/${id}.json`)
  .then(
    () => id,
    // ファイルが存在しない場合はnullを返し、それ以外はそのままエラーにする
    err => err.code === 'ENOENT' ? null : Promise.reject(err)
  )
/**
動作確認

node --experimental-repl-await

require('isomorphic-fetch') 
const baseUrl = 'http://localhost:3000/api/todos'
await fetch(baseUrl) 

// todoを2件作成
for(const title of ['ネーム', '下書き']) {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({ title })
  })
  console.log(res.status, await res.json())
}

// titleがない場合（エラーケース）
(await fetch(baseUrl, {
  method: 'POST',
  headers: {
    'Content-Type': "application/json"
  },
  body: '{}'
})).status

// ToDo一覧の再取得
await fetch(baseUrl).then(res => res.json())

// 1件目のTodoをcompletedに
await fetch(`${baseUrl}/${_[0].id}/completed`, { method: 'PUT' }) 


// ToDo一覧の再取得(変更の確認)
await fetch(baseUrl).then(res => res.json())

// 存在しないIDを指定
(await fetch(`${baseUrl}/foo/completed`, {method: 'PUT'})).status

// 1件目のTodoをcompletedを解除
await fetch(`${baseUrl}/${_[0].id}/completed`, { method: 'DELETE' })

console.log(_.status, await _.json())

// 存在しないID指定すると404エラー
(await fetch(`${baseUrl}/foo/completed`, { method: 'DELETE' })).status 

// ToDo一覧の再取得(変更の確認)
await fetch(baseUrl).then(res => res.json())

// TODOの削除
(await fetch(`${baseUrl}/${_[0].id}`, { method: 'DELETE' })).status 

// 存在しないID指定すると404エラー
(await fetch(`${baseUrl}/foo`, { method: 'DELETE' })).status 

// ToDo一覧の再取得(変更の確認)
await fetch(baseUrl).then(res => res.json())

*/



/*
sqlite3の操作
node --experimental-repl-await

const sqlite3 = require('sqlite3').verbose() 

// メモリ上にデータを保存する設定でデータベースオブジェクトを生成
const db = new sqlite3.Database(':memory:') 


// util.promisify()によるdb.run()の変換
const dbRun = util.promisify(db.run.bind(db)) 

// CREATE TABLE文の実行
await dbRun(`CREATE TABLE todo ( 
  id TEXT PRIMARY KEY, 
  title TEXT NOT NULL, 
  completed BOOLEAN NOT NULL 
)`) 

// データの作成
await dbRun(`INSERT INTO todo VALUES ('1', 'ネーム', false)`) 

// idはユニークでなければならないため、同じ値で別のデータを作成しようとすると失敗する
await dbRun(`INSERT INTO todo VALUES ('1', '下書き', false)`) 


// 静的プレースホルダ（プリペアドステートメント）の作成
const statement = db.prepare('INSERT INTO todo VALUES (?, ?, ?)') 

// 静的プレースホルダの実行
await util.promisify(statement.run.bind(statement))('2', '下書き', false) 

// 動的プレースホルダ
await dbRun('INSERT INTO todo VALUES (?, ?, ?)', '3', 'ペン入れ', false) 

// パラメータを配列で渡すことも可能（静的、動的ともに）
await dbRun('INSERT INTO todo VALUES (?, ?, ?)', ['4', '仕上げ', false]) 

await dbRun( 
  'INSERT INTO todo VALUES ($id, $title, $completed)', 
  { $id: '5', $title: '出稿', $completed: false } 
) 

// データの取得
const dbAll = util.promisify(db.all.bind(db)) 
await dbAll('SELECT * FROM todo') 
await dbAll('SELECT id, title FROM todo') 

// WHERE句を使用
await dbAll(`SELECT * FROM todo WHERE id = '2'`) 

// db.get()とプレースホルダを使う例
const dbGet = util.promisify(db.get.bind(db)) 
await dbGet('SELECT * FROM todo WHERE id = ?', '3') 


// データの更新
await dbRun('UPDATE todo SET completed = true') 
await dbAll('SELECT * FROM todo') 

await dbRun('UPDATE todo SET completed = ? WHERE id = ?', false, '4') 
await dbAll('SELECT * FROM todo') 

// UPDATE文は該当する行がなくてもエラーを返さない
await dbRun('UPDATE todo SET completed = ? WHERE id = ?', false, '100') 

// changesプロパティで更新された行の数を参照できる
db.run( 
  'UPDATE todo SET completed = ? WHERE id = ?', 
  false, 
  '100', 
  function() { 
    console.log(this) 
  } 
)

const dbRun2 = function() { 
  return new Promise((resolve, reject) => 
    db.run.apply(db, [ 
      ...arguments, 
      function(err) { 
        err ? reject(err) : resolve(this) 
      } 
    ]) 
  ) 
}
await dbRun2('UPDATE todo SET completed = ? WHERE id = ?', false, '100') 

// データの削除
// 1を削除
await dbRun2('DELETE FROM todo WHERE id = ?', '1') 
await dbAll('SELECT * FROM todo') 

// すべて削除
await dbRun2('DELETE FROM todo') 
await dbAll('SELECT * FROM todo') 

// トランザクションの制御

// 同時に複数のTodoを登録できるが、1件でも登録に失敗したら1件も登録しない
async function createTodos(todos) { 
  await dbRun('BEGIN TRANSACTION') 
  try { 
    for (const todo of todos) { 
      await dbRun( 
        'INSERT INTO todo VALUES (?, ?, ?)', 
        todo.id, 
        todo.title, 
        todo.completed 
      ) 
    } 
  } catch(err) { 
    console.error(err) 
    // エラーがあった場合はロールバック 
    return dbRun('ROLLBACK TRANSACTION') 
  } 
  // 全件の登録に成功したらコミット 
  return dbRun('COMMIT TRANSACTION') 
} 

await createTodos([ 
  { id: '1', title: 'ネーム', completed: false }, 
  { id: '2', title: '下書き', completed: false } 
]) 

await dbAll('SELECT * FROM todo') 

// title TEXT NOT NULL, に違反するのでエラー(以下は全件追加されない)
await createTodos([ 
  { id: '3', title: 'ペン入れ', completed: false }, 
  { id: '4', title: null, completed: false }, 
  { id: '5', title: '出稿', completed: false } 
]) 


// Function.prototype.bind()とthisについて
class MyClass { 
  method1() { 
    console.log('method1') 
  } 
  method2() { 
    this.method1() 
  } 
} 

const myInstance = new MyClass() 
myInstance.method1() 
myInstance.method2() 

// method2がエラーになるケース
const myInstanceMethod1 = myInstance.method1 
myInstanceMethod1() 

const myInstanceMethod2 = myInstance.method2 
myInstanceMethod2() 

// bindすると回避できる
Function.prototype.bind 

function add(a, b) { 
  return (Number(this) || 0) + a + b 
} 

// 直接実行
add(1, 2) 

// 何も指定せずにbind()した関数を実行
add.bind()(1, 2) 

// thisが1になるようbind()した関数を実行
add.bind(1)(1, 2) 

// thisが1、第一引数が2になるようbind()した関数を実行
add.bind(1, 2)(2) 

// thisが1、第一引数が2、第二引数が3になるようbind()した関数を実行
add.bind(1, 2, 3)() 

// もともとの関数は引数の数が2
add.length 

// thisと第一引数をバインドした関数は引数の数が1
add.bind(1, 2).length 


myInstanceMethod2.bind(myInstance)() 

// 元のthisとは別のものをbind()に渡すことも可能
const anotherThis = { method1: () => console.log('another method1') } 

myInstanceMethod2.bind(anotherThis)() 
*/


