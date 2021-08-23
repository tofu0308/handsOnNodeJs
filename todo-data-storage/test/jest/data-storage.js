'use strict'

// ID順にToDoをソート
function sortTodoById(todos) {
  return todos.sort((a, b) => a.id > b.id ? 1 : -1)
}

 // 各データストレージに対するテストをまとめて記述
for(const dataStorageName of ['file-system', 'sqlite', 'leveldb']) {
  const { fetchAll, fetchByCompleted, create, update, remove } = require(`../../${dataStorageName}`)

  describe(dataStorageName, () => {
    // 毎回のテスト実行前に全てのToDoを削除
    beforeEach(async () => {
      const allTodos = await fetchAll()
      await Promise.all(allTodos.map(({ id }) => remove(id)))
    })

    describe('create(),fetchAll()', () => {
      test('create()で作成したToDoをfetchAll()で取得できる', async () => {
        // 初期状態の確認
        expect(await fetchAll()).toEqual([])

        // ToDoを1件追加
        const todo1 = { id: 'a', title: 'ネーム', completed: false }
        await create(todo1)
        expect(await fetchAll()).toEqual([todo1])

        // ToDoをさらに2件追加
        const todo2 = { id: 'b', title: '下書き', completed: true }
        await create(todo2)
        const todo3 = { id: 'c', title: 'ペン入れ', completed: false }
        await create(todo3)
        expect(sortTodoById(await fetchAll())).toEqual([todo1, todo2, todo3])
      })
    })

    describe('fetchByCompleted()', () => {
      test(
        'completedの値が引数で指定したものと等しいToDoだけを取得できる',
        async () => {
          // 初期状態の確認
          expect(await fetchByCompleted(true)).toEqual([])
          expect(await fetchByCompleted(false)).toEqual([])

          // ToDoを3件追加
          const todo1 = { id: 'a', title: 'ネーム', completed: false }
          await create(todo1)
          const todo2 = { id: 'b', title: '下書き', completed: true }
          await create(todo2)
          const todo3 = { id: 'c', title: 'ペン入れ', completed: false }
          await create(todo3)

          // fetchByCompleted()の結果を確認
          expect(await fetchByCompleted(true)).toEqual([todo2])
          expect(await fetchByCompleted(false)).toEqual([todo1, todo3])


        }
      )
    })
  })
}