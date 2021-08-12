// テストダブルとSinon.js

// todo-data-storage/内で実行
const sinon = require('sinon')

// console.log()のスパイを生成
sinon.spy(console, 'log')
console.log('foo')

// 正しいアサーション
sinon.assert.calledWith(console.log, 'foo')
sinon.assert.calledOnce(console.log)

// 誤ったアサーション
sinon.assert.calledWith(console.log, 'bar')
sinon.assert.calledTwice(console.log)

// 引数無しで実行すると、オリジナルの実装のないスパイを生成できる
const spy = sinon.spy()
setTimeout(spy, 0)
sinon.assert.calledOnce(spy)