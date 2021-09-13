#!/usr/bin/env node
'use strict'

// process.argvの確認
console.log('### DEBUG ###')
console.log(process.argv)
console.log('### DEBUG ###')

// proces.argvはNode.js自体の実行可能ファイルへのパスと
// greetingへのパスで始まるため、3番目以降の文字列をお取り出して処理
process.argv.slice(2).forEach(name => console.log(`Hello ${name}!`))
