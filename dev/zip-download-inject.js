// ==UserScript==
// @name         数据导出为 ZIP（修复版）
// @namespace    http://tampermonkey.net/
// @version      2.0
// @match        https://www.xiaohongshu.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    // 动态注入 JSZip 到页面环境
    const injectScript = (url, callback) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    };

    // 第一步：加载 JSZip
    injectScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', () => {
        // 第二步：加载 FileSaver
        injectScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js', () => {
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