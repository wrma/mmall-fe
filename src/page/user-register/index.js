/*
* @Author: ThinkPad
* @Date:   2017-07-19 18:19:20
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-25 20:13:29
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单里的错误提示
var formError = {
    show: function(errMsg){
        // errMsg的值一部分来源于ajax返回的错误信息，一部分来源于我们自己定义的错误信息
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('');
    }

};

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //验证user-name
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            //如果用户名为空，则不做验证
            if (!username) {
                return;
            }
            //异步验证用户名是否存在
            _user.checkUsername(username,function(){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        // 注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 回车也进行提交
        $('.user-content').keyup(function(e){
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit : function(){
        var formData = {
                username        : $.trim($("#username").val()),
                password        : $.trim($("#password").val()),
                passwordConfirm : $.trim($("#password-confirm").val()),
                phone           : $.trim($("#phone").val()),
                email           : $.trim($("#email").val()),
                question        : $.trim($("#question").val()),
                answer          : $.trim($("#answer").val()),
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            //提交
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        //验证失败
        else{
            formError.show(validateResult.msg);
        }

    },
    //表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : '',
        };
        // type == "require" 非空验证
        if (!_mm.validate(formData.username,'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //验证密码长度
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        //验证两次输入密码是否一致
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
            return result;
        }
        //验证手机号和邮箱格式
        if (!_mm.validate(formData.phone,'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_mm.validate(formData.email,'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        //验证密码提示问题和答案
        if (!_mm.validate(formData.question,'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer,'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }

        result.status = true;
        result.msg = '验证通过';
        return result;
    }

};
$(function(){
    page.init();
});
