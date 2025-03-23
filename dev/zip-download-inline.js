// ==UserScript==
// @name         数据导出为 ZIP（修复版）
// @namespace    http://tampermonkey.net/
// @version      2.0
// @match        https://x.com/*
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// ==/UserScript==

/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/


//# sourceMappingURL=FileSaver.min.js.map


(function() {
    'use strict';

    // 确保库已加载
    // const { JSZip, saveAs } = unsafeWindow;

    // 创建 ZIP 实例
    const zip = new JSZip();

    // 添加示例文件
    for (let i = 0; i < 10; i++) {
        zip.file(`meta-${i}.json`, 'debug content');
    }

    console.log('download start')

    // 生成并下载
    zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'xhs.zip');
    });




})();