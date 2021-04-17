console.log(24*60*60)

let total = 0;
for (let i = 1; i <= 10; i++) {
 total += i
 console.log(`${i}までの和:${total}`)
}

// 関数
function add1(a, b) {return a+b}
const add2 = function(a,b) {return a+b}
const add3 = function addFn(a,b) {return a+b}
const add4 = (a,b) => {return a+b}

// {}を省略するreturn無しで値が返される
const add5 = (a,b) => a+b
// 引数が一つであればパラメータを囲む()を省略できる
const addOne = a => a+1

console.log(add1.name)
console.log(add3.name)
console.log(add2.name)

console.log(add6(1,2))
// ReferenceError: add7 is not defined
// 関数宣言で作ったadd6は宣言前に参照可能だが関数式で作ったadd7を宣言前に参照するとエラーになる
// console.log(add7(1,2))

function add6(a,b){
  return a+b
}
const add7 = (a,b) => a+b;

// オブジェクト
const obj1 = {propA: 1, propB:2}
// ドット記法
console.log(obj1.propA)
// ブラケット記法
console.log(obj1['propB'])

// プロパティ追加・削除
obj1.propC = 3
console.log(obj1)

delete obj1.propC
console.log(obj1)

const obj2 = {...obj1, propC: 3}
console.log(obj2)

const {propA, ...obj3} = obj2
console.log(obj2)
console.log(obj3)