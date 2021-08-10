// 練習問題7-1

const { get } = require("http")

// 第一引数にファイル名、第二引数にToDoの配列を取り、ToDoの配列をcsv形式でファイルに保存する関数
function writeTodosToCsv(file, todos) { 
  return fs.promises.writeFile(file, `id,title,completed\n${todos.map( 
    ({ id, title, completed }) => `${id},${title},${completed}` 
  ).join('\n')}`) 
} 

const todos = [
  { id:'1', title:'ネーム', completed:'false'},
  { id:'2', title:'下書き', completed:'false'}
]

await writeTodosToCsv('todos.csv', todos) 

console.log(await fs.promises.readFile('todos.csv', 'utf8')) 

// 練習問題7-2
// ファイル名を引数に取り、7-1で保存されたcsvをパースしてToDoの配列を返す。
async function parseTodosFromCsv(file) {
  const content = await fs.promises.readFile(file, 'utf-8')
  const [propsLine, ...todoLines] = content.split(/\n/)
  const props = propsLine.split(',')

  return todoLines.map(line => {
    const values = line.split(',')
    const todo = {}

    for( let i=0; i < props.length; i++) {
      todo[props[i]] = props[i] === 'completed'
        // completedの場合文字列からbooleanへの変換を行う
        ? values[i] === 'true'
        : values[i]
    }
    return todo
  })
}

await parseTodosFromCsv('todos.csv')

// 練習問題7-3
// update()メソッドを静的プレースホルダで実装する

// statement.run()をPromise化する関数
function promisifyStatementRun(statement) {
  return function() {
    return new Promise((resolve, reject) => 
      statement.run.apply(statement, [
        ...arguments,
        function(err) {
          err ? reject(err) : resolve(this)
        }
      ])
    )
  }
}

const statementRuns = {
  // titleとcompletedの両方を更新するUPDATE文
  both: promisifyStatementRun(
    db.prepare('UPDATE todo SET title = ?, completed = ? WHERE id = ?')
  ),
  // titleのみ更新するUPDATE文
  title: promisifyStatementRun(
    db.prepare("UPDATE todo SET title = ? WHERE id =?")
  ),
  // completedのみ更新するUPDATE文
  completed: promisifyStatementRun(
    db.prepare("UPDATE todo SET completed = ? WHERE id =?")
  )
}

// SELECT文
const selectStatement = db.prepare('SELECT * FROM todo WHERE id = ?')
const selectStatementGet = promisify(
  selectStatement.get.bind(selectSattement)
)

// updateの実装
exports.update = (id, update) => {
  let updateStatementRun, values
  if(update.title && update.completed) {
    updateStatementRun = updateStatementRun.both
    values = [update.title, update.completed, id]
  } else if(update.title) {
    updateStatementRun.title
    values = [update.title, id]
  } else if(update.completed) {
    updateStatementRun.completed
    values = [update.completed, id]
  } else {
    return Promise.reject(
      new Error('`update`, should contain title and/or completed')
    )
  }
  return updateStatementRun(values)
  .then(({ changes }) => changes === 1
    ? selectStatementGet(id).then(rowToTodo)
    : null
  )
}
