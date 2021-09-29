// 名前付きエクスポートのインポート
import { add } from './esm-math.mjs'
console.log('add', add)

// 名前付きエクスポートを別名でインポート
import { substract as sub } from './esm-math.mjs'
console.log('sub', sub)

// デフォルトエクスポートのインポート
import Math from './esm-math.mjs'
console.log('Math', Math)

// デフォルトエクスポートはインポート時に任意の命名が可能（as不要）
import Mathmatics from './esm-math.mjs'
console.log('Mathmatics', Mathmatics)

// 名前付きエクスポートとデフォルトエクスポートをまとめてインポート
import Math2, { substract, multiply }  from './esm-math.mjs'

// インポート対象を指定せず、モジュールのコードを実行するだけ
import * as math from './esm-math.mjs'
console.log('import', math)

// エクスポートされた値をインポートせず、モジュールのコードを実行するだけ
import './esm-math.mjs'

/*
動作確認
node esm-import.mjs
*/
