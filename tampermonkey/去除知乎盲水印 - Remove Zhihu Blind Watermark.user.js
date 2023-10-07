// ==UserScript==
// @name         去除知乎盲水印 | Remove Zhihu Blind Watermark
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Fuck tracking
// @author       solstice23
// @match        https://www.zhihu.com/
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// @license MIT
// ==/UserScript==

(function() {
    'use strict';
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(`
        #root > div > div[class^='css-']:last-child {
            display: none !important;
            background: none !important;
            opacity: 0 !important;
        }
    `));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        heads[0].appendChild(node);
    } else {
        document.documentElement.appendChild(node);
    }
})();