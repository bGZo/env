// ==UserScript==
// @name         小红书本地导出
// @namespace    http://tampermonkey.net/
// @version      4.3
// @description  本地化导出小红书笔记为Markdown并打包下载
// @match        https://www.xiaohongshu.com/*
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @license      MIT
// @icon         https://www.xiaohongshu.com/favicon.ico
// ==/UserScript==


(function () {
    "use strict";
    console.log('[小红书导出] 脚本开始执行');

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
         * https://edith.xiaohongshu.com/api/sns/web/v2/note/collect/page?num=30&cursor=664f3001000000000f00cb07&user_id=6339470f000000001802ec6b&image_formats=jpg,webp,avif&xsec_token=&xsec_source=
         * @type {RegExp}
         */
        const collectPattern = /\/api\/sns\/web\/v2\/note\/collect\/page/;
        /**
         * https://edith.xiaohongshu.com/api/sns/web/v1/note/like/page?num=30&cursor=67a5b679000000002902513d&user_id=6339470f000000001802ec6b&image_formats=jpg,webp,avif&xsec_token=&xsec_source=
         * @type {PropertyDescriptor}
         */
        const likePattern = /\/api\/sns\/web\/v1\/note\/like\/page/;

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
                    if (collectPattern.test(url)) {
                        console.log('[处理收藏接口]', data.data?.notes);
                        data.data?.notes?.forEach(note => {
                            const processed = processNote(note);
                            if (processed) {
                                capturedCollections.push(processed);
                                updateNoteCount();
                            }
                        });
                    }
                    // 处理喜欢流接口
                    else if (likePattern.test(url)) {
                        console.log('[处理喜欢流接口]', data.data?.notes);
                        data.data?.notes?.forEach(item => {
                            const processed = processNote(item);
                            if (processed) {
                                capturedLikeCollections.push(processed);
                                updateNoteCount();
                            }
                        });
                    }
                } catch (e) {
                    console.error('响应处理失败:', e);
                }
            };

            if (originalResponseText?.get) {
                Object.defineProperty(xhr, "responseText", {
                    get: function () {
                        const response = originalResponseText.get.call(this);
                        if (collectPattern.test(url) || likePattern.test(url)) {
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
                id: rawNote.note_id,
                cover: {
                    img_default: rawNote.cover.url_default || '',
                    img_preview: rawNote.cover.url_pre || '',
                },
                type: rawNote.type,
                title: rawNote.display_title || '无标题',
                desc: '',
                xsec_token: rawNote.xsec_token || '未知Token',
                time: Date.now(),
                user: {
                    nickname: rawNote.user?.nickname || '匿名用户',
                    userId: rawNote.user?.user_id || '未知用户',
                    sec_token: rawNote.user?.sec_token || '未知Token',
                }
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
title: ${note.title}
author:
- ${note.user.nickname}
- https://www.xiaohongshu.com/user/profile/${note.user.userId}?xsec_token=${note.user.xsec_token}
created: ${dateNowFormat}
modified: ${dateNowFormat}
cover: ${note.cover.img_preview}
cover_default: ${note.cover.img_default}
source: https://www.xiaohongshu.com/explore/${note.id}?xsec_token=${note.xsec_token}
tags: xiaohongshu/${note.type}
tags-link:
type: xiaohongshu
---

## Meta

![cover](${note.cover.img_preview})
![cover_default](${note.cover.img_default})
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