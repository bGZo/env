// ==UserScript==
// @name         ✨超多动漫站点综合优化 移动&桌面端通用🎉
// @name:zh-CN   ✨超多动漫站点综合优化 移动&桌面端通用🎉
// @name:zh-TW   ✨超多動漫站點綜合優化 移動&桌面端通用🎉
// @namespace    https://ayouth.xyz/
// @version      3.0.2
// @description  令人舒畅的联想预测，适配所有网站搜索框，给番剧搜索提提速。嘶哩嘶哩、番茄动漫、风车动漫、橘子动漫、嘛哩嘛哩、acgNya、次元城动漫、漫岛动漫、打驴动漫、路漫漫动漫、ZzzFun动漫、哔咪动漫、樱花动漫、饭团动漫、AGE动漫站点去广告等综合优化，后续会接着扩展和更新。GreasyFork脚本主页和脚本菜单都有持续更新的动漫站点推荐页的链接，不妨收藏一下🎄。
// @description:zh-CN  令人舒畅的联想预测，适配所有网站输入框，给网站搜索提提速。嘶哩嘶哩、番茄动漫、风车动漫、橘子动漫、嘛哩嘛哩、acgNya、次元城动漫、漫岛动漫、打驴动漫、路漫漫动漫、ZzzFun动漫、哔咪动漫、樱花动漫、饭团动漫、AGE动漫站点去广告等综合优化，后续会接着扩展和更新。GreasyFork脚本主页和脚本菜单都有持续更新的动漫站点推荐页的链接，不妨收藏一下🎄。
// @description:zh-TW  令人舒暢的聯想預測，適配所有網站搜索框，給番劇蒐索提提速。嘶哩嘶哩、蕃茄動漫、風車動漫、橘子動漫、嘛哩嘛哩、acgNya、次元城動漫、漫島動漫、打驢動漫、路漫漫動漫、ZzzFun動漫、嗶咪動漫、櫻花動漫、飯團動漫、AGE動漫站點去廣告等綜合優化，後續會接著擴展和更新。 GreasyFork腳本主頁和腳本菜單都有持續更新的動漫站點推薦頁的鏈接，不妨收藏一下🎄。
// @author       Ayouth
// @supportURL   https://ayouth.xyz/msgboard/
// @match        *://www.silisili.tv/*
// @match        *://www.fqfun.com/*
// @match        *://*.dm530p.net/*
// @match        *://*.dm530p.link/*
// @match        *://www.mgnacg.com/*
// @match        *://www.malimali6.com/*
// @match        *://www.acgnya.com/*
// @match        *://pro.ascepan.top/*
// @match        *://www.cycdm01.top/*
// @match        *://www.mandao.tv/*
// @match        *://www.dqsj.cc/*
// @match        *://www.92cj.com/*
// @match        *://www.bimiacg4.net/*
// @match        *://www.mcdm8.com/*
// @match        *://acgfantuan.com/*
// @match        *://www.agemys.net/*
// @match        *://www.hdddex.com/*
// @match        *://www.zzzfun.com/*
// @match        *://www.zzzfun.vip/*
// @icon         https://ayouth.xyz/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        unsafeWindow
// @run-at       document-body
// ==/UserScript==
(function () {
    'use strict';
    class Tool { constructor() { this.services = [] } debounce(e, t, n = !1) { let o; return function (...i) { !o && n && e.apply(this, i), o && clearTimeout(o), o = setTimeout((() => e.apply(this, i)), t) } } throttle(e, t) { let n, o; return function (...i) { const r = (new Date).getTime(); if (o && clearTimeout(o), n) if (r - n >= t) n = r, e.apply(this, i); else { o = setTimeout((() => { n = (new Date).getTime(), e.apply(this, i) }), t - (r - n)) } else n = r, e.apply(this, i) } } delay(e, t, ...n) { return setTimeout(e, t, ...n) } tick(e, t, n, ...o) { let i; const r = () => { clearInterval(i) }, s = () => { e(r, ...o) }; return i = setInterval(s, t), !0 === n && s(), i } open(e, t = "请点击前往") { if (!1 === /macintosh|mac os x/i.test(window.navigator.userAgent)) window.open(e); else { if (null === this.q("style#Toolopen")) { const e = '#Topen:hover { background: #4d76f3; } @keyframes scale-in-center { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 1; } } #Topen { font-family:Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;letter-spacing:1px;font-weight:bold;animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; transition: 0.15s; font-size: 20px; display: block; background: #6589f2; color: #efefef; text-decoration: underline; box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.35); border-radius: 4px; margin: auto; width: fit-content; height: fit-content; z-index: 9999999; position: fixed; top: 0; left: 0; right: 0; bottom: 0; padding: 12px; display: flex; align-items: center; justify-content: center }'; this.injectStyle(e, "Toolopen") } this.qs("a#Topen").forEach((e => e.remove())); const n = document.createElement("a"); n.target = "_blank", n.href = e, n.id = "Topen", n.textContent = t, n.onclick = () => { n.remove() }, document.documentElement.appendChild(n) } return this } addService(e, t, n) { let o = this.services.length; const i = () => { this.removeService(o) }, r = new MutationObserver(((t, n) => { e(t, n, i) })); return r.observe(t, n), this.services.push(r), o } removeService(e) { return null !== this.services[e] && (this.services[e].disconnect(), this.services[e] = null), this } type(e, t) { return "string" == typeof t ? typeof e === t.trim().toLowerCase() : typeof e } ready(e, t = 0) { if ("function" === this.type(e)) { const n = o => { document.removeEventListener("DOMContentLoaded", n), this.delay(e, t, o) }; "loading" != document.readyState ? n(new Event("DOMContentLoaded")) : document.addEventListener("DOMContentLoaded", n) } return this } q(e) { try { return document.querySelector(e) } catch (e) { return null } } qs(e) { try { return [...document.querySelectorAll(e)] } catch (e) { return [] } } injectStyle(e, t) { const n = "string" == typeof t && this.q("#" + t.trim()) || document.createElement("style"); return n.innerHTML += e, "string" == typeof t && (n.id = t), n.isConnected || (document.head ? document.head.insertAdjacentElement("afterend", n) : document.body ? document.body.insertAdjacentElement("beforebegin", n) : document.documentElement.appendChild(n)), this } import(...e) { return Promise.all(e.map((e => new Promise(((t, n) => { const o = e.type || "script", i = e.attr || {}, r = document.createElement(o); Object.keys(i).forEach((e => r.setAttribute(e, i[e]))), (document.body || document.documentElement).appendChild(r), r.onload = e => t({ evt: e, resource: r }), r.onerror = e => n({ evt: e, resource: r }) }))))) } hide(e) { return e instanceof HTMLElement ? this.css(e, { display: "none" }, !0) : this.injectStyle(`${e} { display:none !important; }`, "Toolhide"), this } remove(e) { return this.qs(e).forEach((e => e.remove())), this } css(e, t, n) { let o = ""; if (!(e instanceof HTMLElement)) { if (t) o += "string" == typeof t ? `${e}{ ${t} ;}` : ` ${e}{` + Object.entries(t).map((([e, t]) => `${e}:${t} ${!1 !== n ? "!important" : ""};`)).join(" ") + "}"; else { const t = this.q(e); if (t) return window.getComputedStyle(t) } return this.injectStyle(o, "Toolcss"), this } if (!t) return window.getComputedStyle(e); Object.entries(t).forEach((([t, o]) => { e.style.setProperty(t, o, !1 !== n ? "important" : void 0) })) } on(e, t, n, o) { const i = []; "string" == typeof e ? i.push(...this.qs(e)) : i.push(e); const r = t.split(" ").filter((e => e.length > 0)); i.forEach((e => { r.forEach((t => { const i = () => { e.removeEventListener(t, r, o) }, r = e => { n(e, i) }; e.addEventListener(t, r, o) })) })) } test(e) { const t = (e = e || {}).host instanceof Array ? e.host : [e.host || window.location.host], n = e.path instanceof Array ? e.path : [e.path || window.location.pathname]; let o, i = (e, t) => e instanceof RegExp ? e.test(t) : t.indexOf(e) > -1, r = (e, t) => e instanceof RegExp ? e.test(t) : t === e; return o = e.strict ? t.every((e => r(e, location.host))) && n.every((e => r(e, location.pathname))) : t.some((e => i(e, location.host))) && n.some((e => i(e, location.pathname))), o && e.callback && e.callback(), o } var(e, t) { const n = window.unsafeWindow instanceof Window ? window.unsafeWindow : window; return void 0 === e ? n : void 0 === t ? n[e] : (n[e] = t, this) } } const T = new Tool, $log = { connector: " - ", levelColor: { error: "#f91b1b", warning: "#ffc107", success: "#4EE04E", info: "initial" }, getTimeString: () => new Date((new Date).getTime() + 60 * (new Date).getTimezoneOffset() * 1e3 + 288e5).toLocaleString(), print(e, t) { const n = this.levelColor[t], o = `%c${this.getTimeString()}${this.connector}%c${e}`; console.log(o, "color:#1ce8e8", "color:" + n) }, err(e) { this.print(e, "error") }, info(e) { this.print(e, "info") }, suc(e) { this.print(e, "success") }, warn(e) { this.print(e, "warning") } }, $browser = { env: (() => { const e = { webview: /\(.+wv\)/i.test(window.navigator.userAgent), android: /Android/i.test(window.navigator.userAgent), linux: /Linux/i.test(window.navigator.userAgent), ios: /ios/i.test(window.navigator.userAgent), macos: /macOS/i.test(window.navigator.userAgent), windows: /win|Windows/i.test(window.navigator.userAgent), iphone: /iPhone/i.test(window.navigator.userAgent), ipad: /iPad/i.test(window.navigator.userAgent), mobile: /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent), pc: !1 }; return e.pc = !e.mobile, e })(), platform: window.navigator.platform, language: window.navigator.language, Chinese: { traditional: ["zh-TW", "zh-HK", "zh-Hant", "zh-MO"].some((e => e.toLowerCase() === String(window.navigator.language).toLowerCase())), simplified: ["zh-CN", "zh-Hans", "zh-SG", "zh-MY"].some((e => e.toLowerCase() === String(window.navigator.language).toLowerCase())) } };
    class Predict { lastTimestamp = null; constructor(e = "baidu", t, i = "predictiveTypingCallback", s = null) { if (this.objectName = i, this.global = t || window, this.global[i] || (this.global[i] = {}), this.api = e, this.defaultCallback = s, this._initAPI(), !this._apiComponents[e]) throw new Error("illegal api " + e) } _initAPI() { this._apiComponents = { baidu: { argsHandler(...e) { return e[0].s }, urlCreater(e, t) { return "//suggestion.baidu.com/su?wd=" + e + "&cb=" + t } }, bing: { argsHandler(...e) { try { return e[0].AS.Results[0].Suggests.map(e => e.Txt) } catch (e) { return [] } }, urlCreater(e, t) { return "//sg1.api.bing.com/qsonhs.aspx?type=cb&q=" + e + "&cb=" + t } } } } _createWrapper(t, i, s) { const l = this._apiComponents[this.api].argsHandler; return (...e) => { this.lastTimestamp === s && i(t, l(...e)) } } _generateURL(e, t) { return this._apiComponents[this.api].urlCreater(e, t) } setCallback(e) { return this.defaultCallback = e, this } setAPI(e) { if (this.api = e, this._apiComponents[e]) return this; throw new Error("illegal api " + e) } typing(e, t) { this.defaultCallback && !t && (t = this.defaultCallback); var i = this.lastTimestamp = (new Date).getTime(), t = this._createWrapper(e, t, i); e = encodeURIComponent(e), this.global[this.objectName]["_" + i] = t; const s = document.createElement("script"); return s.async = !0, s.referrerPolicy = "no-referrer", s.src = this._generateURL(e, "window." + this.objectName + "._" + i), document.body.appendChild(s), s.onload = s.onabort = s.onerror = () => { s.remove() }, this } } class EasyPredict extends Predict { constructor(e, t = { global: window, api: "baidu", theme: "light", fillValue: void 0, submitCallback: void 0, zIndex: 2022, maxNum: 8, fontFamily: void 0, fontSize: void 0 }) { super(t.api || "baidu", t.global || window), this.el = "string" == typeof e ? document.querySelector(e) : e, this.fillValue = ("function" == typeof t.fillValue ? t : EasyPredict).fillValue, this.submitCallback = "function" == typeof t.submitCallback ? t.submitCallback : () => { }, this.fontFamily = t.fontFamily || "", this.fontSize = t.fontSize || "", this.zIndex = t.zIndex || 2022, this.theme = t.theme || "light", this.maxNum = t.maxNum || 8, this.enabled = !1, this.ul = EasyPredict.createListDOM(this.maxNum), this.ul.style.zIndex = this.zIndex, this.toggleTheme(this.theme), this.resultCount = 0, this.keyword = 0 } toggleTheme(e = "dark") { e = e.toLowerCase(); let t = ["dark"]; t.forEach(e => this.ul.classList.remove(e)), this.theme = e, !1 !== t.includes(e) && this.ul.classList.add(e) } static createListDOM(t = 8) { if (!document.querySelector("style#easy-predict-by-ayouth")) { let e = document.createElement("style"); e.innerHTML = `ul.easy-predict-by-ayouth { transition: 50ms; display: block; position: absolute; z-index: 2022; list-style: none; box-sizing: border-box; padding: 0; margin: 0; letter-spacing: 1px; overflow: hidden; border-radius: 3px; font-weight: 400; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.32); font-size: 16px; width: 200px; font-family: Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; --bg-color: #fafafa; --color: #222325; background-color: var(--bg-color, #efefef); color: var(--color, #18191C); --hover-bg-color: #e6e6e6; --high-light-color: #f25d8e; } ul.easy-predict-by-ayouth.dark { --high-light-color: #fe5f94; --hover-bg-color: rgba(212, 212, 212, 0.25); --bg-color: rgba(0, 0, 0, 0.5); --color: #eeeeee; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.55); } ul.easy-predict-by-ayouth li { transition: 0.15s; display: block; width: auto; cursor: default; padding: 6px; margin: 0; color: inherit; background-color: inherit; font-family: inherit; position: relative; z-index: 1; } ul.easy-predict-by-ayouth li.last::before, ul.easy-predict-by-ayouth li:last-child::before { content: 'Ayouth'; z-index: -1; font-size: 12px; padding: 1.15px; background-color: rgba(236, 118, 105, 0.75); color: rgba(255, 255, 255, 0.9); position: absolute; display: block; bottom: 0; right: 0; } ul.easy-predict-by-ayouth li .high-light { color: var(--high-light-color); font-size: inherit; font-family: inherit; font-style: normal; } ul.easy-predict-by-ayouth li.hover { background-color: var(--hover-bg-color, #d3d3d3); }`, (document.head || document.body).appendChild(e) } let i = document.createElement("ul"); i.className = "easy-predict-by-ayouth"; for (let e = 0; e < t; e++)i.appendChild(document.createElement("li")); return i } static fillValue(e, t) { e.value = t } enable() { this.enabled || (!(this.ul.style.display = "none") === this.ul.isConnected && document.body.appendChild(this.ul), clearInterval(this.tid), this.tid = setInterval(() => { this.followStyle() }, 50), this.followStyle(), this.bindEvents(), document.activeElement === this.el && document.hasFocus() && "" !== this.el.value.trim() && this.events.input(), this.enabled = !0) } disable() { this.enabled && (this.ul.style.display = "none", clearInterval(this.tid), this.unbindEvents(), this.enabled = !1) } render(i, s, e) { i.innerHTML = "", -1 === e.indexOf(s) ? i.textContent = e : e.split(s).forEach((e, t) => { if (0 < t) { let e = document.createElement("span"); e.className = "high-light", e.textContent = s, i.appendChild(e) } "" !== e && i.append(e) }) } bindEvents() { if (!this.events) { this.events = {}, this.liIndex = -1, this.setCallback((i, s) => { let l = (s = s.slice(0, this.maxNum)).length; 0 < l && i === this.el.value ? (this.resultCount = l, this.keyword = i, this.ul.style.display = "block", this.ul.querySelectorAll("li").forEach((e, t) => { t < l ? (e.dataset.text = s[t], this.render(e, i, s[t]), e.style.display = "block") : e.style.display = "none", t == l - 1 ? e.classList.add("last") : e.classList.remove("last") })) : this.ul.style.display = "none" }); let i = (t, i = !1) => { let s = [...this.ul.querySelectorAll("li")]; if (s.forEach(e => e.classList.remove("hover")), 0 <= t) { let e = s[t]; e.classList.add("hover"), i && this.fillValue(this.el, e.dataset.text) } else -1 === t && i && this.fillValue(this.el, this.keyword) }, s = !1; this.events.input = () => { "" === this.el.value.trim() ? this.ul.style.display = "none" : (this.liIndex = -1, i(this.liIndex), this.typing(this.el.value)) }, this.events.mouseover = e => { let t = [...this.ul.querySelectorAll("li")]; e = t.indexOf(e.target); this.liIndex = e, i(this.liIndex) }, this.events.mouseleave = () => { this.liIndex = -1, i(-1) }, this.events.compositionstart = () => { s = !0 }, this.events.compositionend = () => { s = !1 }, this.events.keydown = e => { var t = e.code || e.key; if ("Enter" === t && 0 < this.liIndex) this.submitCallback(this.el.value); else if (!s) { if (0 == ["ArrowDown", "ArrowUp"].includes(t)) return !1; e.preventDefault(), "none" !== this.ul.style.display && (this.liIndex = "ArrowDown" === t ? this.liIndex >= this.resultCount - 1 ? -1 : this.liIndex + 1 : this.liIndex <= -1 ? this.resultCount - 1 : this.liIndex - 1, i(this.liIndex, !0)) } }, this.events.click = e => { e.target !== this.el && (this.ul.style.display = "none") }, this.events.focus = () => { "" !== this.el.value.trim() && this.events.input() }, this.events.ulclick = e => { let t = [...document.querySelectorAll("li")]; t.includes(e.target) && (this.fillValue(this.el, e.target.dataset.text), this.submitCallback(this.el.value)) } } this.ul.addEventListener("click", this.events.ulclick), this.ul.addEventListener("mouseover", this.events.mouseover), this.ul.addEventListener("mouseleave", this.events.mouseleave), this.el.addEventListener("input", this.events.input), this.el.addEventListener("compositionstart", this.events.compositionstart), this.el.addEventListener("compositionend", this.events.compositionend), this.el.addEventListener("focus", this.events.focus), this.el.addEventListener("keydown", this.events.keydown), this.global.document.addEventListener("click", this.events.click) } unbindEvents() { this.events && (this.liIndex = -1, this.ul.removeEventListener("click", this.events.ulclick), this.ul.removeEventListener("mouseover", this.events.mouseover), this.ul.removeEventListener("mouseleave", this.events.mouseleave), this.el.removeEventListener("input", this.events.input), this.el.removeEventListener("compositionstart", this.events.compositionstart), this.el.removeEventListener("compositionend", this.events.compositionend), this.el.removeEventListener("focus", this.events.focus), this.el.removeEventListener("keydown", this.events.keydown), this.global.document.removeEventListener("click", this.events.click)) } static getDOMLocation(e) { return e.getBoundingClientRect() } followStyle() { var e = EasyPredict.getDOMLocation(this.el), e = (this.ul.style.width = e.width + "px", this.ul.style.fontSize = this.fontSize || window.getComputedStyle(this.el).fontSize, this.ul.style.fontFamily = this.fontFamily || "", this.ul.style.top = e.top + e.height + window.scrollY + 2 + "px", this.ul.style.left = e.left + "px", window.getComputedStyle(this.ul)); "hidden" === e.visibility || "none" === e.display ? this.ul.style.display = "none" : this.ul.style.display = "block" } }
    //注册菜单函数
    function register() {
        if (window.top !== window) {
            return;
        }
        if ("undefined" == typeof GM_registerMenuCommand || "undefined" == typeof GM_getValue || "undefined" == typeof GM_setValue) {
            $log.err("当前不处于脚本管理器环境，停止菜单注册");
            return;
        }
        if (!GM_getValue('config')) {
            GM_setValue("config", JSON.stringify(config))
        } else {
            let savedConfig = JSON.parse(GM_getValue("config"));
            //维护和更新已保存的config
            if (T.type(savedConfig.option, "object")) {
                Object.keys(config.option).forEach(key => {
                    if (!T.type(savedConfig.option[key], "undefined")) {
                        config.option[key] = savedConfig.option[key];
                    }
                })
            }
            GM_setValue("config", JSON.stringify(config));
        };
        // 值取true或false的菜单
        const menu = {
            removeNotification: "移除通知",
            predictiveSearch: "联想词预测",
            darkMode: "深色预测UI",
            useBing: "使用Bing接口",
        };
        let commands = [];
        Object.keys(menu).forEach(e => {
            let desc = (config.option[e] ? "✅ " : "❌ ") + menu[e];
            let opposite = !config.option[e];
            let callback = () => {
                config.option[e] = opposite;
                GM_setValue("config", JSON.stringify(config));
                window.location.reload();
            }
            commands.push([desc, callback]);
        });
        for (let command of commands) {
            GM_registerMenuCommand(command[0], command[1]);
        }
        GM_registerMenuCommand("✨ 动漫站点推荐", function () {
            T.open("https://ayouth.xyz/ayouth/animation.html");
        });
        GM_registerMenuCommand("💬 给作者留言", function () {
            T.open("https://ayouth.xyz/msgboard/");
        });
    }
    function startPredict(sel, opt = {}) {
        T.ready(() => {
            let s = T.q(sel);
            if (!s) { return; }
            s.setAttribute("autocomplete", "off");
            new EasyPredict(s, Object.assign({
                api: config.option.useBing ? "bing" : "baidu",
                fontSize: "14px",
                theme: config.option.darkMode ? "dark" : "light",
                global: T.var()
            }, opt)).enable();
        })
    }
    var websites = {
        "嘶哩嘶哩": {
            domain: "www.silisili.tv",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
                if (config.option.removeNotification) {
                    T.hide(".bg_ad");
                    $log.suc("已移除通知");
                }
                if (config.option.predictiveSearch) {
                    startPredict("#input", {
                        submitCallback() {
                            const btn = T.q(".search-submit");
                            btn && btn.click();
                        }
                    });
                }
            },
            common() {
            }
        },
        "番茄动漫": {
            domain: "www.fqfun.com",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
            },
            common() {
                if (config.option.removeNotification) {
                    T.hide(".gonggao,.hengfu,.stui-pannel.stui-pannel-bg.clearfix[style*='margin-bottom']");
                    document.cookie = "tip_fabuye=true;path=/;expires=Fri, 31 Dec 2222 23:59:59 GMT";
                    document.cookie = "tip_tongzhi815=true;path=/;expires=Fri, 31 Dec 2222 23:59:59 GMT";
                    $log.suc("已移除通知");
                }
                if (config.option.predictiveSearch) {
                    startPredict("input[name='wd']", {
                        submitCallback() {
                            let form = T.q("form#search");
                            form && form.submit();
                        }
                    });
                }
            }
        },
        "风车动漫": {
            domain: [".dm530p.net", ".dm530p.link"],
            strict: false,
            onlyRunOnTop: true,
            mobile() {
                //广告
                // T.hide('[style*="z-index: 2147483"]');
            },
            pc() {
            },
            common() {
                if (config.option.predictiveSearch) {
                    T.css(".easy-predict-by-ayouth li", "text-align:left;");
                    startPredict("#keyw", {
                        submitCallback() {
                            let btn = T.q("[type='submit']");
                            btn && btn.click();
                        }
                    });
                }
            }
        },
        "橘子动漫": {
            domain: "www.mgnacg.com",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
            },
            common() {
                T.hide(".elainaad");
                $log.suc("已移除广告");
                if (config.option.predictiveSearch) {
                    startPredict("#txtKeywords", {
                        submitCallback() {
                            let btn = T.q(".search-go[type='submit']");
                            btn && btn.click();
                        }
                    });
                }
            }
        },
        "嘛哩嘛哩": {
            domain: "www.malimali6.com",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
                if (T.test({ path: "/vodplay/" })) {
                    //ad
                    T.hide(".container > a:first-child")
                }
                if (config.option.predictiveSearch) {
                    startPredict("#wd", {
                        submitCallback() {
                            const form = T.q("form#searchform");
                            form && form.submit();
                        }
                    });
                }
            },
            common() {
            }
        },
        "acgNya": {
            domain: ["www.acgnya.com", "pro.ascepan.top"],
            strict: false,
            onlyRunOnTop: false,
            mobile() {
            },
            pc() {
            },
            common() {
                if (location.hostname === "pro.ascepan.top") {
                    // 播放暂停时的ad
                    T.hide("#adv_wrap_hh")
                    $log.suc("已移除暂停时的广告");
                    return;
                }
                // ad
                T.hide("#HMRichBox,#wrap-fixed,#fix_top_dom,#hm_cpm_show");
                T.hide("[id^='show-'],#lUYfV7cQQ");
                if (config.option.removeNotification) {
                    document.cookie = "showBtn=true;path=/;expires=Fri, 31 Dec 2222 23:59:59 GMT";
                    $log.suc("已移除通知");
                }
                if (config.option.predictiveSearch) {
                    startPredict(".search-input", {
                        submitCallback() {
                            const btn = T.q("#searchbutton");
                            btn && btn.click();
                        }
                    });
                }
            }
        },
        "次元城动漫": {
            domain: "www.cycdm01.top",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
            },
            common() {
                T.hide("[class*='ec-ad']");
                $log.suc("已移除广告");
                if (config.option.removeNotification) {
                    document.cookie = "ecPopup=true;path=/;expires=Fri, 31 Dec 2222 23:59:59 GMT";
                    $log.suc("已移除通知");
                }
            }
        },
        "漫岛动漫": {
            domain: "www.mandao.tv",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
            },
            common() {
                // 移除谷歌广告
                T.addService(T.throttle(() => {
                    T.qs(".adsbygoogle").forEach(e => {
                        e.setAttribute("style", "display:none !important;width:0px;opacity:0;");
                    })
                }, 80), document.body, { childList: true, subtree: true });
                T.hide(".adsbygoogle");
                $log.suc("已移除广告");
                if (config.option.predictiveSearch) {
                    startPredict("#keyword", {
                        submitCallback() {
                            let form = T.q("#formsearch");
                            form && form.submit();
                        }
                    });
                }
            }
        },
        "打驴动漫": {
            domain: "www.dqsj.cc",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
            },
            common() {
                // T.hide("#conch-banner");
                T.hide("[class*='ads']");
                $log.suc("已移除广告");
                if (config.option.removeNotification) {
                    document.cookie = "tips=ok;path=/;expires=Fri, 31 Dec 2222 23:59:59 GMT";
                    T.hide("#conch-header+p[style]");
                }
                if (T.test({ path: "/detail/", strict: false })) {
                    T.hide(".hl-full-box > ul>li:last-child *[style]");
                }
            }
        },
        "路漫漫动漫": {
            domain: "www.92cj.com",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
                // 移除广告
                T.ready(() => {
                    const tid = T.tick(() => {
                        for (let index = 0; index < 9999999; index++) {
                            if (index !== tid) {
                                clearInterval(index);
                            }
                        }
                        let el = T.q("#site-footer");
                        let count = 0;
                        while (el && el.nextElementSibling) {
                            if (/ay-|ayouth|admire/.test(el.nextElementSibling.className)) {
                                el = el.nextElementSibling;
                            } else {
                                el.nextElementSibling.remove();
                                count++;
                            }
                        }
                        if (count <= 2) {
                            clearInterval(tid);
                        }
                    }, 500);
                });
                $log.suc("已移除广告");
            },
            pc() {
            },
            common() {
                if (config.option.predictiveSearch) {
                    startPredict("#inputSearch", {
                        submitCallback() {
                            const form = T.q("form#search");
                            form && form.submit();
                        }
                    });
                }
            }
        },
        "ZzzFun动漫": {
            domain: ["www.zzzfun.com", "www.zzzfun.vip"],
            strict: false,
            onlyRunOnTop: true,
            mobile() {
                //广告
            },
            pc() {
                if (config.option.removeNotification) {
                    if (T.test({ path: '/vod' })) {
                        T.hide("#new_tip1");
                    }
                }
            },
            common() {
                if (config.option.predictiveSearch) {
                    //pc
                    startPredict(".search-input", {
                        submitCallback() {
                            let btn = T.q("#searchbutton");
                            btn && btn.click();
                        }
                    });
                    //手机
                    startPredict("input.leo-fs-m", {
                        submitCallback() {
                            const btn = T.q("span.icon-search:nth-child(2)");
                            btn && btn.click();
                        }
                    });
                }
            }
        },
        "哔咪动漫": {
            domain: "www.bimiacg4.net",
            strict: false,
            onlyRunOnTop: false,
            mobile() {
                //去除N个广告
                T.ready(() => {
                    const removeAd = T.throttle(() => {
                        let el = T.q("body > #theme-body");
                        while (el && el.nextElementSibling) {
                            if (/ay-|ayouth|admire/.test(el.nextElementSibling.className)) {
                                el = el.nextElementSibling;
                            } else {
                                el.nextElementSibling.remove();
                            }
                        }
                    }, 80);
                    removeAd();
                    T.addService(removeAd, document.body, { childList: true, subtree: true });
                })
                T.hide("brde");
                T.hide(".ssr1");
                // T.hide("[id][style='margin-top: 0px; margin-left: 0px;']");
                // T.hide("div[id][style^='display: block; width: 100%;']");
                T.css(".leo-container", "width:100%;position:absolute;top:0;z-index:999");
                $log.suc("已移除N个广告");
                if (config.option.removeNotification) {
                    T.hide(".leo-gonggao-body.leo-bg-a")
                    $log.suc("已移除通知");
                }
            },
            pc() {
            },
            common() {
                // 广告
                T.hide("[class*='tuiguang'],#HMRichBox,#HMcoupletDivleft,#HMcoupletDivright");
                //播放的广告
                T.hide("#adv_wrap_hh");
                T.hide(".play-player > #bkcl");
                if (T.test({ path: '/play/' })) {
                    T.hide(".main >marquee:first-child");
                }
                $log.suc("已移除N个广告");
                if (config.option.removeNotification) {
                    T.hide(".area> .tuiguang + div[style*='color']");
                    $log.suc("已移除通知");
                }
                if (config.option.predictiveSearch) {
                    startPredict("#ffsearch > .text", {
                        submitCallback() {
                            const form = T.q("#ffsearch");
                            form && form.submit();
                        }
                    });
                }
            }
        },
        "樱花动漫": {
            domain: "www.mcdm8.com",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
                T.ready(() => {
                    T.tick(destroy => {
                        let el = T.q("body > .myui-extra.clearfix");
                        let count = 0;
                        while (el && el.nextElementSibling) {
                            if (/ay-|ayouth|admire/.test(el.nextElementSibling.className)) {
                                el = el.nextElementSibling;
                            } else {
                                el.nextElementSibling.remove();
                                count++;
                            }
                        }
                        if (count > 8) {
                            $log.suc("已移除广告");
                            destroy();
                        }
                    }, 200);
                }, 200)
            },
            pc() {
            },
            common() {
                // 移除播放的障碍
                T.hide("[src*='/ad.html']");
                if (config.option.removeNotification) {
                    document.cookie = "closeclick=closeclick2;path=/;expires=Fri, 31 Dec 2222 23:59:59 GMT";
                    $log.suc("已移除通知");
                }
            }
        },
        "饭团动漫": {
            domain: "acgfantuan.com",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
            },
            common() {
                if (config.option.predictiveSearch) {
                    startPredict(".header__search-content>input", {
                        submitCallback() {
                            const btn = T.q(".header__search-content>button");
                            btn && btn.click();
                        }
                    });
                }
                //ad
                T.hide(".container>.row[style^='margin-bottom:']");
            }
        },
        "AGE动漫": {
            domain: "www.agemys.net",
            strict: false,
            onlyRunOnTop: true,
            mobile() {
            },
            pc() {
            },
            common() {
                if (T.test({ path: ['/play/', '/detail/'] })) {
                    T.hide("#container  div[style^='text-align:center;']");
                }
                if (config.option.removeNotification) {
                    T.hide("#new_tip1,#app-dl-m,.app-dl");
                }
                if (config.option.predictiveSearch) {
                    startPredict("#top_search_input", {
                        submitCallback() {
                            let form = T.q("#top_search_from");
                            form && form.submit();
                        }
                    });
                }
            }
        },

    }
    // 配置 
    var config = { "id": "425083", "version": "3.0.2", "option": { useBing: false, darkMode: false, predictiveSearch: true, removeNotification: false } };
    $log.suc(`超多动漫站点综合优化-${config['version']} 正在运行...`);
    let name = null, obj = null;
    for (let key of Object.keys(websites)) {
        let item = websites[key];
        if (T.test({ host: item.domain, strict: item.strict })) {
            name = key;
            obj = item;
        }
    }
    if (name === null) {
        $log.err("当前站点不在该脚本有效运行范围内！");
        return;
    } else {
        $log.suc("当前站点：" + name);
    }
    // 注册
    register();
    if (window.top !== window && obj.onlyRunOnTop !== false) {
        $log.warn("当前不处于顶部窗口，并且不允许在非顶部运行！");
        return;
    }
    //执行
    $browser.env.mobile ? obj.mobile() : obj.pc();
    obj.common();
    //版本
    (function () { if ("undefined" != typeof config) localStorage.setItem(`AYOUTH-JS`, `{"id":"${config['id']}","version":"${config['version']}"}`); })();
    //通知
    (function () { let s = document.createElement('script'); s.charset = 'utf-8'; s.type = 'text/javascript'; s.referrerPolicy = 'unsafe-url'; s.async = true; s.src = `//ayouth.xyz/ayouth/post/${config['id']}.js?v=${config['version']}&t=${parseInt((new Date()).getTime() / (6 * 1000))}`; document.documentElement.appendChild(s) })();
})();