'use strict'

const level = require('level')
const { join } = require('path')

// 同じディレクトリ内のleveldbディレクトリにデータベースの情報を保存
const db = level(join(__dirname, 'leveldb'))

exports.fetchAll = async() => {
  const result = []

  for await(const v of db.createValueStream({gt: 'todo:', lt: 'todo;'})) {
    result.push(JSON.parse(v))
  }
  return result
}

exports.fetchByCompleted = async completed => {
  const promises = []

  for await(const id of db.createValueStream({
    // セカンダリインデックスの検索
    gt: `todo-completed-${completed}:`,
    lt: `todo-completed-${completed};`,
  })) {
    promises.push(
      db.get(`todo:${id}`).then(JSON.parse)
    )
  }
  return Promise.all(promises)
}

exports.create = todo => db.batch()
  // ToDoの保存
  .put(`todo:${todo.id}`, JSON.stringify(todo))
  // セカンダリインデックスの保存
  .put(`todo-completed-${todo.completed}:${todo.id}`, todo.id)
  .write()

exports.update = (id, update) => 
db.get(`todo:${id}`).then(
  content => {
    const oldTodo = JSON.parse(content)
    const newTodo = {
      ...oldTodo,
      ...update
    }

    let batch = db.batch().put(`todo:${id}`, JSON.stringify(newTodo))
    // completedの値が変化した場合は、セカンダリインデックスも操作する
    if(oldTodo.completed !== newTodo.completed) {
      batch = batch
        .del(`todo-completed-${oldTodo.completed}:${id}`)
        .put(`todo-completed-${newTodo.completed}:${id}`, id)
    }
    return batch.write()
  }, 
  // TODOが存在しない場合はnullを返し、それ以外はそのままエラーにする
  err => err.notFound ? null : Promise.reject(err)
)

exports.remove = id =>
  db.get(`todo:${id}`).then(
    content => db.batch()
      .del(`todo:${id}`)
      .del(`todo-completed-true:${id}`)
      .del(`todo-completed-false:${id}`)
      .write()
      .then(() => id),
      // TODOが存在しない場合はnullを返し、それ以外はそのままエラーにする
      err => err.notFound ? null : Promise.reject(err)
  )

/*
levelパッケージによるLevelDBの操作

node --experimental-repl-await
const level = require('level') 

// データベースオブジェクトの生成
// （引数にはデータベースの状態を保存するパスを指定する）
const db = level('leveldb') 

// データの保存
const todo1 = JSON.stringify({ id: '1', title: '表紙', completed: false }) 
await db.put('todo:1', todo1) 

// データの取得
await db.get('todo:1') 

// 存在しないキー（エラー）
await db.get('todo:2') 

// エラー内容の識別
_error.notFound

// 保存されたToDoの全件取得
// createReadStream()は引数無しで実行するとデータベースの全データを取得する
for await (const data of db.createReadStream()) { 
  console.log(data.key, data.value) 
} 

// ToDoだけを取得する場合は、引数でキーの範囲を指定する
':'.charCodeAt(0) 
String.fromCharCode(_ + 1) 

// キーの値が'todo:'より大きく、'todo;'より小さいデータを取得 
for await (const data of db.createReadStream({ gt: 'todo:', lt: 'todo;' })) { 
  console.log(data.key, data.value) 
} 

// デーの削除
await db.del('todo:1') 
await db.get('todo:1') 　// 存在しないのでエラー

await db.del('todo:1')  // delに存在しないキーを渡してもエラーにならない

// db.batchによるバッチ更新
// 更新処理を配列として引数に渡す
await db.batch([ 
  { type: 'put', key: 'city:2021', value: '東京' }, 
  { type: 'put', key: 'city:2016', value: 'リオ' }, 
  { type: 'put', key: 'city:2012', value: 'ロンドン' }, 
  { type: 'del', key: 'city:2021' } 
]) 

for await (const data of db.createReadStream({ gt: 'city:', lt: 'city;' })) { 
  console.log(data.key, data.value) 
} 

// 引数無しで実行してメソッドチェーンで更新処理を記述
// Entering editor mode (^D to finish, ^C to cancel)
await db.batch() 
  .put('city:2008', '北京') 
  .put('city:2004', 'アテネ') 
  .put('city:2000', 'シドニー') 
  .del('city:2016') 
  .write() 

for await (const data of db.createReadStream({ gt: 'city:', lt: 'city;' })) { 
  console.log(data.key, data.value) 
} 

// dbインスタンスをクローズ
await db.close()
*/
