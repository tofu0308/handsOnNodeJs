// 名前付きエクスポート
export const a = 'a'

// デフォルトエクスポート
export default function() {}

/*
CommonJSモジュールからの動的インポート
node -e "import('./esm.mjs').then(console.log)"
node -e "import('./cjs.js').then(console.log)"
 */