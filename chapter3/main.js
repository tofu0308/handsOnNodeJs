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

// 注:EventEmitterのリスナは常に同期的に実行される
const fooEventEmitter = new events.EventEmitter()
fooEventEmitter.on('foo', () => {
  console.log('fooイベントリスナの実行')
})
console.log('fooイベント発行', fooEventEmitter.emit('foo'))

// EventEmitterとメモリリーク
/**
 一つのEventEmitterインスタンスに11個以上のイベントリスナを登録すると警告が出力される
 */

 const barEventEmitter = new events.EventEmitter()

 for(let i=0; i<11; i++) {
   barEventEmitter.on('bar', () => {console.log('bar')})
 }

/**
  > (node:54288) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 bar listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
*/

const messageEvenetEmitter = new events.EventEmitter();

{
  const listner = () => console.log('Hello')
  messageEvenetEmitter.on('message', listner)
}

// リスナを100個まで登録出来るようにする
const bazEventEmitter = new events.EventEmitter()
bazEventEmitter.setMaxListeners(100)　// 0またはInfinityを指定すると、警告が出なくなる
for(let i=0; i<100; i++) {
  bazEventEmitter.on('bar', () => {console.log('baz')})
}

// 全EventEmitterを対象に、MaxListenersを100にする
/**
events.EventEmitter.defaultMaxListeners = 100
 */

// EventEmitterの継承
class FizzBuzzEventEmitter extends events.EventEmitter {
  async start(until) {
    this.emit('start')
    let count = 1

    while(true) {
      if(count % 15 === 0) {
        this.emit('FizzBuzz', count)
      } else if (count % 3 === 0) {
        this.emit('Fizz', count)
      } else if (count % 5 === 0) {
        this.emit('Buzz', count)
      }

      count += 1
      if( count >= until) {
        break;
      }

      await new Promise((resolve) => {setTimeout(resolve, 100)})
    }
    this.emit('end')
  }
}

// 手前から移植
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

new FizzBuzzEventEmitter()
.on('start', startListener)
.on('Fizz', fizzListener)
.on('Buzz', buzzListener)
.on('FizzBuzz', fizzBuzzListener)
.on('end', endListener)
.start(20)


// コールバックパターン形式でイベントリスナを登録
const http = require('http')
const { fstat } = require('node:fs')
const { Stream } = require('node:stream')
const { Z_STREAM_END } = require('node:zlib')

// サーバオブジェクトの生成及びrequestイベントのリスナ登録
const server = http.createServer((req, res)=> {
  // クライアントからのリクエストに対する処理
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write('コールバックパターン形式でイベントリスナを登録')
  res.end()
})

// ポートの監視及びlisteningイベントリスナ登録
server.listen(8000, () => {
  // ポートの待機を介した際の処理
})


// EventEmitterからのasyncイテラブルの生成
const eventAEmitter = new events.EventEmitter()

// asyncイテラブルの生成
const eventAIterable = events.on(eventAEmitter, 'eventA')

// リスナが一つ登録されていることを確認
eventAEmitter.listeners('eventA')

// プログラムの実行がawait...ofの先にすすめるようIIAFE（即時実行async関数式）を使う
(async()=> {
  for await (const a of eventAIterable) {
    // aの値はeventAをemit()したときの引数の配列
    if(a[0] === 'end') {
      // endが渡されたらループを抜ける
      break
    }
    console.log('eventA', a)
  }
})()

// eventAをemit()
eventAEmitter.emit('eventA', 'Hello')

// 再度eventAをemit()
eventAEmitter.emit('eventA', 'Hello', 'World')

// endを渡してeventAをemit()
eventAEmitter.emit('eventA', 'end')

// ループを抜けたたためリスな登録が解除されることを確認
eventAEmitter.listeners('eventA')



// EventEmitterのPromise化
const eventBEmitter = new events.EventEmitter()
const eventBPromise = events.once(eventBEmitter, 'eventB')

