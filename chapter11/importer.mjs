console.log('importerの本文', foo)
import { foo } from './exporter.mjs'

// ESモジュールのimport分のhoistingを確認
// node importer.js