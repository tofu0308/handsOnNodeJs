'use strict'

const http = require('http')
const next = require('next')
// const Server = require('socket.io')
const WebSocket = require('ws')

let todos = [
  {id: 1, title: 'ネーム', completed:false},
  {id: 2, title: '下書き', completed:true},
]

// ToDoのIDの値を管理するための変数
let id = 2

const dev = process.env.NODE_ENV  !== 'production'
const nextApp = next({dev})

nextApp.prepare().then(
  () => {
    // Next.jsのリクエストハンドラを引数にhttp.createServer()を実行
    const server = http.createServer(nextApp.getRequestHandler()).listen(3000)

    // Socket.IOのServerインスタンス生成処理を削除
    // const io = Server(server)

    // WebSocket.Serverのインスタンス処理を生成
    const ws = new WebSocket.Server({ server })

    // 接続中の全クライアントに現在のToDo一覧を送信する関数
    function sendTodosToOpenClient() {
      ws.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(todos))
        }
      });
    }

    // todos名前空間で接続待機
    // const ioTodos = io.of('/todos')
    // ioTodos.on('connection', socket => {
    ws.on('connection', socket => {  
      console.log('connected')

      // 接続したクライアントにToDo一覧を送信
      // socket.emit('todos', todos)
      socket.send(JSON.stringify(todos))

      /*
      // 接続したクライアントからの各種イベントに対応
      socket
        // ToDo作成
        .on('createTodo', title => {
          if(typeof title !== 'string' || !title) {
            return
          }

          const todo = { id: id+=1, title, completed:false}
          todos.push(todo)
          ioTodos.emit('todos', todos)
        })

          // ToDoのcompletedの更新
          .on('updateCompleted', (id, completed) => {
            todos = todos.map(todo => 
              todo.id === id ? {...todo, completed} : todo
            )
            ioTodos.emit('todos', todos)
          })

          // ToDo削除
          .on('deleteTodo', id => {
            todos = todos.filter(todo => todo.id !== id)
            ioTodos.emit('todos', todos)
          })
        */

      socket.on('message', message => {
        const {type, data} = JSON.parse(message)
        switch(type) {
          // TODO作成
          case 'createTodo': {
            const title = data
            if(typeof title !== 'string' || !title) return

            const todo = {id: id+=1, title, completed: false}
            todos.push(todo)
            return sendTodosToOpenClient()
          }

          // ToDoのCompletedの更新
          case 'updateCompleted': {
            const {id, completed} =data
            todos = todos.map(todo =>  todo.id === id ? {...todo, completed} : todo )
            return sendTodosToOpenClient()
          }

          // ToDoの削除
          case 'deleteTodo': {
            const id = data
            todos = todos.filter(todo=> todo.id !== id)
            return sendTodosToOpenClient()
          }

        }
      })
    })
  },
  (err) => {
    console.error(err)
    process.exit(1)
  }
)
