'use strict'

const fileSystem = require('../../file-system')
const uuid = require('uuid')
const request = require('supertest')

// ストレージとしてfile-systemの実装が使われるようにする
process.env.npm_lifecycle_event = 'file-system'
const app = require('../../app')

// モジュールのモックを生成
jest.mock('../../file-system')
jest.mock('uuid')

// テスト完了後にサーバーを終了
afterAll(() => app.close())

describe('app', () => {
  describe('GET /api/todos', () => {
    describe('completedが指定されていない場合', () => {
      test('fetchAll()で取得したToDoの配列を返す', async () => {
        const todos = [
          { id: 'a', title: 'ネーム', completed: false },
          { id: 'b', title: '下書き', completed: true }
        ]
        // モックが返す値の指定
        fileSystem.fetchAll.mockResolvedValue(todos)

        // リクエストの送信
        const res = await request(app).get('/api/todos')

        // レスポンスのアサーション
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(todos)
      })
      test('fetchAll()が失敗したらエラーを返す', async () => {
        // モックが返す値の指定
        fileSystem.fetchAll.mockRejectedValue(new Error('fetchAll()失敗'))

        // リクエストの送信
        const res = await request(app).get('/api/todos')

        // レスポンスのアサーション
        expect(res.statusCode).toBe(500)
        expect(res.body).toEqual({error: 'fetchAll()失敗'})
      })
    })
  })
})
