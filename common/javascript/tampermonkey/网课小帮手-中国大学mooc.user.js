// ==UserScript==
// @name         网课小帮手-中国大学mooc
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  支持自动挂机看中国大学MOOC视频，默认9999倍极速，5分钟看完一科，适合自用，支持视频静音倍速,屏蔽题目；使用免费，无需充值积分，安装即可使用；支持范围广，支持常见浏览器。本插件只提供秒过视频功能，不支持自动答题，查题请关注公众号【网课小帮手8号】
// @author       网课小帮手
// @match        http*://www.icourse163.org/learn/*
// @match        http*://www.icourse163.org/spoc/*
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @license      MIT
// @antifeature  ads 如需查题请关注公众号【网课小帮手8号】
// ==/UserScript==

(function() {
        'use strict';
        let mode = '刷课' //'review'
        let speed = 2 //播放倍率，可以自己设置倍率[0,16]
        let start_time = 99999999 //通过设置开始时间来达到秒过的目的,这个单位是秒

        function change_speed(i) { //修改速度并存储
            document.getElementsByTagName('video')[0].playbackRate += i
            let new_speed = document.getElementsByTagName('video')[0].playbackRate
            GM_setValue('speed', new_speed)
        }

        function show() { //修改速度并存储
            document.querySelector("#speedText").innerText = '播放速度：' + String(document.getElementsByTagName('video')[0].playbackRate.toFixed(1))

        }

        let setFlag
        let main = () => {
            console.log('runmian')
            if (/content/.test(window.location.href)) {
                console.log('kaka_mooc_loaded');

                //防止卡死，每30s定时刷新一次
                if(setFlag){
                    clearTimeout(setFlag)
                }
                setFlag = setTimeout(function(){

                    location.reload()
                }, 3000000);
                let pass = setInterval(function() {

                        let video = document.getElementsByTagName('video')
                        if(document.querySelector('.j-autoNext')){
                            document.querySelector('.j-autoNext').checked = true
                        }

                        if (video.length > 0) {
                            clearInterval(pass)

                            let has_value = GM_getValue('speed')
                            if (has_value) {
                                speed = has_value
                            }
                            video[0].playbackRate = speed
                            video[0].currentTime = Number(GM_getValue('start_time')) || 0
                            video[0].play()
                            let start_time = GM_getValue('start_time') || 0
                            if (!document.querySelector("#startTime")) {
                                let otest = document.querySelector("div.j-unitctBar.unitctBar.f-cb")
                                let nodestr = '</br><div><b id="speedText"></b></br><b>起始秒数：</b><input type="text" id="startTime" placeholder="' + start_time + '" style="border:black;outline: auto;padding-left: 3px;"></div>'
                                let newnode = document.createRange().createContextualFragment(nodestr);
                                otest.insertBefore(newnode, document.querySelector(".j-report-bug"))
                                document.querySelector("#startTime").onblur = function() {
                                    GM_setValue('start_time', Number(document.querySelector("#startTime").value))
                                    GM_setValue('is_focus', 0)
                                }
                                document.querySelector("#startTime").onfocus = function() {
                                    GM_setValue('is_focus', 1)

                                }
                            }
                            show()
                        }
                    },100)
            }

            // Your code here...
        } //main
        let obser = setInterval(
            function() {
                let video = document.querySelector("#courseLearn-inner-box > div > div > div.j-lscontent.lscontent > ul")
                if (video) {
                    clearInterval(obser)
                    main()
                    let observer = new MutationObserver(main)
                    observer.observe(video, {
                        attributes: true,
                        childList: true
                    });
                }
            }, 200
        )
    }
)();
