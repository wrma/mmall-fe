/*
* @Author: ThinkPad
* @Date:   2017-07-07 16:38:16
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-31 09:33:01
*/

'use strict';

require('./index.css');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js')
var _cart   = require('service/cart-service.js')

//导航
var nav = {
    init : function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        $('.js-register').click(function(){
            window.location.href = './register.html';
        });
        $('.js-logout').click(function(){
            _user.logout(function(res){
                //刷新页面
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
                $('.user.not-login').hide().siblings('.user.login').show()
                .find('.user-name').text(res.username);
            },function(errMsg){
                // 检查的端口特殊，没有登录的话不要提示（没有登录就回回调失败的函数，即显示错误提示）
                // _mm.errorTips(errMsg);
                return
            });
    },
    loadCartCount : function(){
        _cart.getCartCount(function(res){
                $('.nav .cart-count').text(res || 0);
            },function(errMsg){
                $('.nav .cart-count').text(0);
            });
    }
};

//输出的时候先执行init()函数，又因为init
// 最后返回了nav对象，所以最后输出了一个nav对象
module.exports = nav.init();