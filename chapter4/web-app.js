'use strict'
const http = require('http')
const fibonacci = require('./fibonacci')

// サーバーオブジェクトの生成とリクエストハンドラの設定
http.createServer((req, res) => {
  // http://localhost:3000/10 へのリクエストではreq.urlは10になるので、そこから1文字目目を取り除いてnを取得する
  const n = Number(req.url.substr(1))

  // 数値かどうかを判定し、数値でなければ無視
  if(Number.isNaN(n)) return res.end()

  const result = fibonacci(n)

  // res.end()で計算結果をレスポンスとして返す
  res.end(result.toString())
}).listen(3000) // 3000portでリクエストを待機

/**
 *  node web-app を実行しwebサーバを起動し、以下を確認する/10は一例、他の数値に置き換え可
 *  http://localhost:3000/10
 */
// loadtestを使った負荷テスト
// npx loadtest -c 100 -t 10 http://localhost:3000/30

/*
[Wed Jun 16 2021 20:24:13 GMT+0900 (日本標準時)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Wed Jun 16 2021 20:24:18 GMT+0900 (日本標準時)] INFO Requests: 635, requests per second: 127, mean latency: 726.8 ms
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO 
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Target URL:          http://localhost:3000/30
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Max time (s):        10
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Concurrency level:   100
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Agent:               none
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO 
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Completed requests:  1274
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Total errors:        0
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Total time:          10.004880091 s
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Requests per second: 127
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Mean latency:        753.8 ms
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO 
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO Percentage of the requests served within a certain time
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO   50%      781 ms
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO   90%      787 ms
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO   95%      789 ms
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO   99%      790 ms
[Wed Jun 16 2021 20:24:23 GMT+0900 (日本標準時)] INFO  100%      802 ms (longest request)
*/