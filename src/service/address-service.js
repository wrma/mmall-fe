/*
* @Author: ThinkPad
* @Date:   2017-08-07 09:54:14
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-08-09 19:28:17
*/

'use strict';
var _mm = require('util/mm.js');

var _address = {
    //获取地址列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize: 50
            },
            // method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //新建收件人
    save : function(addressInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            // method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //更新收件人
    update : function(addressInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            // method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //删除收件人
    deleteAddress : function(shippingId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息
    getAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _address;