eventBPromise.then((arg) => { console.log('eventB発生', arg) })
eventBEmitter.emit('eventB', 'Hello', 'World')
// eventBが一度でも発行されたらeventBPromiseはfulfilledになるため、以降のイベント発行には反応しない

eventBEmitter.emit('eventB', 'one more') // false
// リスナが存在しないため、emit()がfalseを返す、'eventB発生'のログ出力もなし


// ストリーム
// ストリームの基本
function copyFileWithSteram(src, dest, cb) {
  // ファイルから読み込むストリームを生成
  fs.createReadStream(src)
    // ファイルから書き込みストリームを生成し、pipe()でつなぐ
    .pipe(fs.createWriteStream(dest))
    // 完了時にコールバックを呼び出す
    .on('finish', cb)
}

fs.writeFileSync('src.txt', 'Hello, Stream') // ファイル生成
copyFileWithSteram('src.txt', 'dest.txt', ()=>{console.log('copied')})　// コピー実行

// コピーする際にファイル内容を暗号化する
fs.createReadStream('src.txt')
  // 暗号化処理を追加
  .pipe(crypto.createHash('sha256'))
  .pipe(fs.createWriteStream('dest2.txt'))
  .on('finish',  ()=>{console.log('encrypted and copied')})

// 読み込みストリーム
const readStream = fs.createReadStream('src.txt')
readStream
  // readableイベントリスナ登録
  .on('readable', () => {
    console.log('readble')
    let chunk
    // 現在読み込み可能なデータをすべて読み込む
    while ((chunk = readStream.read()) !== null) {
      console.log(`chunk; ${chunk.toString()}`)
    }
  })
  // endイベントリスナ登録
  .on('end', () => console.log('end'))


/*
 実行時は下記のフラグを利用する
node --experimental-repl-await
*/

class HelloReadableStream extends stream.Readable {
  constructor(options){
    super(options)
    this.langages = ['JavaScript', 'Python', 'Java', 'C#']
  }

  _read(size) {
    console.log('_read(')
    
    let langage
    while((langage = this.langages.shift())) {
      // push()でデータを流す（push()がfalseを返したらそれ以上流さない）
      if(!this.push(`Hello, ${langage}!\n`)) {
        console.log('読み込み中断(push()がfalseを返したらそれ以上流さない)')
        return
      }
    }
    console.log('読み込み完了（最後にnullを流してストリームの終了を通知する）')
    this.push(null)
  }
}

const helloReadableStream = new HelloReadableStream()

helloReadableStream
  .on('readable', () => {
    console.log('readable')
    let chunk
    while((chunk = helloReadableStream.read()) !== null) {
      console.log(`chunk: ${chunk.toString()}`)
    }
  })
  .on('end', () => console.log('end'))

// 書き込みストリーム
// ファイルへの書き込み
const filteWriteStream = fs.createWriteStream('dest3-2-3.txt')
filteWriteStream.write('Hello\n')
filteWriteStream.write('Hello\n')
filteWriteStream.end

fs.readFileSync('dest3-2-3.txt', 'utf8')

class DelayLogStream extends stream.Writable {
  constructor(options) {
    // objectMode: trueを指定するとオブジェクトをデータとして流せる
    super({ objectMode: true, ...options })
  }

  _write(chunk, encoding, callback) {
    console.log('_write()')
    // messageプロパティ（文字列）、delayプロパティ（数値）を含むオブジェクトがデータとして流れてくることを期待
    const {message, delay} = chunk

    // delayで指定したミリ秒だけ遅れてmessageをログに出す
    setTimeout(() => {
      console.log(message)
      callback()
    }, delay)
  }
}

const delayLogStream = new DelayLogStream()
delayLogStream.write({message: 'すぐ出力される', delay: 0})
delayLogStream.write({message: '1秒後に出力される', delay: 1000})
delayLogStream.end({message: '0.1病後に出力される（終了）', delay: 100})

// ※_read(),_write()は外部から直接実行してはならない