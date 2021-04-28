// コールバックを利用した非同期APIを実行する
setTimeout(
  () => {
    console.log('1s経過')
  },1000
)
console.log('setTimeout()を実行した')

/**
 コールバック=非同期　ではない
 例.map()メソッドは引数のコールバックを使って配列内の要素を変換するが、この処理は同期的に実行される
 */
const array1 = [0,1,2,3]
const array2 = array1.map((element => {
  console.log(`${element}を変換`)
  return element*10
}))
console.log('配列の変換完了', array2)

// fs.readdir()
fs.readdir(
  '.',
  (err, files) => {
    console.log('fs.readdir実行結果')
    console.log('err', err)
    console.log('files', files)
  }
)
/**
undefined
> fs.readdir実行結果
err null
files [ 'main.js' ]
 */


fs.readdir(
  'foo', // 存在しないディレクトリの場合
  (err, files) => {
    console.log('fs.readdir実行結果')
    console.log('err', err)
    console.log('files', files)
  }
)

/**
 undefined
> fs.readdir実行結果
err [Error: ENOENT: no such file or directory, scandir 'foo'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'scandir',
  path: 'foo'
}
files undefined
 */

// エラーハンドリング
function parseJSONSync(json) {
  try {
    return JSON.parse(json)
  } catch(err) {
    console.error('エラーをキャッチ', err)
  }
}

parseJSONSync("JSONではない")

/**
エラーをキャッチ SyntaxError: Unexpected token J in JSON at position 0
    at JSON.parse (<anonymous>)
    ...
undefined
> 
*/
// こっちは正しく動く 
const json = JSON.parse('{ "message" : "hello", "to" : "world" }')
parseJSONSync(JSON.stringify(json))


function parseJSONAsync(json, callback) {
  setTimeout(()=>{
    try {
      callback(null, JSON.parse(json))
    } catch(err) {
      callback(err)
    }
  },1000)
}

parseJSONAsync('不正なJSON', result => {
  console.log('parse結果', result)
})
// > Uncaught SyntaxError: Unexpected token 不 in JSON at position 0


