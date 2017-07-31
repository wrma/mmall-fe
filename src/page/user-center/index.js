/*
* @Author: ThinkPad
* @Date:   2017-07-19 19:59:50
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-31 10:25:18
*/

'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');


var _mm = require('util/mm.js');
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        })
        //加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo: function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errTips(errMsg);
        });
    }

};
$(function(){
    page.init();
});
