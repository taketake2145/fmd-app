# node がインストールされているか確認する
# 数字が表示されればOK　// v12.12.1
# 数字が表示されない場合は
# https://nodejs.org/ja/
node -v

# npm がインストールされているか確認する
# 数字が表示されればok // 6.12.1
npm -v

# gulp がグローバルにインストールされているか確認する
# versionが表示されない場合は
# npm install --global gulp-cli
gulp -v

# ここまでが下準備、以降ローカル環境にモジュールをインストールしていく

# gulpを導入したいディレクトリに移動する
cd 任意のパス

# 続いて、package.json を作成する
npm init -y

# gulpを導入したいディレクトリ内に package.json が作られた！
# 続いて gulp をインストールする
npm i -D gulp gulp-concat gulp-merge-media-queries gulp-notify gulp-plumber gulp-postcss gulp-rename gulp-sass gulp-sass-glob gulp-uglify autoprefixer css-declaration-sorter gulp-babel @babel/core @babel/preset-env

# ファイル変更を監視する
gulp