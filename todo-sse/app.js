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

// 全クライアントに対するSSE送信関数を保持する配列
let sseSenders = []
// SSEのIDを管理するための変数
let sseId = 1;

// ToDo一覧の取得（SSE）
app.get('/api/todos/events', (req, res) => {
  // タイムアウトを抑止
  // req.socket.setTimeout(0)
  // 動作確認のため1秒にする
  req.socket.setTimeout(1000)
  res.set({
    // Content-TypeでSSEであることを示す
    'Content-Type': 'text/event-stream'
  });

  // クライアントにSSEを送信する関数を作成して登録
  const send = (id, data) => res.write(`id: ${id}\ndata: ${data}\n\n`)
  sseSenders.push(send)

  // リクエスト発生時点の状態を送信
  send(sseId, JSON.stringify(todos))

  // リクエストがクローズされたらレスポンスを終了してSSE送信関数を配列から削除
  req.on('close', () => {
    res.end()
    sseSenders = sseSenders.filter(_send => _send !== send)
  })
});

// ToDoの更新に伴い、全クライアントに対してSSEを送信する
function onUpdateTodos() {
  sseId += 1
  const data = JSON.stringify(todos)
  sseSenders.forEach(send => send(sseId, data));
}

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

  onUpdateTodos();
}) 

// 指定されたIDのToDoを取得するためのミドルウェア(練習問題5-1)
　app.use('/api/todos/:id(\\d+)', (req, res, next) => {
  const targetId = Number(req.params.id)
  const todo = todos.find(todo => todo.id === targetId)

  if(!todo) {
    const err = new Error('ToDo not found.')
    err.statusCode = 404
    return next(err)
  }

  req.todo = todo
  next()
})

// ToDoのCompletedの設定、解除(練習問題5-2)
app.route('/api/todos/:id(\\d+)/completed')
  .put((req, res) => {
    req.todo.completed = true
    res.json(req.todo)
  })
  .delete((req, res) => {
    req.todo.completed = false
    res.json(req.todo)
  })

// ToDoの削除(練習問題5-3)
app.delete('/api/todos/:id(\\d+)', (req, res) => {
  todos = todos.filter((todo => todo !== req.todo ))
  res.status(204).end() // 中身を指定せずにend()でレスポンスを完了することで、空のレスポンスを返す
})


// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({error: err.message})
})

app.listen(3000)

/**
動作確認用コード

node --experimental-repl-await
require('isomorphic-fetch')

await fetch('http://localhost:3000/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({title: 'ペン入れ'})
})


console.log(_.status, await _.text())
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