'use strict'

const fibonacci = require('../fibonacci')
const { parentPort } = require('worker_threads')

// messageイベントの監視によりメインスレッドからのメッセージの受信を待機、受信したらフィボナッチ数を計算してメインスレッドに送信
parentPort.on('message', n => parentPort.postMessage(fibonacci(n)))