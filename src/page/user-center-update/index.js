/*
* @Author: ThinkPad
* @Date:   2017-07-29 12:15:28
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-31 11:18:48
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
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //点击提交按钮后的动作
        //要在全局监听事件，通过事件冒泡来判断他是哪一个元素
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone    : $.trim($('#phone').val()),
                email    : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer   : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
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