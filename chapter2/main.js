const { resolve } = require("bluebird")
const { sync } = require("chownr")
const { set } = require("core-js/core/dict")
const ToPrimitive = require("es-to-primitive/es5")
const { result } = require("lodash")
const { setDefaultEncoding } = require("stdout-stream")

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

// nextTickQeue
const cache3 = {}
function parseJSONAsyncWithCache3(json, callback) {
  const cached = cache3[json]
  if(cached) {
    // Node.jsのみを対象としたコードの場合
    process.nextTick(() => callback(cached.err, cached.result))
    /**
     ブラウザで動かす場合
     1, queueMicroTask
     queue.MicroTask(() => { callback(cached.err, cached.result) })

     2, Promise
     Promise.resolve().then() => {callback(cached.err, cached.result)}
    */
    return
  }
  parseJSONAsync(json, (err, result) => {
    cache3[json] = {err, result}
    callback(err, result)
  })
}

// 1回目の実行
parseJSONAsyncWithCache3(
  '{ "message" : "hello", "to" : "world" }',
  (err, result) => {
    console.log('1回目の結果', err ,result)
    
    // コールバックの中で2回目を実行
    parseJSONAsyncWithCache3(
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

// 2.2.4 コールバックヘル
// コードの分割
function first(arg, callback) {
  asyncFunction1(arg, (err, result) => {
    if(err) return callback(err)
    second(result, callback)
  })
}

function second(arg, callback) {
  asyncFunction2(arg, (err, result) => {
    if(err) return callback(err)
    third(result, callback)
  })
}

function third(arg, callback) {
  asyncFunction3(arg, (err, result) => {
    if(err) return callback(err)
    asyncFunction4(result, callback)
  })
}

first(input, (err, result) => {
  if(err) retun // エラーハンドリング
})

try {
  const result1 = syncFunc1(input)
  const result2 = syncFunc1(reult1)
  const result3 = syncFunc1(reult2)
  const result4 = syncFunc1(reult3)
  // ...
} catch(err) {
  // エラーハンドリング
}

// 2.3 Promise
// 2.3.1 Promiseインスタンスの生成と状態遷移
function parseJSONAsync(json) {
  // Promiseインスタンスを生成して返す（この時点ではPending状態）
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // fulfilled状態にする（解決）
        resolve(JSON.parse(json))
      } catch(err) {
        // reject状態にする（拒否）
        reject(err)
      }
    },1000)
  })
}
const toBeFulfilled = parseJSONAsync('{ "message" : "hello", "to" : "world" }')
const tobeRejcted = parseJSONAsync('不正なjson')
console.log('.............Promise生成直後.............')
console.log(toBeFulfilled)
console.log(tobeRejcted)

setTimeout(() => {
  console.log('.............1秒後.............')
  console.log(toBeFulfilled)
  console.log(tobeRejcted)
},1000)

// Promise.resolve(), Promise.reject()
new Promise(resolve => resolve({foo:1}))
Promise.resolve({foo:1})

new Promise((resolve, reject) => {reject(new Error('error!')) })
Promise.reject(new Error('error!!'))

// Promise.resolve()にPromiseインスタンスを渡した場合は引数がそのまま返される
const fooPromise = Promise.resolve('foo')
fooPromise === Promise.resolve(fooPromise) // true

// 2.3.2 then(),catch(),finally()
// then()
const stringPromise = Promise.resolve('{"foo":1}')
console.log(stringPromise)

const numberPromise = stringPromise.then(str => str.length)
console.log(numberPromise)
console.log(stringPromise) // thenを実行しても元のPromiseのインスタンスには影響を及ぼさない

// onRejectedを省略せず値を返せば、その値で解決されたPromiseインスタンスを得られる
const unrecoveredPromise = Promise.reject(new Error('error!!')).then(() => 1, err => err.message)
console.log(unrecoveredPromise)

// onFulfilled,onRejectedの中でエラーが発生した場合then()の戻り値はそのエラーを理由に拒否される
const rejectedPromise = stringPromise.then(() => {throw new Error('エラー')})

// then()がfulfilledなPromiseインスタンスを返すパターン
const objPromise = stringPromise.then(parseJSONAsync)
console.log(objPromise)

// then()がrejectedなPromiseインスタンスを返すパターン
const rejectedObjPromise = Promise.resolve('不正なjson').then(parseJSONAsync)
console.log(rejectedObjPromise)


// catach()
//　以下は同じ処理
const withoutOnFulfilled = Promise.reject(new Error('エラー')).then(undefined, () => 0)
const catchedPromise = Promise.reject(new Error('catched Promise')).catch(() => 0)
console.log(withoutOnFulfilled)
console.log(catchedPromise)

// then()を2引数で実行するパターン
asyncFunc1(input)
  .then(
    asyncFunc2, // onFulfilled
    err => { // onRejected
      // asyncFunc1用のエラーハンドリング
    }
  )
  .then(
    result => { // onFulfilled
      // この中で発生したエラーは第2引数（onRejected）でハンドリングされない
    },
    err => {// onRejected
      // asyncFunc2用のエラーハンドリング
    }
  )

// onRejectedを省略し、then()の後ろにcatch()をつけるパターン
asyncFunc1(input)
  .then(asyncFunc2 /* onFulfilled */)
  .then(result => { // onFulfilled
    // この中で発生したエラーもcatch()に渡したonRejectedでハンドリングされる
  })
  .catch(err => { // onRejected
    // ここにエラーハンドリングを集約できる
  })

// finally()
const onFinally = () => console.log('finallyのcallback')

