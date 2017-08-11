/*
* @Author: ThinkPad
* @Date:   2017-08-05 15:17:37
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-08-09 19:45:10
*/

'use strict';
require('page/common/header/index.js');
require('./index.css');
require('page/common/nav/index.js');

var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var addressModal = require('./address-modal.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');

var page = {
    data : {
        selectdeAddressId : null,
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
         //地址的选择
         $(document).on('click','.address-item',function(){
            var $this = $(this);
            $this.addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectdeAddressId = $this.data('id');
         });
         //订单提交
         $(document).on('click','.order-submit',function(){
            var shippingId = _this.data.selectdeAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId : shippingId
                },function(res){
                    window.location.href = './payment.html?orderNumber='+ res.orderNo
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips('请选择地址后再提交');
            }

         });
         //地址的添加
         $(document).on('click','.address-add',function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            });
         });
         //地址的编辑
         $(document).on('click','.address-update',function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            console.log(shippingId);
            _address.getAddress(shippingId,function(res){
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
         });
         //地址的删除
         $(document).on('click','.address-delete',function(e){
            var id = $(this).parents('.address-item').data('id');
            e.stopPropagation();
            if (window.confirm('确认要删除该地址嘛？')) {
                _address.deleteAddress(id,function(res){
                    _this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
         });

    },
    //加载地址列表
    loadAddressList : function(){
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress,res);
            $('.address-con').html(addressListHtml);
        },function(errMsg){
            $('.address-con').html('<p class=".err-tip">地址加载失败，请刷新后重试</p>');
        })
    },
    //处理地址列表中选中状态
    addressFilter : function(data){
        if (this.data.selectdeAddressId) {
            var selectdeAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length ; i++) {
                if (data.list[i].id === this.data.selectdeAddressId) {
                    data.list[i].isActive = true;
                    selectdeAddressIdFlag = true;
                }
            };
            //如果以前选中的地址不在列表里，就将其删除
            if (selectdeAddressIdFlag) {
                this.data.selectdeAddressId = null;
            }
        }
    },
    //加载商品清单
    loadProductList : function(){
        var _this = this;
        // loading
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res){
            var productListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
        },function(errMsg){
            $('.product-con').html('<p class=".err-tip">商品信息加载失败，请刷新后重试</p>');
        })
    },
};

$(function(){
    page.init();
})