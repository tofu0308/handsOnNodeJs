console.log('Hello from esm-math.mjs')

// 名前付きエクスポート
export function add(a, b) {
  return a + b
}
export const substract = (a, b) => a -b

// 宣言済み変数をそのままの名前で名前付きエクスポート
const multiply = (a, b) => a * b
export { multiply }

// デフォルトエクスポート
export default class Math {
  constructor(value) {
    this.value = value
  }
  add(value) {
    return new Math(this.value + value)
  }
  substract(value) {
    return new Math(this.value - value)
  }
}

// 宣言済み変数のデフォルトエクスポート
// 1モジュール内で複数のデフォルトエクスポートは出来ないのでコメント化
/**

const math = 'math'
export default math
or
export { math as default}

 */