/**

// バージョンの指定
npm version 1.0.0

// パッチバージョンの更新
npm version patch

// %sはバージョンを参照する
npm version minor -m "%sにバージョンアップ" 
1.2.0

git log -1 --oneline
eec1766 (HEAD -> master, tag: v1.2.0) 1.2.0にバージョンアップ

git tag v1.3.0 -m '1.3.0' 
npm version from-git 
v1.3.0


// プレリリーバージョンの使用
npm version premajor
v2.0.0-0

// プレリリースバージョンの更新
npm version prerelease 
v2.0.0-1

// --periodオプション
npm version premajor --preid=alpha  
v3.0.0-alpha.0

npm version prerelease 
v3.0.0-alpha.1

// npm version patchで通常バージョンに移行
fujiitakeshi@mbp npm-package % npm version patch 
v3.0.0

// dependencies
// install rimraf
npm install rimraf

// 依存関係の確認
npm ls -all

// 複数のパッケージが同一パッケージに依存しており、かつ依存バージョンの制約を同時に満たすバージョンが存在しない場合
npm install inherits@^1.0.0

npm ls -all

// deduped 重複排除の意。

 */


