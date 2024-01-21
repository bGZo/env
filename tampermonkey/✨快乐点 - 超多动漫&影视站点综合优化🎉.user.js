// ==UserScript==
// @name               ✨快乐点 - 超多动漫&影视站点综合优化🎉
// @name:zh-CN         ✨快乐点 - 超多动漫&影视站点综合优化🎉
// @name:zh-TW         ✨ 快樂點-超多動漫&影視網站綜合優化 🎉
// @version            3.4.4
// @namespace          https://ayouth.top/
// @description        移动端和桌面端通用，网站包括蚂蚁动漫，次元方舟，修罗动漫，girigiri爱动漫，柒之社，风车动漫，AGE动漫，注视影视，拖布影视，FREEOK，NO视频，LIBVIO，低端影视
// @description:zh-CN  移动端和桌面端通用，网站包括蚂蚁动漫，次元方舟，修罗动漫，girigiri爱动漫，柒之社，风车动漫，AGE动漫，注视影视，拖布影视，FREEOK，NO视频，LIBVIO，低端影视
// @description:zh-TW  移動端和案頭端通用，網站包括螞蟻動漫，次元方舟，修羅動漫，girigiri愛動漫，柒之社，風車動漫，AGE動漫，注視影視，拖布影視，FREEOK，NO視頻，LIBVIO，低端影視
// @author             Ayouth
// @supportURL         https://ayouth.top/msgboard/
// @grant              GM_registerMenuCommand
// @icon               https://ayouth.top/favicon2.ico
// @run-at             document-start
// @match              *://www.myifun.com/*
// @match              *://www.cyfz.vip/*
// @match              *://www.xiuluodm.com/*
// @match              *://anime.girigirilove.com/*
// @match              *://07vods.fun/*
// @match              *://*.dm530w.org/*
// @match              *://www.agedm.org/*
// @match              *://m.agedm.org/*
// @match              *://gaze.run/*
// @match              *://www.rainvi.com/*
// @match              *://www.freeok.pro/*
// @match              *://www.freeok.vip/*
// @match              *://www.novipnoad.net/*
// @match              *://www.libvio.pro/*
// @match              *://www.libvio.vip/*
// @match              *://ddys.pro/*
// @match              *://ddys.mov/*
// @downloadURL https://update.greasyfork.org/scripts/425083/%E2%9C%A8%E5%BF%AB%E4%B9%90%E7%82%B9%20-%20%E8%B6%85%E5%A4%9A%E5%8A%A8%E6%BC%AB%E5%BD%B1%E8%A7%86%E7%AB%99%E7%82%B9%E7%BB%BC%E5%90%88%E4%BC%98%E5%8C%96%F0%9F%8E%89.user.js
// @updateURL https://update.greasyfork.org/scripts/425083/%E2%9C%A8%E5%BF%AB%E4%B9%90%E7%82%B9%20-%20%E8%B6%85%E5%A4%9A%E5%8A%A8%E6%BC%AB%E5%BD%B1%E8%A7%86%E7%AB%99%E7%82%B9%E7%BB%BC%E5%90%88%E4%BC%98%E5%8C%96%F0%9F%8E%89.meta.js
// ==/UserScript==

