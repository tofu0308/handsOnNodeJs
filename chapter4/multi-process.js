'use strict'
const {fork, setupMaster} = require('cluster')

console.log('メインプロセス', process.pid)

// サブプロセスが実行するファイルの指定
setupMaster({
  exec: `${__dirname}/web-app`
})

// CPUコアの数だけプロセスをフォーク
const cpuCount = require('os').cpus().length
for(let i=0; i < cpuCount; i++) {
  const sub = fork()
  console.log('サブプロセス', sub.process.pid)
}

//  node multi-process    
/**
メインプロセス 14728
サブプロセス 14729
サブプロセス 14730
サブプロセス 14731
サブプロセス 14732
サブプロセス 14733
サブプロセス 14734
サブプロセス 14735
サブプロセス 14736
 */

/**
 *  node multi-process を実行しwebサーバを起動し、以下を確認する/10は一例、他の数値に置き換え可
 *  http://localhost:3000/10
 */
// loadtestを使った負荷テスト
// npx loadtest -c 100 -t 10 http://localhost:3000/30
/**
[Wed Jun 16 2021 20:45:15 GMT+0900 (日本標準時)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Wed Jun 16 2021 20:45:20 GMT+0900 (日本標準時)] INFO Requests: 2383, requests per second: 477, mean latency: 205.7 ms
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO 
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Target URL:          http://localhost:3000/30
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Max time (s):        10
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Concurrency level:   100
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Agent:               none
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO 
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Completed requests:  4808
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Total errors:        0
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Total time:          10.000550836 s
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Requests per second: 481
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Mean latency:        205.6 ms
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO 
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO Percentage of the requests served within a certain time
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO   50%      205 ms
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO   90%      213 ms
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO   95%      217 ms
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO   99%      228 ms
[Wed Jun 16 2021 20:45:25 GMT+0900 (日本標準時)] INFO  100%      262 ms (longest request)
*/