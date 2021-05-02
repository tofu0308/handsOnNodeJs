const { set } = require("core-js/core/dict")
const { result } = require("lodash")

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


/**
 2.2.3 混ぜるな危険、同期と非同期
 */

//  こちらはアンチパターン　
// 同期、非同期の一貫性がないアンチパターン
const cache = {}
function parseJSONAsyncWithCache(json, callback) {
  const cached = cache[json]
  if(cached) {
    callback(cached.err, cached.result)
    return
  }

  parseJSONAsync(json, (err, result) => {
    cache[json] = {err, result}
    callback(err, result)
  })
}

// 1回目の実行
parseJSONAsyncWithCache(
  '{ "message" : "hello", "to" : "world" }',
  (err, result) => {
    console.log('1回目の結果', err ,result)
    
    // コールバックの中で2回めを実行
    parseJSONAsyncWithCache(
      '{ "message" : "hello", "to" : "world" }',
      (err, result) => {
        console.log('1回目の結果', err ,result)    
      }
    )
    console.log('2回目の呼び出し完了')
  }
)
console.log('1回目の呼び出し完了')
/**
1回目の呼び出し完了
undefined
> 1回目の結果 null { message: 'hello', to: 'world' }
1回目の結果 null { message: 'hello', to: 'world' }
2回目の呼び出し完了
 */


const cache2 = {}
function parseJSONAsyncWithCache2(json, callback) {
  const cached = cache2[json]
  if(cached) {
    // キャッシュに値が存在する場合でも、非同期的にコールバックを実行する
    setTimeout(() => { callback(cached.err, cached.result)},0)
    return
  }
  parseJSONAsync(json, (err, result) => {
    cache2[json] = { err, result}
    callback(err, result)
  })
}

// 1回目の実行
parseJSONAsyncWithCache2(
  '{ "message" : "hello", "to" : "world" }',
  (err, result) => {
    console.log('1回目の結果', err ,result)
    
    // コールバックの中で2回目を実行
    parseJSONAsyncWithCache2(
      '{ "message" : "hello", "to" : "world" }',
      (err, result) => {
        console.log('2回目の結果', err ,result)
      }
    )
    console.log('2回目の呼び出し完了')
  } 
)
console.log('1回目の呼び出し完了')
/**
 1回目の呼び出し完了
undefined
> 1回目の結果 null { message: 'hello', to: 'world' }
2回目の呼び出し完了
2回目の結果 null { message: 'hello', to: 'world' }
 */