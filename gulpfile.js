let webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpackConfig = require('./webpack.config'),
    // serverConfig = require('./hotServer'),
    del = require('del'),
    connect = require('gulp-connect');

console.log('!!!!~~~~~~!!!')

gulp.task("webpack-dev-server", function (callback) {
    gutil.log('当前Node环境', process.env.NODE_ENV);
    webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

    var compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, serverConfig).listen(8080, "0.0.0.0", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
    });
});


// console.log(require('./package.json').version);
gulp.task("test", function () {
    gutil.log('test~~~~~~~~~~~~~~~~~~`');
});

gulp.task("clean", function (cb) {
    del([
        webpackConfig.output.path + '/**',
        '!' + webpackConfig.output.path
    ], cb);
    gutil.log('----------------------- 清空完毕 --------------------------')
});

gulp.task('server', ['webpack-dev-server']);

gulp.task('default', ['test']);