import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'

console.log('import.meta', import.meta)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('__filename', __filename)
console.log('__dirname', __dirname)

const require = createRequire(import.meta.url)
// エラー（原因不明）
// const { add } = require('./cjs-math')
// console.log(add(1,2))

console.log(require('./key-value'))