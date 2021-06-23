'use strict'
const {parentPort, workerData} = require('worker_threads')

parentPort.postMessage(
  workerData.buffer,
  // postMessage()の第2引数に転送オブジェクトを指定
  workerData.transfer ? [workerData.buffer] : []
)