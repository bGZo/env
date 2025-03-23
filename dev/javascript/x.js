// ==UserScript==
// @name         推特本地导出
// @namespace    http://tampermonkey.net/
// @version      4.3
// @description  本地化导出推特笔记为Markdown并打包下载
// @match        https://x.com/*
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @license      MIT
// @icon         https://x.com/favicon.ico
// ==/UserScript==


(function () {
    "use strict";
    console.log('[推特导出] 脚本开始执行');

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

        const collectPattern = /\/api\/sns\/web\/v2\/note\/collect\/page/;
        /**
         * https://x.com/i/api/graphql/nWpDa3j6UoobbTNcFu_Uog/Likes?variables={"userId":"774955547850186752","count":20,"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true}&features={"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false}&fieldToggles={"withArticlePlainText":false}
         */
        const likePattern = /i\/api\/graphql\/nWpDa3j6UoobbTNcFu_Uog\/Likes/;

        const originalResponseText = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "responseText");

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
                            const processed = processTwitter(note);
                            if (processed) {
                                capturedCollections.push(processed);
                                updateNoteCount();
                            }
                        });
                    }
                    // 处理喜欢流接口
                    else if (likePattern.test(url)) {
                        console.log('[处理喜欢接口]', data.data?.notes);
                        data.data?.user?.result?.timeline_v2?.timeline?.instructions[0]?.entries?.forEach(item => {
                            const processed = processTwitter(item);
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
                    }, configurable: true
                });
            }
        };
    }

    // 处理收藏接口的笔记结构
    function processTwitter(raw) {
        try {
            if (!raw?.content?.itemContent?.tweet_results?.result) {
                return null;
            }
            const options = {
                timeZone: 'Asia/Shanghai',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const formatter = new Intl.DateTimeFormat('en-CA', options);

            const result = raw.content.itemContent.tweet_results.result;
            return {
                id: result.rest_id || '',
                date_origin_str: result.legacy.created_at || '',
                date_str: formatter.format(new Date(result.legacy.created_at))
                    .replace(/(\d{4})-(\d{2})-(\d{2}), (\d{2}):(\d{2}):(\d{2})/, (_, y, m, d, h, min, s) => `${y}-${m}-${d}T${h}:${min}:${s}`) || '',

                desc: result.legacy.full_text || '',
                user_name: result.core.user_results.result.legacy.screen_name || '',
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

        const article = `---
title: ${note.id}
author:
- ${note.user_name}
- https://x.com/${note.user_name}
created: ${dateNowFormat}
modified: ${dateNowFormat}
published: ${note.date_str}
desc: ${note.desc}
source: https://x.com/${note.user_name}/status/${note.id}
tags: twitter
tags-link:
type: twitter
---

## Embed

![embed on obsidian](https://x.com/${note.user_name}/status/${note.id})

## Content

${note.desc}

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


                    // 确保库已加载
                    const {JSZip, saveAs} = unsafeWindow;

                    // 创建 ZIP 实例
                    const zip = new JSZip();

                    for (const note of capturedNotes) {
                        zip.file(`${note.user_name}-${note.id}.md`, generateMarkdown(note));
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