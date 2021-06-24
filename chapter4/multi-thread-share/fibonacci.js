'use strict'

const fibonacci = require('../fibonacci')

// workerDataでInt32Arrayのインスタンスを受け取る
const { workerData: int32Array, parentPort } = require('worker_threads')

parentPort.on('message', (n) => {
  parentPort.postMessage(fibonacci(n))

  // 処理の度に最初の値をインクリメントする
  // int32Array[0] += 1
  // →　Atomics.add()でint32Array()の0番目に1を足す。(スレッド間の値の競合を考慮)
  Atomics.add(int32Array, 0, 1)　// http://localhost:3000/calls Main = 16554, Sub = 16554  値は一致するはず
  
})