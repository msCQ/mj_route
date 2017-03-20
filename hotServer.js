var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require("webpack");
let webpackConfig = require("./webpack.config");
var open = require('open');


var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {        //fixme
    publicPath: webpackConfig.output.publicPath, // Same as `output.publicPath` in most cases.
    stats: {
        colors: true,
    },
    inline: false,
    hot: true,
    noInfo: false,
    // display no info to console (only warnings and errors)
    quiet: false,
    // display nothing to the console
}));
app.use(webpackHotMiddleware(compiler, {
    overlay: true,
    report: true
}));

app.listen(8080, function () {
    open('http://localhost:8080');
});

