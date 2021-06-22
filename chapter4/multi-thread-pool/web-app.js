'use strict'

const http = require('http')
const fibonacci = require('../fibonacci')
const cpuCount = require('os').cpus().length
const ThreadPool = require('../thread-pool')

// CPUコア数と同じサイズのスレッドプールを生成
const threadPool = new ThreadPool(cpuCount, `${__dirname}/fibonacci.js`)

http.createServer((req, res) => {
  const n = Number(req.url.substr(1))
  if(Number.isNaN(n)) return res.end()

  const result = await threadPool.executeInThread(n)
  res.end(result.toString())
}).listen(3000)

// loadtestを使った負荷テスト
// npx loadtest -c 100 -t 10 http://localhost:3000/30

/*
[Tue Jun 22 2021 21:39:22 GMT+0900 (GMT+09:00)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Tue Jun 22 2021 21:39:27 GMT+0900 (GMT+09:00)] INFO Requests: 569, requests per second: 114, mean latency: 820.9 ms
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO 
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Target URL:          http://localhost:3000/30
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Max time (s):        10
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Concurrency level:   100
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Agent:               none
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO 
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Completed requests:  1162
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Total errors:        0
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Total time:          10.029106503000001 s
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Requests per second: 116
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Mean latency:        822.7 ms
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO 
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO Percentage of the requests served within a certain time
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO   50%      822 ms
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO   90%      1025 ms
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO   95%      1105 ms
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO   99%      1143 ms
[Tue Jun 22 2021 21:39:32 GMT+0900 (GMT+09:00)] INFO  100%      1154 ms (longest request)
*/