// httpモジュールでWebサーバを起動するコード
const http = require('http')

// サーバオブジェクト（EventEmitterのインスタンス）生成
const server = http.createServer()

// requestイベントのリスナ登録
server.on('request', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write('Hello world')
  res.end()
})

// listening(リクエストの受付開始)イベントのリスナ登録
server.on('listening', () => {/* ... */})

// errorイベントのリスナ登録
server.on('error', (err) => {/* ... */})

// close(リクエスト受付終了)イベントのリスナ登録
server.on('close', () => {/* ... */})

// サーバー起動
server.listen(8000)

// 実行してhttp://localhost:8000/にアクセスすると画面確認可能

// EventEmitterの利用

// FizzBuzz
function createFizzBuzzEventEmitter(until) {
  const eventEmitter = new events.EventEmitter()
  process.nextTick(() => {_emitFizzBuzz(eventEmitter, until)})
  return eventEmitter
}

// async/await構文が使えるようにイベントを発行する部分を別の関数に切り離す
async function _emitFizzBuzz(eventEmitter, until) {
  eventEmitter.emit('start')
  let count = 1

  while(count <= until) {
    await new Promise(resolve => setTimeout(resolve, 100))
    if(count % 15 === 0) {
      eventEmitter.emit('FizzBuzz', count)
    } else if(count % 3 === 0) {
      eventEmitter.emit('Fizz', count)
    } else if(count % 5 === 0) {
      eventEmitter.emit('Buzz', count)
    }
    count += 1
  }
  eventEmitter.emit('end')
}

function startListener() { console.log('start') }
function fizzListener(count) { console.log('Fizz', count) }
function buzzListener(count) { console.log('Buzz', count) }
function fizzBuzzListener(count) { console.log('FizzBuzz', count) }
function endListener() {
  console.log('end')

  // thisはEventEmitterのインスタンス
  // すべてのイベントからリスナを削除する
  this
    .off('start', startListener)
    .off('Fizz', fizzListener)
    .off('Buzz', buzzListener)
    .off('FizzBuzz', fizzBuzzListener)
    .off('end', endListener)
}

createFizzBuzzEventEmitter(40)
  .on('start', startListener)
  .on('Fizz', fizzListener)
  .on('Buzz', buzzListener)
  .once('FizzBuzz', fizzBuzzListener) // FizzBuzzイベントだけonceで登録
  .on('end', endListener)


createFizzBuzzEventEmitter(0)
  .on('start', startListener)
  .on('end', endListener)
