'use strict'

// exportsへのシンプルな割当
exports.a = 'a'

// if文の中でのexportsへの値の割当
if (Math.random() < 0.5) {
  exports.b = 'b'
}

// プロパティ名に変数を使ったexportsへの割当
const c ='c'
exports[c] = c

/*
CommonJSモジュールとESモジュールの相互依存
ESモジュールからのimport

node --input-type=module -e "import cjs from './cjs.js'; console.log(cjs)"
node --input-type=module -e "import { a } from './cjs.js'; console.log(a)"
node --input-type=module -e "import { b } from './cjs.js'; console.log(b)"

// エラー
node --input-type=module -e "import { c } from './cjs.js'; console.log(c)"

// コアモジュールからの名前付きimport
node --input-type=module -e "import { cpus } from 'os'; console.log(cpus)"

*/

