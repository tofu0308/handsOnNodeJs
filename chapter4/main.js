// メッセージのシリアライズ方法の指定
const dataObj = {lastDayOfHeisei: new Date(2019, 3, 30, 9)}
const stringifiedDataObj = JSON.stringify(dataObj)

JSON.parse(stringifiedDataObj)
// { lastDayOfHeisei: '2019-04-30T00:00:00.000Z' }

typeof _.lastDayOfHeisei
// string

const circular = {bar: 1}
// 循環参照させる
circular.foo = circular

//　JSONが循環参照に対応しないためエラーが発生する
JSON.stringify(circular)
// Uncaught TypeError: Converting circular structure to JSON


// 構造化クローンアルゴリズム
// v8.serialize(),v8.deserialize
const circularWithDate = {lastDayOfHeisei: new Date(2019, 3, 30, 9)}
circularWithDate.foo = circularWithDate

// シリアライズ
const serializeCircularWithDate = v8.serialize(circularWithDate)

// デシリアライズ
v8.deserialize(serializeCircularWithDate)

// Dateのインスタンスであることを確認
_.lastDayOfHeisei instanceof Date
