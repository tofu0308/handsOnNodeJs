const events = require('events')

try {
  new events.EventEmitter()
  // 'error'イベントリスナの登録をコメントアウト
  // .on('error', err => console.log('errorイベント'))
  // └これを採用すると'error'イベントにリスナ登録されてcatchが出なくなる
  .emit('error', new Error('エラーハンドリング'))
} catch(err) {
  console.log('catach')
}