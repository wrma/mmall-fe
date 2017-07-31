/*
* @Author: wrma
* @Date:   2017-06-30 18:58:21
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-31 21:01:51
*/
'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
require('util/slider/index.js');

var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

//banner初始化
$(function() {
    //渲染bannerhtml
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml)
    //初始化banner
    var $slider    = $('.banner').unslider({
        dots: true
    });
    //前一张后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev')?'prev':'next';
        //?????
        $slider.data('unslider')[forward]();
    });
});