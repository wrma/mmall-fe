/*
* @Author: ThinkPad
* @Date:   2017-08-09 19:54:19
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-08-10 19:53:13
*/

'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');

var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');


var page = {
    data : {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function(){
        this.loadOrderList();
        //初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },
    //加载订单列表
    loadOrderList : function(){
        var _this           = this,
            orderListHtml   = '',
            $listCon        = $('.order-list-con');
            $listCon.html("<div class='loading'></div>")
        _order.getOrderList(this.data.listParam,function(res){
            //渲染html
            orderListHtml = _mm.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
            });
        },function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
    },
    //加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        // 封装组件，两种方式 对象 类
        // 两个分页
        // 如果用对象的方式引入，就会相互干扰，
        // 如果用类的方式 就可以new出两个对象 不会造成干扰;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function(){
    page.init();
});
