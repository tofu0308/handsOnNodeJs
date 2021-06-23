

// メッセージのシリアライズ方法の指定
const dataObj = {lastDayOfHeisei: new Date(2019, 3, 30, 9)}
const stringifiedDataObj = JSON.stringify(dataObj)

JSON.parse(stringifiedDataObj)
// { lastDayOfHeisei: '2019-04-30T00:00:00.000Z' }

typeof _.lastDayOfHeisei
// string

const circular = {bar: 1}
// 循環参照させる
circular.foo = circular

//　JSONが循環参照に対応しないためエラーが発生する
JSON.stringify(circular)
// Uncaught TypeError: Converting circular structure to JSON


// 構造化クローンアルゴリズム
// v8.serialize(),v8.deserialize
const circularWithDate = {lastDayOfHeisei: new Date(2019, 3, 30, 9)}
circularWithDate.foo = circularWithDate

// シリアライズ
const serializeCircularWithDate = v8.serialize(circularWithDate)

// デシリアライズ
v8.deserialize(serializeCircularWithDate)

// Dateのインスタンスであることを確認
_.lastDayOfHeisei instanceof Date


// child_processモジュール
const child = child_process.fork('./ipc/web-app')
child.send(3000)

// 構造化クローンアルゴリズムを使いたい場合
const child = child_process.fork('./ipc/web-app', {serialization: 'advanced'})

child_process.exec(
  'echo "Hello, World',
  
  // 成功した場合、コマンドの標準出力を取得して表示
  (err, stdout) => err? console.error(err) : console.log(stdout)
)

// スレッド間での値の転送
function useMaybeTransfer(transfer) {
  // 1GBのArray Bufferを生成
  const buffer = new ArrayBuffer(1024 * 1024 * 1024)

  //　現在時刻を記録
  const start = perf_hooks.performance.now()

  new worker_threads.Worker(
    './maybe-transfer.js',
    {
      workerData: { buffer, transfer },
      //transferListプロパティに転送対象オブジェクトを指定
      transferList: transfer ? [buffer] : []
    }
  ).on('message', () => {
    // サブスレッドから値が戻ってくるまでにかかった時間を出力
    console.log(perf_hooks.performance.now() - start )
  })
  // サブスレッドに渡した値がどう見えるか確認
  console.log(buffer)
}

// Ctrl+D
// 転送を利用する場合
useMaybeTransfer(true)

// 転送を利用しない場合
useMaybeTransfer(false)


