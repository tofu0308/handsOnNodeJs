module.exports.add = (a, b) => {return a + b}
module.exports.subtract = (a, b) => {return a - b}

// 以下のような書き方もできる
/**
module.exports = {
  add: (a,b) => {return a+b},
  subtract: (a, b) => {return a - b}
}

exports.add = (a, b) => {return a + b}
exports.subtract = (a, b) => {return a - b}
 */

/** 
> math = require("./cjs-math") 
{ add: [Function (anonymous)] }
> math.add(1,2)
3
 */

// delete演算子を使ってrequire.cachオブジェクトのキャッシュをクリア
// delete require.cache[require.resolve('./cjs-math')]