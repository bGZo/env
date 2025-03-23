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

(function() {
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
        cursor: 'pointer'
    });
    floatingBtn.textContent = '查看Sitemap';
    document.body.appendChild(floatingBtn);

    // 创建弹窗容器
    const popup = document.createElement('div');
    Object.assign(popup.style, {
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        width: '400px',
        maxHeight: '60vh',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        borderRadius: '5px',
        padding: '15px',
        display: 'none',
        flexDirection: 'column',
        zIndex: 9998
    });

    // 创建内容容器
    const content = document.createElement('div');
    content.style.overflowY = 'auto';
    popup.appendChild(content);

    // 关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
        padding: 5px;
    `;
    closeBtn.onclick = () => popup.style.display = 'none';
    popup.appendChild(closeBtn);

    document.body.appendChild(popup);

    // 点击按钮逻辑
    floatingBtn.addEventListener('click', async () => {
        if (popup.style.display === 'block') {
            popup.style.display = 'none';
            return;
        }

        popup.style.display = 'block';
        content.innerHTML = '<div style="padding: 10px">加载中...</div>';

        try {
            const sitemapUrl = `${window.location.origin}/sitemap.xml`;
            const urls = await fetchSitemap(sitemapUrl);

            content.innerHTML = `
                <div style="padding: 5px; border-bottom: 1px solid #eee; font-weight: bold">
                    共找到 ${urls.length} 个URL
                </div>
                <div style="padding-top: 10px">
                    ${urls.map(url => `
                        <div style="padding: 5px; font-size: 13px; word-break: break-all">
                            <a href="${url}" target="_blank">${url}</a>
                        </div>
                    `).join('')}
                </div>
            `;
        } catch (error) {
            content.innerHTML = `<div style="color: red; padding: 10px">错误: ${error.message}</div>`;
        }
    });

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
        return Array.from(doc.getElementsByTagName('loc')).map(
            loc => loc.textContent.trim()
        );
    }

    // 封装GM_xmlhttpRequest
    function request(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: (res) => {
                    if (res.status >= 200 && res.status < 300) {
                        resolve(res.responseText);
                    } else {
                        reject(new Error(`请求失败: ${res.status}`));
                    }
                },
                onerror: (err) => reject(err)
            });
        });
    }
})();