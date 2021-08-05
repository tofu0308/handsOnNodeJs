// 練習問題7-1
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