// 非同期処理が成功したかどうかに関わらず、onFinallyを実行
Promise.resolve().finally(onFinally)
Promise.reject(new Error('error ')).finally(onFinally)

// finallyのコールバックを2で返しても、Promiseインスタンスは1で解決される
const returnValueInFinally = Promise.resolve(1).finally(() => 2)
console.log(returnValueInFinally)

// コールバック内でエラーがthrowされる場合や、コールバックがrejectedなPromiseインスタンスを帰す場合finally()の返すPromiseインスタンスも同じ理由で拒否される
const throwErrorInFinally = Promise.resolve(1).finally(() => { throw new Error('エラー') })
console.log(throwErrorInFinally)

// finallyの返すPromiseインスタンスはコールバックの返すPromiseインスタンスが解決されるまで解決されない
Promise
  .resolve('foo')
  .finally(() => 
    new Promise(resolve => 
      setTimeout(
        () => {
          console.log('finally()で1秒経過')
          resolve()
        }, 1000
      )
    )
  )
  .then(console.log)

// then(),catch(),finally()の実行タイミング
Promise
  .resolve('foo')
  .then(result => console.log('callback', result))
console.log('この行が先に実行される')

// Promiseのスタティックメソッドを使った非同期処理の並行実行
// Promise.all()
const allResolved = Promise.all(
  [
    1, // Promise以外のものも含められる
    Promise.resolve('foo'),
    Promise.resolve(true)
  ]
)

// 最初にrejectedになったものと同じ理由で拒否される
const contaisRejected = Promise.add(
  [
    1,
    Promise.resolve('foo'),
    Promise.reject(new Error('エラーの発行')), 　// このエラーを吐く
    Promise.resolve(true)
  ]
)

// 引数に空配列を渡すと、空配列で解決済みのPromiseインスタンスを返す
Promise.all([])


// 1秒かかる非同期処理
function asyncFunc() {
  return new Promise(resolve => setTimeout(resolve ,1000))
}

// 現在時刻を取得
const start = perf_hooks.performance.now()

//  逐次実行(約4秒)
asyncFunc()
  .then(asyncFunc)
  .then(asyncFunc)
  .then(asyncFunc)
  .then(
    () => console.log('逐次実行所要時間', perf_hooks.performance.now() - start)
  )


// Promise.all()で並行実行（約1秒）
  Promise.all([
  asyncFunc(),
  asyncFunc(),
  asyncFunc(),
  asyncFunc()
])
  .then(() => {
    console.log('逐次実行所要時間', perf_hooks.performance.now() - start)
  })


// Promise.race()
// 引数に含まれるPromiseインスタンスが一つでもsetteledになると、その他のPromiseインスタンスの結果を待たずにそのPromiseインスタンスと同じ状態になる

// 引数で与えられた時間だけ待機する非同期処理
function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const fulfilledFirst = Promise.race([
  wait(10).then(()=> 1),　 // この結果が採用される
  wait(30).then(()=> 'foo'),
  wait(20).then(()=> Promise.reject(new Error('fulfilledFirstのエラー'))),　
])

const rejectFirst = Promise.race([
  wait(20).then(()=> 1),
  wait(30).then(()=> 'foo'),
  wait(10).then(()=> Promise.reject(new Error('rejectFirstのエラー'))),　 // この結果が採用される
])

const containsNoPromise = Promise.race([
  wait(10).then(()=> 1),
  'foo', // この結果が採用される
  wait(20).then(()=> Promise.reject(new Error('containsNoPromiseのエラー'))),
])

// 引数に空配列を渡すとpending状態に留まるPromiseインスタンスを返す
const raceWithEmptyArray = Promise.race([])

// Promise.race()の使用例（タイムアウトの実装）
function withTimeout(promise, timeout){
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('withTimeoutのエラー')),timeout)
    })
  ])
}

// 20msで完了する非同期処理
const promise = new Promise(resolve => setTimeout(() => resolve(1), 20))

// timeout 30ms
const shouldBeResolved = withTimeout(promise, 30)

// timeout 10ms
const shouldBeRejected = withTimeout(promise, 10)


// Promise.allSettled()
const allSettled = Promise.allSettled([
  1,
  Promise.resolve('foo'),
  Promise.reject(new Error('allSetteledのエラー')),
  Promise.resolve(true)
])

// 引数に空配列を渡した場合の挙動はPromise.all()と同じで空配列で解決済みのPromiseインスタンスを返す
Promise.allSettled([])


// Promise.any()
// 引数に含まれるPromiseインスタンスが1つでもfulfilledになると他のインスタンスの結果を待たずにfulfilledになり、すべてrejectedになるとrejectedになる

// node.js v14.13.0時点では使用不可（エラーになる）
const anyFulfilled = Promise.any([
  Promise.resolve('foo'),　// 動作する場合はこの結果を返す
  Promise.reject(new Error('anyFulfilledのエラー')),
  Promise.resolve(true)
])

// node.js v14.13.0時点では使用不可（エラーになる）
// rejectedなPromiseインスタンスを返す時はインスタンスが拒否された理由を引数の順番通りに保持する配列をerrorsプロパティに持つ、AggregateErrorのインスタンスになる
const noneFullfilled = Promise.any([
  Promise.reject(new Error('noneFullfilled1のエラー')),
  Promise.reject(new Error('noneFullfilled2のエラー'))
])


// node.js v14.13.0時点では使用不可（エラーになる）
Promise.any([])
Promise.any([]).catch(err => console.log(err.errors))
