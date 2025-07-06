// ==UserScript==
// @name         Twitter 图片与广告帖子管理器
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  将Twitter上所有带有图片和广告的帖子移入一个隐藏列表，通过右下角按钮显示
// @author       You
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        GM_addStyle
// @grant        GM_info
// ==/UserScript==

(function() {
    'use strict';

    const hiddenTweets = [];
    let processingTimeout = null; // 用于节流

    GM_addStyle(`
        #tm-hidden-tweets-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #1DA1F2;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transition: background-color 0.3s ease;
            font-weight: bold;
        }
        #tm-hidden-tweets-button:hover {
            background-color: #1991DA;
        }

        #tm-hidden-tweets-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            backdrop-filter: blur(5px);
        }

        #tm-hidden-tweets-modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 80%;
            max-height: 90%;
            overflow-y: auto;
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
            position: relative;
            color: #000;
        }
        html.dark #tm-hidden-tweets-modal-content {
            background-color: #242D34;
            color: #E7E9EA;
        }

        #tm-modal-close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #888;
        }
        #tm-modal-close-button:hover {
            color: #555;
        }
        html.dark #tm-modal-close-button {
            color: #E7E9EA;
        }

        .tm-hidden-tweet-container {
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        html.dark .tm-hidden-tweet-container {
            border-bottom: 1px solid #38444D;
        }
        .tm-hidden-tweet-container:last-child {
            border-bottom: none;
        }
    `);

    function containsImage(tweetElement) {
        const imageContainers = tweetElement.querySelectorAll('[data-testid="tweetPhoto"], [data-testid="card.original_size_photo"]');
        return imageContainers.length > 0;
    }

    function isAdTweet(tweetElement) {
        // 1. 检查是否存在 'Ad' 文本，并且在特定的容器中
        const adSpan = tweetElement.querySelector('span.css-1jxf684[class*="r-poiln3"]');
        if (adSpan && adSpan.textContent === 'Ad') {
             // 检查其祖先是否包含 r-1kkk96v 类（来自您提供的HTML）
             if (adSpan.closest('.r-1kkk96v')) {
                 return true;
             }
        }

        // 2. 检查 data-testid="placementTracking" 属性。
        // 广告帖子通常会有一个 data-testid="placementTracking" 的祖先
        // 这个祖先可以是 article 标签本身，也可以是其更外层的 div
        const placementTrackingElements = tweetElement.querySelectorAll('[data-testid="placementTracking"]');
        if (placementTrackingElements.length > 0) {
            return true;
        }
        // 如果 tweetElement 本身在 data-testid="placementTracking" 的子树中
        if (tweetElement.closest('[data-testid="placementTracking"]')) {
            return true;
        }


        // 3. 检查 'Promoted' 文本
        const promotedSpan = tweetElement.querySelector('[data-testid="socialContext"] span');
        if (promotedSpan && promotedSpan.textContent.includes('Promoted')) {
            return true;
        }

        return false;
    }

    function processAndHideTweets() {
        const tweets = document.querySelectorAll('article[data-testid="tweet"]');

        tweets.forEach(tweet => {
            const tweetCell = tweet.closest('[data-testid="cellInnerDiv"]'); // 找到包含整个推文的父容器

            if (!tweetCell || tweetCell.dataset.tmProcessed === 'true') {
                return; // 已经处理过或者找不到父容器，跳过
            }

            try {
                if (containsImage(tweet) || isAdTweet(tweet)) {
                    tweetCell.dataset.tmProcessed = 'true'; // 标记为已处理

                    // 克隆帖子容器，并添加到隐藏列表
                    const clonedTweetCell = tweetCell.cloneNode(true);
                    hiddenTweets.push(clonedTweetCell);

                    // 从DOM中移除原始帖子容器
                    if (tweetCell.parentNode) {
                        tweetCell.parentNode.removeChild(tweetCell);
                        // console.log('Removed:', tweetCell); // 调试日志
                    }
                }
            } catch (e) {
                console.error('Error processing tweet/ad:', e);
                console.error('Problematic element:', tweetCell || tweet);
                tweetCell.dataset.tmProcessed = 'error'; // 标记为错误，避免重复尝试处理
            }
        });

        updateButtonCount();
    }

    // 函数：节流版本的 processAndHideTweets
    // 每 delay 毫秒只执行一次
    const throttleProcessAndHideTweets = (delay) => {
        if (processingTimeout) {
            clearTimeout(processingTimeout);
        }
        processingTimeout = setTimeout(() => {
            processAndHideTweets();
            processingTimeout = null; // 清除计时器ID
        }, delay);
    };

    function updateButtonCount() {
        const button = document.getElementById('tm-hidden-tweets-button');
        if (button) {
            button.textContent = hiddenTweets.length > 0 ? `🖼️🚫 ${hiddenTweets.length}` : '🖼️🚫';
            button.title = `显示隐藏的帖子 (${hiddenTweets.length}个)`;
        }
    }

    function showHiddenTweetsModal() {
        if (hiddenTweets.length === 0) {
            alert('当前没有隐藏的图片或广告帖子。');
            return;
        }

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'tm-hidden-tweets-modal-overlay';

        const modalContent = document.createElement('div');
        modalContent.id = 'tm-hidden-tweets-modal-content';

        const closeButton = document.createElement('button');
        closeButton.id = 'tm-modal-close-button';
        closeButton.textContent = 'X';
        closeButton.onclick = () => {
            document.body.removeChild(modalOverlay);
        };
        modalContent.appendChild(closeButton);

        const title = document.createElement('h3');
        title.textContent = '隐藏的图片和广告帖子';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';
        title.style.color = 'inherit';
        modalContent.appendChild(title);

        hiddenTweets.forEach(tweet => {
            const tweetContainer = document.createElement('div');
            tweetContainer.className = 'tm-hidden-tweet-container';
            tweetContainer.appendChild(tweet);
            modalContent.appendChild(tweetContainer);
        });

        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        modalOverlay.onclick = (event) => {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        };
    }

    function createFloatingButton() {
        const button = document.createElement('button');
        button.id = 'tm-hidden-tweets-button';
        button.innerHTML = '🖼️🚫';
        button.title = '显示隐藏的图片和广告帖子';
        button.onclick = showHiddenTweetsModal;
        document.body.appendChild(button);
        updateButtonCount();
    }

    const observerCallback = (mutations, observer) => {
        let relevantMutation = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    // 检查新增节点是否是 article[data-testid="tweet"] 或包含它
                    // 并且只在主内容区域内进行检查，减少不必要的触发
                    if (node.nodeType === 1 && (node.matches('article[data-testid="tweet"]') || node.querySelector('article[data-testid="tweet"]'))) {
                        relevantMutation = true;
                        break;
                    }
                }
            }
            if (relevantMutation) break;
        }
        if (relevantMutation) {
            throttleProcessAndHideTweets(200); // 节流，每200ms最多执行一次
        }
    };

    const observer = new MutationObserver(observerCallback);

    function startObserving() {
        // 尝试监听 Twitter 主内容区域，而不是整个 body
        // 寻找包含推文的公共父容器，例如 data-testid="primaryColumn"
        const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
        const targetNode = primaryColumn || document.body; // 如果找不到主列，就退回到 body

        observer.observe(targetNode, { childList: true, subtree: true });
        console.log('MutationObserver started for tweets and ads on:', targetNode);
    }

    window.addEventListener('load', () => {
        createFloatingButton();
        processAndHideTweets(); // 初始页面加载时处理一次
        startObserving();
    });

    // 额外的定时器作为备用和初始化后内容的捕获
    // 调高间隔，避免与 MutationObserver 冲突
    let intervalId = setInterval(() => {
        // 仅在没有正在处理的延迟任务时才直接运行，或者等待节流器处理
        if (!processingTimeout) {
            processAndHideTweets();
        }
    }, 3000); // 每3秒检查一次

    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
        observer.disconnect();
        if (processingTimeout) {
            clearTimeout(processingTimeout);
        }
        console.log('Script resources cleaned up.');
    });

})();