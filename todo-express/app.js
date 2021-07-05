'use strict'

const express = require('express');

let todos = [
  {id: 1, title: 'ネーム', completed:false},
  {id: 2, title: '下書き', completed:true},
]

const app = express()
app.use(express.json())

// ToDo一覧の取得
app.get('/api/todos', (req, res) => {
  if(!req.query.completed) {
    return res.json(todos)
  }
  // completedクエリパラメータを指定された場合はToDoをフィルタリング
  const completed = req.query.completed === 'true'
  res.json(todos.filter(todo => todo.completed === completed))
})

// ToDoのIDの値を管理するための変数
let id = 2

// ToDoの新規登録
app.post('/api/todos', (req, res, next) => {
  const {title} = req.body
  if(typeof title !== 'string' || !title) {
    // titileがリクエストに含まれない場合はステータスコード400(Bad Request)
    const err =new Error('title is required')
    err.statusCode = 400
    return next(err)
  }

  // ToDoの作成
  const todo = {id: id+=1, title, completed:false}
  todos.push(todo)

  // ステータスコード201（Created）で結果を返す
  res.status(201).json(todo)
}) 

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({error: err.message})
})

app.listen(3000)

/**
動作確認用コード

// フィルタリングの確認
node --experimental-repl-await
require('isomorphic-fetch')

await fetch('http://localhost:3000/api/todos?completed=true')
console.log(_.status, await _.json())

await fetch('http://localhost:3000/api/todos?completed=false')
console.log(_.status, await _.json())
*/

/**
// fetch()でPOSTリクエストを送信
node --experimental-repl-await
require('isomorphic-fetch')

await fetch('http://localhost:3000/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({title: 'ペン入れ'})
})

console.log(_.status, await _.json())

await fetch('http://localhost:3000/api/todos')
console.log(_.status, await _.json())

// エラーハンドリングが機能していることを確認
await fetch('http://localhost:3000/api/todos', {method: 'POST'})
*/


// Next.jsによるルーティング処理のための追加
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})

nextApp.prepare().then(
  // pageディレクトリ内の各Reactコンポーネントに対するサーバーサイドルーティング
  () => app.get('*', nextApp.getRequestHandler()),
  err => {
    console.error(err)
    process.exit(1)
  }
)