/*
* @Author: ThinkPad
* @Date:   2017-08-01 10:24:41
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-08-02 09:36:06
*/

'use strict';
var _mm = require('util/mm.js');

var _product = {
    //获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            // method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;