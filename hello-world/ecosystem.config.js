module.exports = {
  apps : [{
    name: 'app',
    script: 'app.js',
    args: 'one two', // スクリプトに渡される引数
    instances: 0, //インスタンス数
    // アプリケーション実行時の環境変数
    env: {
      NODE_ENV: 'development'
    },
    // "--env production"オプション付きでのアプリケーション起動時の環境変数
    env_production: {
      NODE_ENV: 'production'
    }
  },
  // 2つ目以降のアプリケーションを設定する場合は以降に記述
],
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',　// デプロイ先ホスト、配列で複数のホストを指定することも可能(IPやgitリポジトリは無いのでデプロイ自体はできない)
      ref  : 'origin/master', // デプロイ対象のgitブランチ
      repo : 'git@github.com"repo.git', // gitリポジトリ
      path : '/var/www/production', // ソースコードをgit cloneするデプロイ先のホストのパス
      // デプロイ語にデプロイ先で実行するコマンド
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
    },
    // その他の環境へのデプロイ設定
  }
};
