// ==UserScript==
// @name         数据导出为 ZIP
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  捕获当前页面数据，生成 Markdown 文件并打包为 ZIP 下载
// @author       你
// @match        https://www.xiaohongshu.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 创建 ZIP 并下载
    function exportToZip() {
        const data = captureData();
        const zip = new JSZip();

        for(var i =0;i<10000;i++){
            zip.file(`meta-${i}.json`, JSON.stringify(data, null, 2));
        }

        zip.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, `${data.title.replace(/[\\/:*?"<>|]/g, '_')}.zip`);
        });
    }

    exportToZip()
})();