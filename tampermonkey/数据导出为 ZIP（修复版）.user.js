// ==UserScript==
// @name         数据导出为 ZIP（修复版）
// @namespace    http://tampermonkey.net/
// @version      2.0
// @match        https://x.com/*
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

       // 1. 通过GM.xmlHttpRequest获取脚本内容
    const loadScript = (url, callback) => {
        GM.xmlHttpRequest({
            method: "GET",
            url: url,
            onload: (res) => {
                // 2. 创建Blob URL绕过CSP
                const blob = new Blob([res.response], { type: "text/javascript" });
                const url = URL.createObjectURL(blob);
                const script = document.createElement('script');
                script.src = url;
                script.onload = () => URL.revokeObjectURL(url);
                document.head.appendChild(script);
                callback();
            }
        });
    };

      // 3. 链式加载库
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', () => {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js', () => {

            // 确保库已加载
            const { JSZip, saveAs } = unsafeWindow;

            // 创建 ZIP 实例
            const zip = new JSZip();

            // 添加示例文件
            for (let i = 0; i < 10; i++) {
                zip.file(`meta-${i}.json`, 'debug content');
            }

            // 生成并下载
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, 'xhs.zip');
            });

        });
    });



})();