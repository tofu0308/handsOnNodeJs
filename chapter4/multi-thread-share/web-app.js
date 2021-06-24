'use strict'

const http = require('http')
const cpuCount = require('os').cpus().length
const ThreadPool = require('../thread-pool')

// 長さ1のInt32Arrayインスタンスを生成
const sharedArrayBuffer = new SharedArrayBuffer(4)
const int32Array = new Int32Array(sharedArrayBuffer)

const threadPool = new ThreadPool(
  cpuCount,
  `${__dirname}/fibonacci.js`,
  {workerData: int32Array} // Int32Arrayインスタンスをスレッドプールに渡す
)

// メインスレッド側のカウンタ
let count = 0;

http.createServer(async (req, res) => {
  // /callsに対してはトラッキングしているリクエストを数回返す
  if(req.url === '/calls') {
    return res.end(`Main = ${count}, Sub = ${int32Array[0]}`)
  } 

  const n = Number(req.url.substr(1))
  if(Number.isNaN(n)) return res.end()

  count += 1
  const result = await threadPool.executeInThread(n)
  res.end(result.toString())
}).listen(3000)

// npx loadtest -c 200 -t 10 http://localhost:3000/10
