// テストダブルとSinon.js

// スパイ
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


// スタブ
// todo-data-storage/内で実行
const sinon = require('sinon')

sinon.stub(String.prototype, 'startsWith').returns(true)

'foo'.startsWith('f')
'foo'.startsWith('x')

// 正しいアサーション
sinon.assert.calledWith(String.prototype.startsWith, 'f')
sinon.assert.calledTwice(String.prototype.startsWith)

// 誤ったアサーション
sinon.assert.calledWith(String.prototype.startsWith, 'y')
sinon.assert.calledOnce(String.prototype.startsWith)


// モック
// todo-data-storage/内で実行
const sinon = require('sinon')

const mock = sinon.mock(JSON).expects('parse')
  // { "foo": 1 } という引数で1回以上2回以下実行されることを期待
  .withExactArgs('{ "foo" : 1 }').atLeast(1).atMost(2)
  // 戻り値として{}を返す
  .returns({})

// この時点ではエラー
mock.verify()

// 期待を満たす引数で実行
JSON.parse('{ "foo" : 1 }')
mock.verify()

// 期待に反する引数で実行
JSON.parse('{ "bar" : 1 }')

// 期待に反する回数を実行
JSON.parse('{ "foo" : 1 }')
JSON.parse('{ "foo" : 1 }')

sinon.restore()


// JestのテストダブルのAPI
const jest = require('jest-mock')
const expect = require('expect')
const exp = require('constants')

//jest.spyOn()
// console.log()に対するモックを生成
jest.spyOn(console, 'log')
console.log('foo')

// 正しいアサーション
expect(console.log).toHaveBeenCalledWith('foo')
expect(console.log).toHaveBeenCalledTimes(1)
// 誤ったアサーション
expect(console.log).toHaveBeenCalledWith('bar')
expect(console.log).toHaveBeenCalledTimes(2)
// 固定値を返す
console.log.mockReturnValue(true)
console.log('foo')
// 代替実装を関数（ここでは第一引数に第2引数を足す）で定義
console.log.mockImplementation((arg1, arg2) => arg1 + arg2)
console.log('foo', 'bar')

// jest.fn()
// 実装のないモック
const emptyMock = jest.fn()
// モックの実行
emptyMock(10, 20)
// アサーション
expect(emptyMock).toHaveBeenCalledTimes(1)

// 実装の定義されたモック
const mulutiplyMock = jest.fn((a, b) => a * b)
mulutiplyMock(10, 20)
// アサーション
expect(mulutiplyMock).toHaveBeenCalledTimes(1)

// jest.spyOn() で振る舞いを変化させてしまった関数をもとに戻す
jest.restoreAllMocks() 
