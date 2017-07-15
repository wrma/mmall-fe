/*
* @Author: ThinkPad
* @Date:   2017-07-10 09:05:24
* @Last Modified by:   ThinkPad
* @Last Modified time: 2017-07-11 16:49:31
*/

'use strict';

require('./index.css');
var _mm             = require('util/mm.js');
var templateIndex   = require('./index.string');

//侧边导航
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心'  ,   href : './user-center.html' },
            {name : 'order-list', desc : '我的订单'  ,   href : './order-list.html' },
            {name : 'pass-update', desc : '修改密码'  ,   href : './pass-update.html' },
            {name : 'about', desc : '关于MMall' ,  href : './about.html'}
        ],
    },
    init : function(option){
        //合并选项
        //$.extend()??????
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav : function(){
        //计算active数据
        for(var i = 0, iLength = this.option.navList.length ; i<iLength ; i++)
            //page/index/index.js中navSide.init({ name:'user-center'})使user-center
            if (this.option.navList[i].name === this.option.name) {
                //给navList里的对象新增了一个isActive属性
                this.option.navList[i].isActive = true;
            }
            //渲染List数据
            var navHtml = _mm.renderHtml(templateIndex,{
                navList : this.option.navList
            });
            //html放入容器
            $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;