'use strict'
const http = require('http')

// Socket.IO
const Server = require('socket.io')

const server = http.createServer((req, res) => {
  // 通常のHTTPリクエストのハンドリング
}).listen(3000)

// Serverインスタンスを生成
const io = Server(server)

// オプションを指定する場合（ここでは接続を許可するオリジンを指定）
// const io = Server(server, {origins: allowed.origin.com})

// 生成されたServerインスタンス(io)はEventEmitterであり、クライアントとのデータのやり取りはイベントを介して行われる
// 新しいクライアントからの接続に伴うconnectionイベント
io.on('connection',socket => {
  // 任意のイベント名でクライアントにデータを送信
  socket.emit('greeting', 'Hello')

  // 任意のイベント名でクライアントからデータを受信
  socket.on('registerName', name => {
    // 接続している全クライアントに任意のイベント名でデータを送信
    io.emit('notifyNewComer', `${name} joined`)

    // または、このSocketインスタンスを介して接続しているクライアント以外の全クライアントにデータを送信
    socket.broadcast.emit('notifyNewComer', `${name} joined`)
  })
});

// 任意の名前空間を指定し、その中でクライアントとのやり取りを実装
io.of('.namespace1').on('connection', socket => {
  // 名前空間に接続する全クライアントにデータを送信
  io.of('/namespace1').emit('socketEvent', 'foo')
})

// ルームと呼ばれるコミュニケーションスコープを定義できる
io.on('connection', socket => {
  // socketをroomAに入れる
  socket.join('roomA')

  // roomAに存在するsocketのみにデータを送信
  io.to('roomA').emit('someEvent', 'foo')

  // socketうをroomAから出す
  socket.leave('roomA')
})

// ミドルウェア
io.use((socket, next) => {
  // socketが生成される度に実行される
  // 認証を行う例
  if( isLogin(socket.request.headers)) {
    next()
  } else {
    next(new Error('Need login'))
  }
})

io.of('/namespace').use((socket, next) => {
  // 特定の名前空間に対してミドルウェアを登録する
})

io.on('connection', socket => {
  socket.use((packet, next) => {
    // クライアントからの通信の度に実行される
  })
})