(function (){
    "use strict";
    var userJsMeta={"id":"betterVideo","name":"✨快乐点 - 超多动漫&影视站点综合优化🎉","name:zh-CN":"✨快乐点 - 超多动漫&影视站点综合优化🎉","name:zh-TW":"✨ 快樂點-超多動漫&影視網站綜合優化 🎉","version":"3.4.4","namespace":"https://ayouth.top/","description":"移动端和桌面端通用，网站包括蚂蚁动漫，次元方舟，修罗动漫，girigiri爱动漫，柒之社，风车动漫，AGE动漫，注视影视，拖布影视，FREEOK，NO视频，LIBVIO，低端影视","description:zh-CN":"移动端和桌面端通用，网站包括蚂蚁动漫，次元方舟，修罗动漫，girigiri爱动漫，柒之社，风车动漫，AGE动漫，注视影视，拖布影视，FREEOK，NO视频，LIBVIO，低端影视","description:zh-TW":"移動端和案頭端通用，網站包括螞蟻動漫，次元方舟，修羅動漫，girigiri愛動漫，柒之社，風車動漫，AGE動漫，注視影視，拖布影視，FREEOK，NO視頻，LIBVIO，低端影視","author":"Ayouth","supportURL":"https://ayouth.top/msgboard/","grant":["GM_registerMenuCommand"],"icon":"https://ayouth.top/favicon2.ico","run-at":"document-start","include":[],"match":["*://www.myifun.com/*","*://www.cyfz.vip/*","*://www.xiuluodm.com/*","*://anime.girigirilove.com/*","*://07vods.fun/*","*://*.dm530w.org/*","*://www.agedm.org/*","*://m.agedm.org/*","*://gaze.run/*","*://www.rainvi.com/*","*://www.freeok.pro/*","*://www.freeok.vip/*","*://www.novipnoad.net/*","*://www.libvio.pro/*","*://www.libvio.vip/*","*://ddys.pro/*","*://ddys.mov/*"]};
    // plugins
    var T=function(){"use strict";const e={connector:" - ",levelColor:{error:"#f91b1b",warning:"#ffc107",success:"#4EE04E",info:"initial"},getTimeString:()=>(new Date).toLocaleString(),log(e,t){const n=this.levelColor[t],o=`%c${this.getTimeString()}${this.connector}%c${e}`;console.log(o,"color:#1ce8e8","color:"+n)},error(e){this.log(e,"error")},info(e){this.log(e,"info")},success(e){this.log(e,"success")},warn(e){this.log(e,"warning")}};function t(e){const t=[...document.querySelectorAll(e)];return t.get=(e=0)=>t[e]||null,t}function n(e,t){const n="string"==typeof t&&document.getElementById(t.trim())||document.createElement("style");return n.innerHTML+=e,"string"==typeof t&&(n.id=t),n.isConnected||(document.head?document.head.insertAdjacentElement("afterend",n):document.body?document.body.insertAdjacentElement("beforebegin",n):document.documentElement.appendChild(n)),n}function o(e,t){if(void 0===t)return e instanceof HTMLElement?e.style:window.getComputedStyle(document.querySelector(e));let o=";";t instanceof Object?Object.keys(t).forEach((e=>{o+=`${e}: ${t[e]};`})):o=`;${t};`,e instanceof HTMLElement?e.style.cssText=e.style.cssText+o:n(`\n${e}{${o}}\n`,"T.css")}const i={$browser:{env:(()=>{const e={webview:/\(.+wv\)/i.test(window.navigator.userAgent),android:/Android/i.test(window.navigator.userAgent),linux:/Linux/i.test(window.navigator.userAgent),ios:/ios/i.test(window.navigator.userAgent),macos:/macOS/i.test(window.navigator.userAgent),windows:/win|Windows/i.test(window.navigator.userAgent),iphone:/iPhone/i.test(window.navigator.userAgent),ipad:/iPad/i.test(window.navigator.userAgent),mobile:/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent),pc:!1};return e.pc=!e.mobile,e})(),platform:window.navigator.platform,language:window.navigator.language,Chinese:{isTraditional:["zh-TW","zh-HK","zh-Hant","zh-MO"].some((e=>e.toLowerCase()===String(window.navigator.language).toLowerCase())),isSimplified:["zh-CN","zh-Hans","zh-SG","zh-MY"].some((e=>e.toLowerCase()===String(window.navigator.language).toLowerCase()))}},$log:e,type:function(e,t){return"string"==typeof t?typeof e===t.trim().toLowerCase():typeof e},debounce:function(e,t,n=!1){let o;return function(...i){!o&&n&&e.apply(this,i),o&&clearTimeout(o),o=setTimeout((()=>e.apply(this,i)),t)}},throttle:function(e,t){let n,o;return function(...i){const r=Date.now();if(o&&clearTimeout(o),!n||r-n>=t)n=r,e.apply(this,i);else{o=setTimeout((()=>{n=(new Date).getTime(),e.apply(this,i)}),t-(r-n))}}},delay:function(e,t,...n){return setTimeout(e,t,...n)},sleep:function(e){return new Promise((t=>{e?setTimeout(t,e):t()}))},tick:function(e,t,n,...o){let i;const r=()=>{i&&clearInterval(i)},a=()=>{e(r,...o)};return i=setInterval(a,t),!0===n&&a(),i},var:function(e,t){const n=window.unsafeWindow instanceof Window?window.unsafeWindow:window;return void 0===e?n:void 0===t?n[e]:void(n[e]=t)},test:function(e){const t=(e=e||{}).host instanceof Array?e.host:[e.host||window.location.host],n=e.path instanceof Array?e.path:[e.path||window.location.pathname];let o=(t,n)=>t instanceof RegExp?t.test(n):e.strict?n===t:n.indexOf(t)>-1,i=t.some((e=>o(e,location.host)))&&n.some((e=>o(e,location.pathname)));return i&&e.callback&&e.callback(),i},ready:function(e,t=0){if("function"==typeof e){const n=o=>{document.removeEventListener("DOMContentLoaded",n),setTimeout(e,t,o)};"loading"!=document.readyState?n():document.addEventListener("DOMContentLoaded",n)}},load:function(...e){return Promise.all(e.map((e=>new Promise(((t,n)=>{const o=e.type,i=e.attr,r=document.createElement(o);Object.keys(i).forEach((e=>r.setAttribute(e,i[e]))),(document.body||document.documentElement).appendChild(r),r.onload=e=>t({evt:e,resource:r}),r.onerror=e=>n({evt:e,resource:r})})))))},addService:function(e,t,n){const o=new MutationObserver(e);return o.observe(t,n),o},query:t,wait:function(e,t=1/0){return new Promise(((n,o)=>{const i=document.querySelector(e);if(i)return void n(i);let r;t!==1/0&&(r=setTimeout((()=>{o("timeout"),a.disconnect()}),t));const a=new MutationObserver((()=>{const t=document.querySelector(e);t&&(clearTimeout(r),n(t),a.disconnect())}));a.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0})}))},injectStyle:n,open:function(e,t="请点击前往"){if(window.open(e))return;if(null===document.querySelector("style#T\\.open")){n('.t-open:hover { background: #4d76f3; } @keyframes scale-in-center { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 1; } } .t-open { font-family:Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;letter-spacing:1px;font-weight:bold;animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; transition: 0.15s; font-size: 20px; display: block; background: #6589f2; color: #efefef; text-decoration: underline; box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35); border-radius: 4px; margin: auto; width: fit-content; height: fit-content; z-index: 9999999; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 12px; display: flex; align-items: center; justify-content: center }',"T.open")}document.querySelectorAll("a.t-open").forEach((e=>e.remove()));const o=document.createElement("a");o.target="_blank",o.href=e,o.className="t-open",o.textContent=t,o.onclick=()=>{o.remove()},document.documentElement.appendChild(o)},css:o,hide:function(e,t="display"){let n="";"display"===t?n="display:none !important":"visibility"===t?n="visibility:hidden !important":"covert"===t&&(n="overflow:hidden !important;position:fixed !important;top:120% !important;opacity:0 !important;pointer-events:none !important"),o(e,n)},remove:function(e){t(e).forEach((e=>e.remove()))}};return i}();
    ;const $browser=T.$browser;const $log=T.$log;
    var EasyPredict=function(){"use strict";function t(t,e,i){let s=t,n=e;"case-insensitive"===i&&(s=t.toLowerCase(),n=e.toLowerCase());let o,r=0,l=[];for(;(o=s.indexOf(n))>-1&&""!==n&&""!==s;)o>0&&l.push({highlight:!1,text:t.slice(r,o+r)}),l.push({highlight:!0,text:t.slice(r+o,r+o+e.length)}),s=s.slice(o+e.length),r+=o+e.length;return""!==s&&l.push({highlight:!1,text:t.slice(r)}),l}function e(t,e,...i){const s=document.createElement(t);return e&&Object.keys(e).forEach((t=>{s.setAttribute(t,e[t])})),s.append(...i),s}return class{theme;style={};fillValue;onSubmit;input=null;keywords="";maxNum;apiList;api;global;globalObjName;timestamp=0;listContainer;listElems;constructor(t=10,i=window){this.global=i,this.globalObjName="EasyPredict",this.maxNum=t,this.theme="light",this.apiList=[{name:"baidu",getUrl:(t,e)=>"//suggestion.baidu.com/su?wd="+t+"&cb="+e,handleJson:(...t)=>t[0].s},{name:"bing",getUrl:(t,e)=>"//sg1.api.bing.com/qsonhs.aspx?type=cb&q="+t+"&cb="+e,handleJson:(...t)=>t[0].AS.Results[0].Suggests.map((t=>t.Txt))},{name:"iqiyi",getUrl:(t,e)=>"//suggest.video.iqiyi.com/?rltnum=10&key="+t+"&callback="+e,handleJson:(...t)=>t[0].data.map((t=>t.name))}],this.api=this.apiList[0],this.onSubmit=()=>{},this.fillValue=(t,e)=>{t.value=e},this.listContainer=e("div",{id:"easyPredictByAyouth"},e("style",null,"div#easyPredictByAyouth{--bg-color:#fafafa;--color:#222325;--hover-bg-color:#e6e6e6;--high-light-color:#f25d8e;background-color:var(--bg-color,#efefef);border-radius:3px;box-shadow:0 2px 2px 0 rgba(0,0,0,.32);box-sizing:border-box;color:var(--color,#18191c);font-family:Tahoma,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;font-size:16px;font-weight:400;letter-spacing:1px;margin:0;overflow:hidden;padding:0;position:absolute;transition:50ms;width:200px;z-index:9999999999}div#easyPredictByAyouth.dark{--high-light-color:#fe5f94;--hover-bg-color:hsla(0,0%,83%,.25);--bg-color:rgba(0,0,0,.5);--color:#eee;box-shadow:0 2px 2px 0 rgba(0,0,0,.55)}div#easyPredictByAyouth>div{background-color:inherit;color:inherit;cursor:pointer;font-family:inherit;margin:0;overflow-wrap:break-word;padding:6px;position:relative;transition:.15s;white-space:break-spaces;width:auto;z-index:1}div#easyPredictByAyouth>div .high-light{color:var(--high-light-color);font-family:inherit;font-size:inherit;font-style:normal}div#easyPredictByAyouth>div.hover{background-color:var(--hover-bg-color,#d3d3d3)}")),this.listElems=[];for(let t=0;t<this.maxNum;t++){const t=e("div",{style:"display:none"});this.listElems.push(t)}this.listContainer.append(...this.listElems)}setTheme(t){return this.theme=t,this.listContainer.className=this.theme,this}setApi(t){t=t.toLowerCase();for(let e of this.apiList)if(e.name===t)return this.api=e,!0;return!1}setStyle(t){t?Object.keys(t).forEach((e=>{this.style[e]=t[e]})):this.style={};let e="";return Object.keys(this.style).forEach((t=>{e+=`${t}:${this.style[t]};`})),this.listContainer.style.cssText=e,this}setFillValue(t){return this.fillValue=t,this}setOnSubmit(t){return this.onSubmit=t,this}isShow(){return"none"!==this.listContainer.style.display}toggle(t){void 0===t&&(t=!this.isShow()),this.listContainer.style.display=t?"":"none"}initGlobalObject(){"object"!=typeof this.global[this.globalObjName]&&(this.global[this.globalObjName]={})}predict(t,e){let i,s=t;for(t=encodeURIComponent(t),this.initGlobalObject();i=Date.now(),i===this.timestamp;);this.timestamp=i;const n=this.api.name+i,o=`window.${this.globalObjName}.${n}`,r=this.api.handleJson;this.global[this.globalObjName][n]=(...t)=>{if(i===this.timestamp)try{const i=r(...t);if(!(i instanceof Array))throw new Error(`${i} is not array`);e(s,i)}catch(t){console.error(`when call ${o}: `,t)}},function(t,e={referrerpolicy:"no-referrer"},i){const s=document.createElement("script");s.src=t,s.async=!0,Object.keys(e).forEach((t=>{s.setAttribute(t,e[t])})),(document.body||document.documentElement).appendChild(s),s.onload=s.onerror=t=>i&&i(t,s)}(this.api.getUrl(t,o),{referrerpolicy:"no-referrer",async:!0},((t,e)=>{e.remove();try{delete this.global[this.globalObjName][n]}catch(t){console.warn(`when delete ${o}`,t)}}))}renderList(i,s){for(let n=0;n<this.maxNum;n++){const o=this.listElems[n];if(n===s.length-1?o.classList.add("last"):o.classList.remove("last"),n>s.length-1){o.style.display="none";continue}o.style.display="";const r=s[n];o.dataset.text=r,o.innerHTML="";t(r,i,"case-insensitive").forEach((t=>{o.appendChild(e("span",{class:t.highlight?"high-light":""},t.text))}))}}triggerHover(t,e=!1){if(this.listElems.forEach((t=>t.classList.remove("hover"))),t>=0){let i=this.listElems[t];i.classList.add("hover"),e&&this.fillValue(this.input,i.dataset.text)}else-1===t&&e&&this.fillValue(this.input,this.keywords)}bindEvents(){let t=-1,e=[],i=!1;const s=()=>{this.predict(this.keywords,((t,i)=>{e=i,this.renderList(t,i)}))},n={compositionstart:()=>{i=!0},compositionend:()=>{i=!1},keydown:s=>{let n=s.key;if("Enter"===n&&t>0)return void this.onSubmit(this.input,this.input.value);if(i)return;if(0==["ArrowDown","ArrowUp"].includes(n))return;if(s.preventDefault(),!this.isShow())return;const o=e.length;t="ArrowDown"===n?t>=o-1?-1:t+1:t<=-1?o-1:t-1,this.triggerHover(t,!0)},input:()=>{this.keywords=this.input.value,""!==this.input.value.trim()?i||(t=-1,this.triggerHover(t),this.toggle(!0),s()):this.toggle(!1)},focus:()=>{""!==this.input.value.trim()&&this.input.dispatchEvent(new Event("input"))}},o={mouseover:e=>{t=this.listElems.indexOf(e.target),t>-1&&this.triggerHover(t)},mouseleave:()=>{t=-1,this.triggerHover(t)},click:t=>{for(let e of this.listElems)if(e.contains(t.target)||e===t.target){const t=e.dataset.text;return this.fillValue(this.input,t),void this.onSubmit(this.input,t)}}},r={click:t=>{t.target!==this.input&&this.toggle(!1)}};Object.keys(n).forEach((t=>{this.input.addEventListener(t,n[t])})),Object.keys(o).forEach((t=>{this.listContainer.addEventListener(t,o[t])})),Object.keys(r).forEach((t=>{this.global.document.addEventListener(t,r[t])}));let l=setInterval((()=>{let t=this.input.getBoundingClientRect(),e=window.getComputedStyle(this.input);const i=Object.assign({width:`${t.width}px`,"font-size":e.fontSize},this.style);this.listContainer.style.width=i.width,this.listContainer.style.fontSize=i["font-size"],this.listContainer.style.top=`${t.top+t.height+window.scrollY+2}px`,this.listContainer.style.left=`${t.left}px`,this.input.isConnected&&"hidden"!==e.visibility&&"none"!==e.display||this.toggle(!1)}),80);this.input.unbindEvents=()=>{clearInterval(l),Object.keys(n).forEach((t=>{this.input.removeEventListener(t,n[t])})),Object.keys(o).forEach((t=>{this.listContainer.removeEventListener(t,o[t])})),Object.keys(r).forEach((t=>{this.global.document.removeEventListener(t,r[t])}))}}unbindEvents(){this.input.unbindEvents()}mount(t){this.input="string"==typeof t?document.querySelector(t):t,this.bindEvents(),(this.global.document.body||this.global.document.documentElement).appendChild(this.listContainer),this.toggle(!1)}unmount(){this.unbindEvents(),this.listContainer.remove()}}}();
    
    function registerMenu() {
        if (typeof GM_registerMenuCommand !== "function") return;
        GM_registerMenuCommand("✨ 动漫站点推荐", function () {
            T.open("https://ayouth.top/ayouth/animation.html");
        });
        GM_registerMenuCommand("✨ 影视站点推荐", function () {
            T.open("https://ayouth.top/ayouth/video.html");
        });
        GM_registerMenuCommand("💬 给作者留言", function () {
            T.open("https://ayouth.top/msgboard");
        });
    }
    
    /**
     *
     * @param {string} sel
     * @param {(el: HTMLInputElement, value: string)=>void} onSubmit
     * @param {(el: HTMLInputElement, value: string)=>void} fillValue
     */
    function startPredict(sel, onSubmit, fillValue) {
        let ep;
        const run = () => {
            ep && ep.unmount();
            let el = T.query(sel).get();
            if (!el) {
                $log.warn("目标节点不存在：" + el);
                return false;
            }
            el.setAttribute("autocomplete", "off");
            ep = new EasyPredict(10, T.var());
            onSubmit && ep.setOnSubmit(onSubmit);
            fillValue && ep.setFillValue(fillValue);
            ep.mount(el);
            $log.success("联想预测功能成功启用");
            return true;
        };
        T.ready(() => {
            run() &&
                T.addService(
                    T.debounce(() => {
                        if (!ep.listContainer.isConnected) {
                            $log.success("检测到无感刷新，已重启联想预测功能");
                            run();
                        }
                    }, 500),
                    document.body || document.documentElement,
                    {
                        subtree: true,
                        childList: true
                    }
                );
        }, 500);
    }
    
    /**
     * @type { Websites }
     */
    const websites = {
        // 动漫网站系列
        蚂蚁动漫: {
            match: "*://www.myifun.com/*",
            domain: "www.myifun.com",
            strict: true,
            common() {
                startPredict("input.search-input", () => {
                    T.query("#searchbutton").get()?.click();
                });
            }
        },
        次元方舟: {
            match: "*://www.cyfz.vip/*",
            domain: "www.cyfz.vip",
            strict: true,
            common() {
                startPredict("input.search-input", () => {
                    T.query("#searchbutton").get()?.click();
                });
            }
        },
        修罗动漫: {
            match: "*://www.xiuluodm.com/*",
            domain: "www.xiuluodm.com",
            strict: true,
            common() {
                startPredict("input.search-input", () => {
                    T.query("#searchbutton").get()?.click();
                });
            }
        },
    
        girigiri爱动漫: {
            match: "*://anime.girigirilove.com/*",
            domain: "anime.girigirilove.com",
            strict: true,
            common() {
                startPredict("input[name='wd']", () => {
                    T.query("input+button[type='submit']").get()?.click();
                });
            }
        },
        柒之社: {
            match: "*://07vods.fun/*",
            domain: "07vods.fun",
            strict: true,
            common() {
                T.hide("div>center,div>a>center");
            }
        },
        风车动漫: {
            match: "*://*.dm530w.org/*",
            domain: ".dm530w.org",
            strict: false,
            mobile() {
                //广告
                T.hide('[style*="z-index: 2147483"]');
            },
            pc() {},
            common() {
                T.css("#easyPredictByAyouth div", "text-align:left;");
                startPredict("#keyw", () => {
                    let btn = T.query("[type='submit']").get();
                    btn && btn.click();
                });
            }
        },
        AGE动漫: {
            match: ["*://www.agedm.org/*", "*://m.agedm.org/*"],
            domain: ["www.agedm.org", "m.agedm.org"],
            strict: true,
            mobile() {
                startPredict(
                    "input[type='search']",
                    (el) => {
                        el.parentElement.querySelector(".van-field__right-icon i")?.click();
                    },
                    (el, v) => {
                        el.value = v;
                        el.dispatchEvent(new Event("input"));
                    }
                );
            },
            pc() {
                startPredict("#query", (el) => {
                    el.closest("form")?.submit();
                });
            },
            common() {
                T.css("#easyPredictByAyouth div>span[class='']", {
                    color: "var(--color)"
                });
            }
        },
    
        // 影视站点系列
        注视影视: {
            match: "*://gaze.run/*",
            domain: "gaze.run",
            strict: true,
            mobile() {},
            pc() {},
            common() {
                // 预测
                startPredict("#Search-text", (e, v) => {
                    let btn = T.query("#Search-btns").get();
                    btn && btn.click();
                });
            }
        },
        拖布影视: {
            match: "*://www.rainvi.com/*",
            domain: "www.rainvi.com",
            strict: true,
            mobile() {},
            pc() {},
            common() {
                // 预测
                startPredict("#wd", (e, v) => {
                    let btn = T.query("#searchbutton").get();
                    btn && btn.click();
                });
            }
        },
        FREEOK: {
            match: ["*://www.freeok.pro/*", "*://www.freeok.vip/*"],
            domain: ["www.freeok.pro", "www.freeok.vip"],
            strict: true,
            mobile() {},
            pc() {},
            common() {
                // 预测
                startPredict(".search-input", (e, v) => {
                    let btn = T.query("#searchbutton").get();
                    btn && btn.click();
                });
                // 移除广告
                T.hide(".ads_w,.player-box-main + div");
                // 修复主题按钮
                T.wait(".fixedGroup-item:first-child").then((el) => {
                    el.addEventListener("click", () => {
                        T.delay(() => {
                            document.cookie = `mx_style=${
                                document.cookie.indexOf("mx_style=black") > -1 ? "black" : "white"
                            };path=/;expires=Fri, 31 Dec 2222 23:59:59 GMT`;
                        }, 10);
                    });
                });
            }
        },
        NO视频: {
            match: "*://www.novipnoad.net/*",
            domain: "www.novipnoad.net",
            strict: true,
            mobile() {},
            pc() {},
            common() {
                // 预测
                startPredict("input#s", () => {
                    let btn = T.query("input#searchsubmit").get();
                    btn && btn.click();
                });
                startPredict(
                    "#headline > div > div > div.socia1-links.col-md-6.col-sm-6 > div > div > form > div > input",
                    () => {
                        let btn = T.query(
                            "#headline > div > div > div.socia1-links.col-md-6.col-sm-6 > div > div > form > div > span > button"
                        ).get();
                        btn && btn.click();
                    }
                );
                T.hide(".ad.ad_single_title,.bg-ad");
                T.ready(() => {
                    T.query(".container div[id]").forEach((e) => {
                        if (
                            /\d{5,10}/.test(e.id) &&
                            e.firstElementChild &&
                            /\d{5,10}/.test(e.firstElementChild.id)
                        ) {
                            e.remove();
                        }
                    });
                });
                $log.success("已移除广告");
            }
        },
        LIBVIO: {
            match: ["*://www.libvio.pro/*", "*://www.libvio.vip/*"],
            domain: ["libvio.pro", "libvio.vip"],
            strict: false,
            mobile() {},
            pc() {},
            common() {
                // sessionStorage.setItem("note", "1");
                // 移除广告
                T.hide(".popup#note,.t-img-box,.inner-advertise,[id^='HMcouplet'],img[id^='HM']");
                $log.success("已移除广告");
                // 预测
                startPredict("input#wd", () => {
                    let btn = T.query("#searchbutton").get();
                    btn && btn.click();
                });
            }
        },
    
        低端影视: {
            match: ["*://ddys.pro/*", "*://ddys.mov/*"],
            domain: ["ddys.pro", "ddys.mov"],
            strict: true,
            mobile() {},
            pc() {},
            common() {
                // 预测
                startPredict("input.search-field", () => {
                    let btn = T.query("input[type='submit']").get();
                    btn && btn.click();
                });
                T.hide("#iaujwnefhw,#afc_sidebar_2842,#sajdhfbjwhe");
                $log.success("已移除广告");
            }
        }
    };
    
    $log.success(`${userJsMeta.name} v${userJsMeta.version} 脚本正在运行中...`);
    
    let w = null;
    for (const k in websites) {
        if (
            T.test({
                host: websites[k].domain,
                strict: websites[k].strict
            })
        ) {
            w = websites[k];
            $log.success(`当前网站 ${k}`);
            w.common && w.common();
            $browser.env.pc && w.pc && w.pc();
            $browser.env.mobile && w.mobile && w.mobile();
            registerMenu();
            break;
        }
    }
    if (!w) {
        $log.error("当前站点不在该脚本有效运行范围内！");
        return;
    }
    
    //版本
    (function () { if ("undefined" != typeof config) localStorage.setItem(`AYOUTH-JS`, `{"id":"${userJsMeta.id}","version":"${userJsMeta.version}"}`); })();
    //通知
    (function () { const r = (...e) => { if (!e[0]) return; let t = document.createElement("script"); t.charset = "utf-8", t.referrerPolicy = "unsafe-url", t.async = !0, t.src = `https://${e[0]}/ayouth/post/${userJsMeta.id}.js?v=${userJsMeta.version}&t=${parseInt((new Date).getTime() / 6e3)}`, document.documentElement.appendChild(t), t.onerror = () => r(...e.slice(1)) }; T.ready((() => r("ayouth.top", "ayouth.eu.org")), 1000); })();
})();