/*
* @Author: ThinkPad
* @Date:   2017-06-30 19:16:33
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-07 16:04:29
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name) {
    return{
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        inject :true,
        hash:true,
        chunks:['common',name]
    };
    // body...
};
//webpackconfig
 var config = {
     entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
     },
     output: {
         path: './dist',//存放文件的根目录
         publicPath : '/dist',//访问文件的根目录
         filename: 'js/[name].js'
     },
     externals : {
        'jquery' : 'window.jQuery'
     },
     module: {
        loaders:[
            // { test:/\.css/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            // //探测到后缀名为.css的文件，就对其使用style-loader和css-loader
            // //{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test:/\.css/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            { test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=100&name=resource/[name].[ext]'},
            { test: /\.string$/, loader: 'html-loader'}
        ]
     },
     resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image',
        }
    },
     plugins: [
        //独立通用模块到js/base.js
         new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
         }),
         //把css单独打包到文件里
         new ExtractTextPlugin('css/[name].css'),
         //html模板的处理
         new HtmlWebpackPlugin(getHtmlConfig('index')),
         new HtmlWebpackPlugin(getHtmlConfig('login')),
     ]
 };

 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

 module.exports = config;