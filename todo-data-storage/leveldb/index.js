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
