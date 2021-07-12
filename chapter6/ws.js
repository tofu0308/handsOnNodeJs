'use strict'
const http = require('http')

// ws
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
  // 通常のHTTPリクエストのハンドリング
}).listen(3000)

// Serverインスタンス生成
const ws = new WebSocket.Server({ server })

// またはhttp.Serverインスタンスを使わず直接生成
// const ws = new WebSocket.Server({ port: 3000 })

// 認証を行いたい場合は、ServerのコンストラクタのverifyClientオプションに認証のための関数を指定する
/*
const ws = new WebSocket.Server({ 
  verifyClient:({
    origin, // クライアントからのオリジン
    req, // リクエストオブジェクト(req.headersでヘッダ情報を参照可能)
    secure // セキュアかどうか(wssプロトコルでの接続かどうか)
  }) => {
    // 接続を許可するかどうかをbooleanで返す
    return true
  },
  //  認証を非同期に行う場合は、verifuClientの第荷引数コールバックを取る
  //  verifyClient:(info, cb) => {
  //    cb(true)
  //  }
  server
 })
*/

// 新しいクライアントからの接続に伴うconnectionイベント
ws.on('connection', socket => {
  // クライアントにデータを送信
  socket.send('Hello')

  // クライアントからデータを受信
  socket.on('message', name => {
    // 接続している全クライアントにイベントを送信
    ws.clients.forEach(client => {
      // 接続がオープンか確認する
      if(client.readyState === WebSocket.OPEN) {
        client.send(`${name} joined`)
      }
    })
  })
})

// WebScoket接続の作成
const socket = new WebSocket('ws://localhost:3000')

// 接続完了のリスナを設定
socket.addEventListener('open', () => {
  // ...
})

// メッセージ受信のリスナを設定
socket.addEventListener('message', message => {
  // サーバでsend()の引数に渡したものはmessage.dataから取得できる
  const data = message.data
  // ...
})

/*
  サーバにメッセージを送信する
   必要に応じて、状態がOPENになっているかどうか確認する
  または、openイベントリスナの中で実行する
*/
if(sokect.readyState === WebSocket.OPEN) {
  socket.send('Taro')
}

// 接続を閉じる
socket.close()

// 送信側
socket.send(JSON.stringify({foo:1}))

//　受信側
// サーバーサイドの場合
socket.on('message', message => {
  const data = JSON.parse(message)
})

// クライアントサイドの場合
socket.addEventListener('message', message => {
  const data = JSON.parse(message.data)
})
