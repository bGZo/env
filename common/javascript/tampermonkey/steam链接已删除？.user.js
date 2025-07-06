// ==UserScript==
// @name         steam链接已删除？
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  重新显示steam{链接已删除}的链接
// @author       HCLonely
// @match        *://steamcommunity.com/*
// @match        *://store.steampowered.com/*
// @supportURL   https://blog.hclonely.com/posts/578f9be7/
// @homepage     https://blog.hclonely.com/posts/578f9be7/
// ==/UserScript==

(function() {
    'use strict';
    function showLink(){
        jQuery(".bb_removedlink").hide();
        jQuery(".collapsed_link").show();
        jQuery("a.collapsed_link[href=#]").map((i,e)=>{
            jQuery(e).attr('href',jQuery(e).text().trim());
            jQuery(e).attr('target',"_blank");
        });
    }
    setInterval(showLink,1000);
})();
