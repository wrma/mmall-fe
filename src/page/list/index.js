/*
* @Author: ThinkPad
* @Date:   2017-08-01 10:15:49
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-08-02 15:30:01
*/

'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data : {
        listParam: {
            keyword     : _mm.getUrlParam('keyword')    ||  '',
            categoryId  : _mm.getUrlParam('categoryId') ||  '',
            orderBy     : _mm.getUrlParam('orderBy')    ||  'default',
            pageNum     : _mm.getUrlParam('pageNum')    ||  1,
            pageSize    : _mm.getUrlParam('pageSize')   ||  20

        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        //排序的点击事件
        $('.sort-item').click(function(){
             var $this = $(this)
             _this.data.listParam.pageNum = 1;
             //默认排序的点击
            if($this.data('type') === 'default'){
                //已经是active样式
                if($this.hasClass('active')){
                    return;
                }
                //其他
                else{
                    $this.addClass('active')
                    .siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            //点击价格排序
            else if($this.data('type') === 'price'){
                // active类的处理
                $this.addClass('active')
                    .siblings('.sort-item').removeClass('active asc desc');
                // 判断升序降序的处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';

                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            //重新加载List数据
            _this.loadList();
        });
    },
    //加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('p-list-con');
        //在js中加载loading
        $pListCon.html('<div class="loading"></div>');
        //删除参数中不必要的字段
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        //请求接口
        _product.getProductList(listParam,function(res){
            listHtml = _mm.renderHtml(templateIndex,{
                // 接口传回来的list数据
                list : res.list
            })
            $('.p-list-con').html(listHtml);
            //加载分页信息
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
            })
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
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
                _this.loadList();
            }
        }));
    }
};

$(function(){
    page.init();
})