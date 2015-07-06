// todo https://github.com/jonkemp/gulp-useref http://imziv.com/blog/article/read.htm?id=60
// http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt
// gulp-changed 获得那些修改的文件
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins'); // 加载所有的插件
var plugins = gulpLoadPlugins();
var del = require('del');
var vinylPaths = require('vinyl-paths');
var pkg = require('./package.json');
var combiner = require('stream-combiner2');
var gutil = plugins.util;
var handleError = function(err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}


var SRC_PATH = 'src';
var DIST_PATH = 'dist';

var paths = {
    js: [ // js目录
        SRC_PATH + '/**/*.js' // , '!' + SRC_PATH + '/**/*.min.js'排除已经压缩过的js
    ],
    css: [
        SRC_PATH + '/**/*.css'
    ],
    image: [
        SRC_PATH + '/**/*.+(png|gif|jpg|jpeg)'
    ],
    html: [
        SRC_PATH + '/**/*.html'
    ],
    demo: [
        SRC_PATH + 'views/demo.html', SRC_PATH + 'assets/+(css|image|js)/demo'
    ]
};
// /**/*.+(png|gif|jpg|jpeg) 是glob(简化的正则)语法。具体见 https://github.com/isaacs/node-glob

gulp.task('build', ['min-js', 'min-css', 'move-image', 'move-html']);

// 压缩js
gulp.task('min-js', ['remove-dist-js'], function() {
    var combined = combiner.obj([gulp.src(paths.js),
        plugins.sourcemaps.init(),
        plugins.stripDebug(), // 去掉console，alert，debugger语句
        plugins.uglify(), // 压缩
        plugins.sourcemaps.write('.'),
        gulp.dest(DIST_PATH)
    ]);
    combined.on('error', handleError);// 优化报错信息
    return combined;
});

// 压缩css
gulp.task('min-css', ['remove-dist-css'], function() {
    return gulp.src(paths.css)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.minifyCss()) // 压缩
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_PATH)); // 移动到目标文件。若目标文件夹不存在，会自动创建
});

// 移动HTML
gulp.task('move-html', ['remove-dist-html'], function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task('move-image', ['remove-dist-image'], function() {
    return gulp.src(paths.image)
        .pipe(gulp.dest(DIST_PATH));
});

// 如果要压缩图片，用 gulp-imagemin。这里不用的元素是，安装插件这个异常慢。。。 npm install gulp-imagemin --save-dev
// gulp.task('min-image', ['remove-dist-image'], function() {
//     return gulp.src(paths.image)
//         .pipe(plugins.imagemin({ progressive: true }))
//         .pipe(gulp.dest(DIST_PATH));
// });

gulp.task('remove-dist-js', function() {
    return gulp.src(DIST_PATH + '/**/*.js', {
            read: false
        })
        .pipe(vinylPaths(del));
});

gulp.task('remove-dist-css', function() {
    return gulp.src(DIST_PATH + '/**/*.css', {
            read: false
        })
        .pipe(vinylPaths(del));
});

gulp.task('remove-dist-html', function() {
    return gulp.src(DIST_PATH + '/**/*.html', {
            read: false
        })
        .pipe(vinylPaths(del));
});

gulp.task('remove-dist-image', function() {
    return gulp.src([DIST_PATH + '/**/*.+(png|gif|jpg|jpeg)'], {
            read: false
        })
        .pipe(vinylPaths(del));
});

// 删除demo
gulp.task('remove-demo', function() {
    return gulp.src(paths.demo, {
            read: false
        })
        .pipe(vinylPaths(del));
});
