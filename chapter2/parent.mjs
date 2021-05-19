// トップレベルawait
import './child-a.mjs'
import './child-b.mjs'
console.log('parent')

/*　実行結果
child-a 1
child-b
child-a 2
parent
*/