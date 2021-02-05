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
    return gulp.src(['src/js/first.js','src/js/_common/**/*.js','src/js/individual/**/*.js','src/js/last.js'])
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
