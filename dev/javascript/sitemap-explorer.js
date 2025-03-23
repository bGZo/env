// ==UserScript==
// @name         Sitemap Explorer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  显示当前网站的Sitemap内容
// @author       bGZo
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

(function () {
    'use strict';

    // 创建悬浮按钮
    const floatingBtn = document.createElement('button');
    Object.assign(floatingBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px'
    });
    floatingBtn.textContent = '查看Sitemap';
    document.body.appendChild(floatingBtn);

    // 创建弹窗容器
    const popup = document.createElement('div');
    Object.assign(popup.style, {
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        width: '500px',
        height: '70vh',
        backgroundColor: 'white',
        boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        display: 'none',
        flexDirection: 'column',
        zIndex: 9998,
        overflow: 'hidden'
    });

    // 弹窗头部
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f8f9fa;
    `;

    const title = document.createElement('h3');
    title.textContent = '网站地图列表';
    title.style.margin = '0';
    title.style.fontSize = '16px';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0 8px;
        color: #666;
    `;
    closeBtn.onclick = () => popup.style.display = 'none';

    header.appendChild(title);
    header.appendChild(closeBtn);
    popup.appendChild(header);

    // 内容容器
    const content = document.createElement('div');
    content.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        max-height: calc(70vh - 60px); /* 确保不会超出弹窗高度 */
    `;
    popup.appendChild(content);

    document.body.appendChild(popup);

    // 点击按钮逻辑
    floatingBtn.addEventListener('click', async () => {
        if (popup.style.display === 'block') {
            popup.style.display = 'none';
            return;
        }

        popup.style.display = 'flex'; // 使用flex布局
        popup.style.flexDirection = 'column';
        content.style.overflowY = 'auto';
        content.style.flex = '1'; // 让内容区域占据剩余空间

        // popup.style.display = 'block';
        content.innerHTML = '<div style="padding: 15px; text-align: center; color: #666;">加载中...</div>';

        try {
            const sitemapUrl = `${window.location.origin}/sitemap.xml`;
            const urls = await fetchSitemap(sitemapUrl);

            title.textContent = title.textContent + `（共发现 ${urls.length} 个页面）`


            content.innerHTML = `
               <div style="margin-bottom: 10px; color: #666;">
                    <button id = 'copy'>Copy All</button>
                </div>
                <div style="display: grid; gap: 8px;">
                    ${urls.map(url => `
                        <div style="padding: 12px; background: #f8f9fa; border-radius: 6px;">
                            <a href="${url}" 
                               target="_blank" 
                               style="text-decoration: none; color: #007bff; font-weight: 500;"
                               title="${url}">
                                ${getDisplayTitle(url)}
                            </a>
                            <div style="color: #666; font-size: 12px; margin-top: 4px; word-break: break-all;">
                                ${url}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } catch (error) {
            content.innerHTML = `<div style="color: #dc3545; padding: 15px;">错误: ${error.message}</div>`;
        }
    });

    // 从URL提取显示标题
    function getDisplayTitle(url) {
        try {
            const path = new URL(url).pathname;
            const segments = path.split('/').filter(s => s);
            const lastSegment = segments[segments.length - 1] || '首页';
            return decodeURIComponent(lastSegment);
        } catch {
            return url;
        }
    }

    // 递归获取sitemap数据
    async function fetchSitemap(url) {
        const xml = await request(url);
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");

        // 处理sitemap索引文件
        const sitemapTags = doc.getElementsByTagName('sitemap');
        if (sitemapTags.length > 0) {
            const locs = Array.from(doc.getElementsByTagName('loc'));
            const allUrls = [];
            for (const loc of locs) {
                const childUrls = await fetchSitemap(loc.textContent.trim());
                allUrls.push(...childUrls);
            }
            return allUrls;
        }

        // 处理普通sitemap文件
        return Array.from(doc.getElementsByTagName('loc')).map(loc => loc.textContent.trim());
    }

    // 封装GM_xmlhttpRequest
    function request(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET', url: url, onload: (res) => {
                    if (res.status >= 200 && res.status < 300) {
                        resolve(res.responseText);
                    } else {
                        reject(new Error(`请求失败: ${res.status}`));
                    }
                }, onerror: (err) => reject(err)
            });
        });
    }



})();
