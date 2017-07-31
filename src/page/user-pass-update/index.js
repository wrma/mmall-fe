/*
* @Author: ThinkPad
* @Date:   2017-07-31 14:06:03
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-31 16:56:01
*/

'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var _mm = require('util/mm.js');
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //点击提交按钮后的动作
        //要在全局监听事件，通过事件冒泡来判断他是哪一个元素
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                // id名用短横线连接，变量名用驼峰命名法
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew,
                },function(res, msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    validateForm :function(formData){
        var result = {
            status  : false,
            msg     : '',
        };
        //验证原密码是否为空
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        //检查密码是否是undifined或null，否则直接判断长度会报错
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '新密码长度不得少于6位';
            return result;
        }
        //验证两次密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        })
    },
};
$(function(){
    page.init();
});