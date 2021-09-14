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

// devDependencies
npm install --save-dev mkdirp

// scripts
npm test

npm run create-dir
> npm-package@3.0.0 create-dir /Users/fujiitakeshi/workspace/handsOnNodeJs/npm-package
> mkdirp foo/bar

npm run remove-dir
> npm-package@3.0.0 remove-dir /Users/fujiitakeshi/workspace/handsOnNodeJs/npm-package
> rimraf foo

// pre,postを接頭辞として設定できる
// precreate-dir,postcreate-dir設定後
npm run create-dir


> npm-package@3.0.0 precreate-dir /Users/fujiitakeshi/workspace/handsOnNodeJs/npm-package
> echo "ディレクトリを作成します"

ディレクトリを作成します

> npm-package@3.0.0 create-dir /Users/fujiitakeshi/workspace/handsOnNodeJs/npm-package
> mkdirp foo/bar


> npm-package@3.0.0 postcreate-dir /Users/fujiitakeshi/workspace/handsOnNodeJs/npm-package
> echo "ディレクトリを作成しました"

ディレクトリを作成しました

// prepareを追加して実行
npm install

> npm-package@3.0.0 prepare /Users/fujiitakeshi/workspace/handsOnNodeJs/npm-package
> echo "prepareを実行しました"

prepareを実行しました
audited 14 packages in 0.487s
found 0 vulnerabilities


// bin
another-package/　にbinを設定して実行
npm run greeting 太郎 次郎

// 以下でもOK
npm greeting 太郎 次郎

> another-package@1.0.0 greeting /Users/fujiitakeshi/workspace/handsOnNodeJs/another-package
> greeting "太郎　次郎"

### DEBUG ###
[ '/Users/fujiitakeshi/.nvm/versions/node/v10.15.0/bin/node',
  '/Users/fujiitakeshi/workspace/handsOnNodeJs/another-package/node_modules/.bin/greeting',
  '太郎　次郎' ]
### DEBUG ###
Hello 太郎　次郎!

// engines
// enginesに指定されたバージョンと一致しないパッケージバージョンをinstallしようとした場合にエラーにする
npm config set engine-strict true

// npmパッケージのグローバルインストールとnpx
npx cowsay hello
npx: 41個のパッケージを3.951秒でインストールしました。
 _______
< hello >
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
 */


