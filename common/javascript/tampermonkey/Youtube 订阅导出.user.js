// ==UserScript==
// @name         Youtube 订阅导出
// @namespace    http://tampermonkey.net/
// @version      4.3
// @description  导出Youtube订阅地址
// @match        https://www.youtube.com/feed/channels
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @license      MIT
// @icon         https://www.youtube.com/favicon.ico
// ==/UserScript==


(function () {
    "use strict";
    console.log('[Youtube导出] 脚本开始执行');

    // 修正后的样式
    GM_addStyle(`
  .export-panel {
    position: fixed;
    top: 200px;
    right: 20px;
    background: white !important;
    color: #333 !important;
    border: 1px solid #eee;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 99999;
    width: 300px;
  }
  .export-btn {
    background: #056b00 !important;
    color: white !important;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
`);

    let capturedCollections = [];
    let capturedLikeCollections = [];

    // 创建导出面板
    function createExportPanel() {
        const panel = document.createElement('div');
        panel.className = 'export-panel';
        panel.innerHTML = `
    <h3>已捕获收藏：<span id="collectionCount">0</span></h3>
    <h3>已捕获喜欢：<span id="likeCount">0</span></h3>
    <button class="export-btn" id="exportCollecitons">导出收藏</button>
    <button class="export-btn" id="exportLikesCollection">导出喜欢</button>
  `;
        document.body.appendChild(panel);

        setTimeout(() => {
            document.getElementById('exportCollecitons').addEventListener('click', handleExportCollections);
            document.getElementById('exportLikesCollection').addEventListener('click', handleExportLikes);
            console.log('按钮事件监听器已绑定');
        }, 1000);

    }

    function updateNoteCount() {
        document.getElementById('collectionCount').textContent = capturedCollections.length;
        document.getElementById('likeCount').textContent = capturedLikeCollections.length;
    }

    // 新版接口处理逻辑
    function interceptRequests() {
        const originalOpen = XMLHttpRequest.prototype.open;

        /**
         * https://www.youtube.com/youtubei/v1/browse?prettyPrint=false
         * https://www.youtube.com/youtubei/v1/player?prettyPrint=false
         * https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8
         * @type {RegExp}
         */
        const subscriptionsPattern = /\/youtubei\/v1\/browse/

        const originalResponseText = Object.getOwnPropertyDescriptor(
            XMLHttpRequest.prototype,
            "responseText"
        );

        XMLHttpRequest.prototype.open = function (method, url) {
            originalOpen.apply(this, arguments);

            const xhr = this;
            const handleResponse = (response) => {
                try {
                    const data = JSON.parse(response);
                    console.log('[接口响应]', data);

                    // 处理收藏接口
                    if (subscriptionsPattern.test(url)) {
                        console.log('[捕获订阅]', contents?.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.shelfRenderer?.content?.expandedShelfContentsRenderer?.items);
                        // contents?.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.shelfRenderer?.content?.expandedShelfContentsRenderer?.items?.forEach(note => {

                        contents?.twoColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.shelfRenderer?.content?.expandedShelfContentsRenderer?.items?.forEach(note => {
                            const processed = processNote(note);
                            if (processed) {
                                capturedCollections.push(processed);
                                updateNoteCount();
                            }
                        });
                    }
                    // 拦截其他接口

                } catch (e) {
                    console.error('响应处理失败:', e);
                }
            };

            console.log("过滤地址：", url)

            if (originalResponseText?.get) {
                Object.defineProperty(xhr, "responseText", {
                    get: function () {
                        const response = originalResponseText.get.call(this);
                        if (subscriptionsPattern.test(url)) {
                            handleResponse(response);
                        }
                        return response;
                    },
                    configurable: true
                });
            }
        };
    }

    // 处理收藏接口的笔记结构
    function processNote(rawNote) {
        try {
            return {
                id: channelRenderer.channelId,
            };
        } catch (e) {
            console.error('收藏笔记处理失败:', e);
            return null;
        }
    }

    // 生成Markdown
    function generateMarkdown(note) {
        const date = new Date();
        var dateNow = date.toLocaleDateString('en-GB').split('/').reverse().join('-');
        var dateNowFormat = dateNow + 'T00:00:00'

        const article =
            `---
title: ${note.id}
---
`;
        console.log(article);

        return article
    }

    // 初始化
    function init() {
        createExportPanel();
        interceptRequests();
    }

    async function handleExportCollections() {
        console.log('开始导出收藏');
        if (capturedCollections.length === 0) {
            return alert('请先浏览内容确保捕获到笔记');
        }
        exportLikes(capturedCollections)
    }

    function handleExportLikes() {
        console.log('开始导出喜欢');
        if (capturedLikeCollections.length === 0) {
            return alert('请先浏览内容确保捕获到笔记');
        }
        exportLikes(capturedLikeCollections)
    }

    function exportLikes(capturedNotes) {
        try {
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
                    const {JSZip, saveAs} = unsafeWindow;

                    // 创建 ZIP 实例
                    const zip = new JSZip();

                    for (const note of capturedNotes) {
                        zip.file(`${note.id}-${note.title}.md`, generateMarkdown(note));
                    }

                    // 生成并下载
                    zip.generateAsync({type: 'blob'}).then(content => {
                        saveAs(content, 'xhs.zip');
                    });
                });
            });
        } catch (error) {
            console.error('导出失败:', error);
            alert('导出失败，请检查控制台日志');
        }
    }

    init();
})();
