# Gulp (2020年版)

今回のサンプルでは、ファイルを更新するたびに、自動で、下記を処理するようにする。

## CSSファイルを修正したとき、自動反映すること

 - プリフィックス対応する（2バージョン前まで、IE11含める *任意に設定可能）
 - media queryをまとめる
 - プロパティの並び替えをおこなう
 - 複数のCSSファイルを一ファイルにまとめる
 - SassをCSSに変換する
 - CSSをワンラインにする（最小化）

## JS(JavaScript)ファイルを修正したとき、自動反映すること

 - 複数のJS(JavaScript)ファイルを一ファイルにまとめる
 - ES6(EcmaScript6)をES5(EcmaScript5)に変換する
 - JS(JavaScript)をワンラインにする（難読化）

# 手順

ターミナルを開いて順番に下記コマンドを入力していく

### 1. nodeがインストールされているか確認する

    node -v

数字が表示されればOK。
表示されない場合は、公式サイトからインストールする。
[https://nodejs.org/ja/](https://nodejs.org/ja/)

### 2. npmがインストールされているか確認する

    npm -v

(nodeをインストールした際に、npmもインストールされていた)
数字が表示されればOK。

### 3. gulpがインストールされているか確認する

    gulp -v

versionが表示されればOK。
表示されない場合は、下記を入力する。

    npm install --global gulp-cli

ちなみに、公式サイトは、[https://gulpjs.com/docs/en/getting-started/quick-start](https://gulpjs.com/docs/en/getting-started/quick-start)　。バージョンを入れ直したい場合は、`npm rm --global gulp` をして一旦削除する必要があるとのこと。

#### Permission Error が発生する場合

Permission Error が発生する場合は、最初にsudoをつけて入力する。`sudo npm install --global gulp-cli` そのあとに、Password: と出てくるので、パソコンを起動する際に使用するパスワードを入力する。以下同様。

### 4. ディレクトリを移動する

    cd 任意のディレクトリのパス

gulpを導入したいディレクトリに移動する。手順4以降はサイト単位で作ることになる。よく分らない場合は、とりあえずデスクトップにテスト用のフォルダを作って、そこに移動して試してみるのもあり、確認後、ディレクトリごと削除すれば、手順4以降はなかったことにできる。ちなみに `cd` は change directory の略。

### 5. package.jsonを作成する

    npm init -y

このコマンドを入力すると、手順4のディレクトリ直下に、package.jsonが作られる。

### 6. gulpとモジュールをインストールする

    npm i -D gulp gulp-concat gulp-merge-media-queries gulp-notify gulp-plumber gulp-postcss gulp-rename gulp-sass gulp-sass-glob gulp-uglify postcss autoprefixer css-declaration-sorter gulp-babel @babel/core @babel/preset-env

このコマンドを入力すると、手順4のディレクトリ直下に、package-lock.jsonとnode_modulesフォルダが作られる。

案件ごとに作るイメージです。

これらのモジュールをインストールすることで、ファイルを更新した際にいろんなことができるようになる。
ほかにも、たとえば画像圧縮用のモジュールなどいろいろある。

ちなみに、i は install、-D は --save-dev の略。
`npm i -D gulp`は、`npm install --save-dev gulp`と同様。

ERRORが出ていないことを祈りたいところだが、もしERRORが出てしまった場合は、放置すると動かないので修正が必要だ。Permissionエラーであれば、さきほどと同様、`sudo`を最初につけることで解消される場合がほとんどだが、ERRORが出る場合、どこでエラーが出たかを確認するためにとりあえず個別にインストールしてみる。

    npm i -D gulp
    npm i -D gulp-concat
    npm i -D gulp-merge-media-queries
    npm i -D gulp-notify
    npm i -D gulp-plumber
    npm i -D gulp-postcss
    npm i -D gulp-rename
    npm i -D gulp-sass
    npm i -D gulp-sass-glob
    npm i -D gulp-uglify
    npm i -D postcss
    npm i -D autoprefixer
    npm i -D css-declaration-sorter
    npm i -D gulp-babel
    npm i -D @babel/core
    npm i -D @babel/preset-env

そう、ERRORが出たときの闇といったらない。このエラーを回避するためにいろいろググるわけですが、かなりの時間とストレスあり(涙) 。バージョンがどんどん更新されるのですが、その際にERRORが出ること多数な印象...。とりあえず警告はスルーしてます（ほんとは解消したいところですが...）。

### 7. gulpfile.js を用意する

手順4のディレクトリ直下にgulpfile.jsを用意する。

ディレクトリ構成は任意で問題ないのだが、仮に下記のディレクトリ構成の場合として、gulpfile.jsの記述礼を紹介する。

前提：ディレクトリ「sample」を用意し、その中に手順4 のディレクトリ名を「_build」として格納している

    sample
    ┝ _build
    	┝ src
    		┝ sass
    			┝ var.scss
    			┝ setting (設定用scssを格納)
    			┝ base (汎用scssを格納)
    			┝ design (個別scssを格納)
    		┝ js
    			┝ init.js
    			┝ last.js
    			┝ _common (汎用jsを格納)
       			┝ individual (個別jsを格納)
    ┝ assets
    	┝ js
    	┝ css

適当にjsファイルとsassファイルを用意しておき、テストできるようにしておく。

## gulpfile.js 

    const gulp = require('gulp'),
        rename = require("gulp-rename"),
        concat = require("gulp-concat"),
        notify = require('gulp-notify'),
        plumber = require('gulp-plumber'),
        sass = require('gulp-sass'),        
        sassGlob = require('gulp-sass-glob'),
        postcss = require('gulp-postcss'),
        cssdeclsort = require('css-declaration-sorter'),
        autoprefixer = require('autoprefixer'),
        mmq = require('gulp-merge-media-queries'),
    	babel = require('gulp-babel'),
        uglify = require("gulp-uglify");
    
    
    /**
     * 複数のSASSファイル(.scss)を、一枚のCSSファイルにする
     */
    
    // 複数のSASSファイル(.scss)を結合する
    gulp.task('css.concat', () => {
        return gulp.src(['src/sass/var.scss','src/sass/setting/**/*.scss','src/sass/base/**/*.scss','src/sass/design/**/*.scss'])
          .pipe(concat('common.uncompressed.scss'))
          .pipe(gulp.dest('./dist/css'));
      });
    
    // SASSファイル(.scss)をコンパイルする
    gulp.task('sass', () => {
        return gulp
            .src('./dist/css/common.uncompressed.scss')
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    
            // cssファイル内のimportを有効にする
            .pipe(sassGlob())
    
            // コンパイルする(出力形式： expanded, nested, campact, compressed)
            .pipe(sass({
                outputStyle: 'expanded'
            }))
    
            // ベンダープレフィックスを付与する(IEは11以上、Androidは4以上、それ以外は最新2バージョンを対象にしている)
            .pipe(postcss([
                autoprefixer({
                    "overrideBrowserslist": [
                        "last 2 versions",
                        "ie >= 11",
                        "Android >= 4"
                    ],
                    cascade: false
                })
            ]))
    
            // プロパティをアルファベット順に並び替える
            .pipe(postcss([
                cssdeclsort({ order: 'alphabetical' })
            ]))
    
            // メディアクエリをまとめる
            .pipe(mmq())
    
            // 出力先を指定する
            .pipe(gulp.dest('../assets/css'));
    });
    
    // CSSファイルを最小化する(ワンライン)
    gulp.task('css.min', () => {
        return gulp
            .src('../assets/css/common.uncompressed.css')
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(rename('common.min.css'))
            .pipe(gulp.dest('../assets/css')); //コンパイル後の出力先
    });
    
    /**
     * 複数のJSファイルを難読化した一ファイルにまとめる
     */
    
    // JSファイルを結合する
    gulp.task('js.concat', () => {
        return gulp.src(['src/js/init.js','src/js/_common/**/*.js','src/js/individual/**/*.js','src/js/last.js'])
          .pipe(concat('common.concat.js'))
          .pipe(gulp.dest('./dist/js_es6/'));
    });
    
    // ES6 to ES5
    gulp.task('js.babel', () => {
        return gulp.src('./dist/js_es6/common.concat.js')
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
    		.pipe(plumber())
    		.pipe(rename('common.uncompressed.js'))
            .pipe(gulp.dest('../assets/js/'));
    });
    
    // JSファイルを難読化する（ワンライン）
    gulp.task('js.uglify', () => {
        return gulp.src('../assets/js/common.uncompressed.js')
          .pipe(plumber())
          .pipe(uglify())
          .pipe(rename('common.min.js'))
          .pipe(gulp.dest('../assets/js/'));
    });
    
    
    /**
     * 監視する
     */
    gulp.task( 'watch', () => {
        gulp.watch('./src/sass/**/*.scss', gulp.task('css.concat'));
        gulp.watch('./dist/css/common.uncompressed.scss', gulp.task('sass'));
        gulp.watch('../assets/css/common.uncompressed.css', gulp.task('css.min'));
        gulp.watch('./src/js/**/*.js', gulp.task('js.concat'));
        gulp.watch('./dist/js_es6/common.concat.js', gulp.task('js.babel'));
        gulp.watch('../assets/js/common.uncompressed.js', gulp.task('js.uglify'));
    });
    
    // default
    // gulp.task('default', gulp.series(gulp.parallel('watch')));
    gulp.task('default', gulp.task('watch'));


#### 気を付けたところ

 - ファイルを追加・削除するたびにgulpfile.jsを修正しなくてもいいようにアスタリスク（*）処理をしている
 - ファイルの呼び込み順を意識し、本来前後してはいけないような呼び方にならないように配慮している（たとえば、変数宣言の前に変数を参照してしてエラーになるような）


# テスト

sassファイルを`sample/_build/src/sass/`。JSファイルを`sample/_build/src/js/`に適当に入れたらテストしてみる

コンソールに入力していく。

## CSS

### 複数のSASSファイルを一つのSASSファイルに結合する

    gulp css.concat

`sample/dist/css/common.uncompressed.scss`が生成(上書き)される。

### SASSをCSSにし、ベンダープレフィックスを付与し、プロパティをアルファベット順に並び替え、メディアクエリをまとめる

    gulp sass

`sample/assets/css/common.uncompressed.css`が生成(上書き)される。

### ワンライン(最小化)にする

    gulp css.min

`sample/assets/css/common.min.css`が生成(上書き)される。

## JS

### 複数のJSファイルを一つにまとめる

    gulp js.concat

`sample/_build/dist/js_es6/common.concat.js`が生成(上書き)される。

### ES6 を ES5 に変換する

    gulp js.babel

`sample/assets/js/common.uncompressed.js`が生成(上書き)される。

###  ワンライン(難読化)にする

    gulp js.uglify

`sample/assets/js/common.min.js`が生成(上書き)される。

# 監視させる

テストがうまくいけば、あとはファイルを保存したタイミングでテストと同様のことを自動で実行させることができる。

    gulp

監視を中止したい場合は、`control`+`c`。

以上。

