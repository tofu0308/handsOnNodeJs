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

const obj4 = {propB: 'b', propD: 'd'}
const obj5 ={ ...obj2, [obj4.propB + obj2.propC]: 'abc', ...obj4, propA:true}
console.log(obj5)

console.log(Object.keys(obj2))
console.log(Object.values(obj2))
console.log(Object.entries(obj2))

const price = {
  value: 100,
  get withTax() {
    return Math.floor(this.value * 1.1)
  },
  set withTax(withTax) {
    this.value = Math.ceil(withTax / 1.1)
  }
}

/*
undefined
> price.withTax
110
> price.withTax = 333
333
> price.withTax
333
> price.value
303
*/

// 配列
const arr1 =['foo', 'bar']

console.log(
  arr1.length,
  arr1[1],
  arr1.indexOf('bar'),
  arr1.indexOf('hoge'),
  arr1.includes('bar'),
  arr1.includes('hoge'),
  arr1.join('-'),
  arr1.join()
)
console.log(
  arr1.push('baz'),
  arr1,
  arr1.push('a', 'b', 'c'),
  arr1,
  arr1.pop(),
  arr1,
  arr1.unshift('qux'),
  arr1,
  arr1.unshift('d', 'e', 'f'),
  arr1,
  arr1.shift(),
  arr1
)

const arr2 = ['foo', 'bar', 'baz']
const arr3 = ['a', ...arr2, 'b', 'c']
console.log(
  arr2, // 元配列はそのまま
  arr3
 )

 const [head1, head2, ...arr4] = arr2
 console.log(
   arr4,
   arr2
 )

 // const [...arr5, last] = arr2
 // rest要素が配列の最後にないとエラーになる
 // SyntaxError: Rest element must be last element

 console.log(
  arr2.slice(0, 2),
  arr2.slice(0, -1),
  arr2.slice(2),
  arr2.slice(),
  arr2 // もとの配列はそのまま
 )

 console.log(arr2)
 console.log(
  arr2.sort(),
  arr2 // sortはもとの配列も変更する
 )

 console.log(arr3)
 console.log(
   arr3.sort((a,b) => a.length - b.length),
   arr3
 )

for (let i =0; i < arr2.length; i++) {console.log(arr2[i])}
for(const e of arr2){console.log(e)}

arr2.forEach(console.log)
arr2.map(e => console.log(e+e))
console.log(
  arr2.filter(e => e.startsWith('b')),
  arr2.find(e => e.startsWith('b'))
)

// クラス
class Foo {
  // privateフィールド
  #privateField = 1

  // publicフィールド
  publicField = 2

  // staticなprivateフィールド
  static #staticPrivateField = 3

  // staticなpublicフィールド
  static staticPublicField = 4

  constructor(parameter) {
    this.FieldInitializedInConstructor = parameter
    console.log('Foo constructor')
  }

  // privateなgetter
  get #computed() {
    return this.publicField * 2
  }

  // publicなgetter
  get computed() {
    return this.#computed
  }

  // privateなsetter
  set #computed(value){
    this.publicField = value / 2
  }
 
  // publicなsetter
  set computed(value) {
    this.#computed = value
  }

  // privateメソッド
  #privateMethod() {
    return this.#privateField
  }

  // publicメソッド
  publicMethod() {
    return this.#privateField
  }

 // staticなprivateメソッド
 static #staticPrivateMethod() {
  return this.#privateField
 }

 // staticなpublicメソッド
 static staticPublicMethod() {
   return this.#staticPrivateField
 }
}



const  fooInstance = new Foo(100)

// privateFieldにはアクセス出来ない
// SyntaxError: Private field '#privateField' must be declared in an enclosing class
// console.log(fooInstance.#privateField)

console.log(fooInstance.publicField)
console.log(fooInstance.FieldInitializedInConstructor)


// privateなgetterにアクセスできない
// SyntaxError: Private field '#computed' must be declared in an enclosing class
// console.log(fooInstance.#computed)

console.log(fooInstance.computed)

// privateなsetterにアクセスできない
// SyntaxError: Private field '#computed' must be declared in an enclosing class
// fooInstance.#computed = 10

fooInstance.computed = 10
console.log(fooInstance.computed)
console.log(fooInstance.publicField)

// privateメソッドにアクセスできない
// SyntaxError: Private field '#privateMethod' must be declared in an enclosing class
// fooInstance.#privateMethod

console.log(fooInstance.publicMethod())

// staticなprivateフィールドにアクセスできない
// SyntaxError: Private field '#staticPrivateField' must be declared in an enclosing class
// Foo.#staticPrivateField;

console.log(Foo.staticPublicField)

// staticなprivateメソッドにアクセスできない
// SyntaxError: Private field '#staticPrivateMethod' must be declared in an enclosing class
// Foo.#staticPrivateMethod()

console.log(Foo.staticPublicMethod())


// extends
class Bar extends Foo {
  constructor(parameter) {
    super(parameter)
    this.subClassPublicField = 100
    console.log('Bar constructor')
  }

  publicMethod() {
    return super.publicMethod() * this.subClassPublicField
  }
}

const barInstance = new Bar(100)  
console.log(
  barInstance.publicField,
  barInstance.subClassPublicField,
  barInstance.publicMethod(),
  Bar.staticPublicField,
  
  // 親クラスのstaticなprivateメソッドにはアクセスできるが、その中で親クラスのstaticなprivateフィールドにアクセ視しているためエラーになる
  // TypeError: Cannot read private member #staticPrivateField from an object whose class did not declare it
  // Bar.staticPublicMethod()
)

// プロトタイプチェーン
console.log(
  Foo.prototype,
  Object.getOwnPropertyNames(Foo.prototype),
  Foo.prototype.publicMethod,
  fooInstance.__proto__ === Foo.prototype
  )

const plainObject = {}
console.log(
  fooInstance instanceof Foo,
  plainObject instanceof Foo,
  plainObject.__proto__ = Foo.prototype, // ここで__proto__を書き換えてしまう
  plainObject instanceof Foo
)

console.log(
  barInstance instanceof Foo,
  barInstance.__proto__ === Bar.prototype,
  Object.getOwnPropertyNames(Bar.prototype),
  barInstance.__proto__ === Foo.prototype
)
console.log(
  barInstance.__proto__.__proto__,
  Foo.prototype,
  barInstance.__proto__.__proto__ === Foo.prototype 
)

console.log(
  fooInstance.__proto__.__proto__,
  Object.prototype,
  fooInstance.__proto__.__proto__ === Object.prototype,
  fooInstance instanceof Object,
  barInstance.__proto__.__proto__.__proto__ === Object.prototype,
  barInstance instanceof Object
)

// 等価性
console.log(
  0 === '', // false
  0 == '', // true
  1 === 1,
  {foo: 1} === {foo: 1} // false　構造が同じだけで別々のオブジェクト
)

const obj8 = {foo : 1}
const obj9 = obj8
console.log(obj8 === obj9)


// CommonJs
math = require("./cjs-math") 

console.log(
  math.add(1,2),
  math.subtract(1,2),
)

/*
const module = {exports:{}}
let exports = module.exports
exports.foo = 'foo'
exports = {bar: 'bar'}
exports
module.exports // module.exportsの値に影響しない
*/