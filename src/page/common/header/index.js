/*
* @Author: ThinkPad
* @Date:   2017-07-07 21:18:23
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-07 22:53:37
*/

'use strict';

require('./index.css');
var _mm = require('util/mm.js');

var header = {
    init : function(){
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            if (e.keyCode === 13) {
                _this.searchSubmit();    
            }
        });

    },
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交时有keyword，正常跳转到list页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;

        }
        //如果为空，则直接返回首页
        else{
            _mm.goHome();
        }
    }
};

header.init();
