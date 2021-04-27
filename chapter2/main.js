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
