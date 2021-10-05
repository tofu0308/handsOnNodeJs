import Math, { add, substract, multiply } from "./esm-math.mjs";
import * as math from './esm-math.mjs'

console.log('Math === math.default', Math === math.default)
console.log('add === math.add', add === math.add)
console.log('substract === math.substract', substract === math.substract)
console.log('multiply === math.multiply', multiply === math.multiply)

/*
動作確認
node esm-import-all.mjs

node  --input-type=module -e "import './esm-math.mjs'"
echo "import {add} from './esm-math.mjs'; console.log(add(1,2))"| \
node --input-type=module
*/
