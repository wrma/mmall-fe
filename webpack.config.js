/*
* @Author: ThinkPad
* @Date:   2017-06-30 19:16:33
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-08-01 10:15:15
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name,title) {
    return{
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common',name]
    };
    // body...
};
//webpackconfig
 var config = {
     entry: {
        'result'                : ['./src/page/result/index.js'],
        'common'                : ['./src/page/common/index.js'],
        'index'                 : ['./src/page/index/index.js'],
        'list'                  : ['./src/page/list/index.js'],
        'user-login'            : ['./src/page/user-login/index.js'],
        'user-register'         : ['./src/page/user-register/index.js'],
        'user-center'           : ['./src/page/user-center/index.js'],
        'user-center-update'    : ['./src/page/user-center-update/index.js'],
        'user-pass-reset'       : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js'],
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
            //探测到后缀名为.css的文件，就对其使用style-loader和css-loader
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
         new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
         new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
         new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
         new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
         new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
         new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
         new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
         new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','重置密码')),
         new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
     ]
 };

 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

 module.exports = config;