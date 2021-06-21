'use strict'
const http = require('http')
const {Worker} = require('worker_threads')


http.createServer((req, res) => {
  const n = Number(req.url.substr(1))
  if(Number.isNaN(n)) return res.end()

  // コンストラクタの第二引数で値を渡しつつサブスレッドを生成
  new Worker(`${__dirname}/fibonacci.js`, {workerData: n})
    // サブスレッドから受け取った結果をレスポンスとして返す
    .on('message', result => res.end(result.toString()))
}).listen(3000) // 3000portでリクエストを待機

// loadtestを使った負荷テスト
// npx loadtest -c 100 -t 10 http://localhost:3000/30

/*
[Mon Jun 21 2021 21:06:42 GMT+0900 (GMT+09:00)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Mon Jun 21 2021 21:06:47 GMT+0900 (GMT+09:00)] INFO Requests: 558, requests per second: 112, mean latency: 808.5 ms
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO 
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Target URL:          http://localhost:3000/30
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Max time (s):        10
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Concurrency level:   100
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Agent:               none
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO 
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Completed requests:  1162
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Total errors:        0
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Total time:          10.030008615 s
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Requests per second: 116
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Mean latency:        828.9 ms
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO 
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO Percentage of the requests served within a certain time
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO   50%      838 ms
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO   90%      1011 ms
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO   95%      1042 ms
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO   99%      1175 ms
[Mon Jun 21 2021 21:06:52 GMT+0900 (GMT+09:00)] INFO  100%      1250 ms (longest request)

*/