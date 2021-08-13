'use strict'

const chai = require('chai')
const sinon = require('sinon')
const fileSystem = require('../../file-system')

// ストレージとしてfile-systemの実装が使われるようにする
process.env.npm_lifecycle_event = 'file-system'
const app = require('../../app')

// Sinon.JSのアサーションAPIをChaiのアサーションAPIを介して利用できるようにする
const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

// Chai HTTPプラグインの利用
chai.use(require('chai-http'))

// 毎回テスト実行後にSinon.JSによる副作用をもとに戻す
afterEach(() => sinon.restore())

// GET /api/todosでcompletedが指定されていない場合のテスト
describe('app', () => {
  describe('GET /api/todos', () => {
    describe('completedが指定されていない場合', () => {
      it('fetchAll()で取得したToDoの配列を返す', async () => {
        const todos = [
          { id: 'a', title: 'ネーム', completed: false },
          { id: 'b', title: '下書き', completed: true }
        ]
        // スタブの生成
        sinon.stub(fileSystem, 'fetchAll').resolves(todos)

        // リクエストの送信
        const res = await chai.request(app).get('/api/todos')

        // レスポンスのアサーション
        assert.strictEqual(res.status, 200)
        assert.deepEqual(res.body, todos)
      })

      it('fetchAll()が失敗したらエラーを返す', async() => {
        // スタブの生成
        sinon.stub(fileSystem, 'fetchAll').rejects(new Error('fetchAll()失敗'))

        // リクエストの送信
        const res = await chai.request(app).get('api/todos')

        // レスポンスのアサーション
        assert.strictEqual(res.status, 500)
        assert.deepEqual(res.body, {error: 'fetchAll()失敗'})
      })
    })
  })
})