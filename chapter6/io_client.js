import io from 'socket.io-client'

const socket = io()

// 接続オプションを指定する場合（ここでは切断時に再接続しないように設定）
// const socket = io({reconnection: false})

// サーバが別ドメインの場合
// const socket = io('https:/socket.io-server.com')

// 特定の名前空間に接続する場合
// const socket = io('/namspace1')

// 上記パターンの組み合わせ
/**
const socket = io(
  'https:/socket.io-server.com/namspace1',
  {reconnection: false}
)
*/

// サーバとの通信はクライアント側もEventEmitterで行う
socket.emit('registerName', userName)

// 任意のイベント名でサーバからデータを受信
socket.on('notifyNewComer', message => {
  console.log(message)
})