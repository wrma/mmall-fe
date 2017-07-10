/*
* @Author: ThinkPad
* @Date:   2017-07-10 18:25:51
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-10 19:26:15
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
    element = $('.'+ type + '-success');
    //显示提示元素
    element.show();
})