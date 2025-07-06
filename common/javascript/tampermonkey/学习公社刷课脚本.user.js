// ==UserScript==
// @name         学习公社刷课脚本
// @namespace    https://www.siques.cn/combat/2390.html
// @version      0.5
// @description  一个用于学习公社刷课 的脚本。
// @author       ericshenghao
// @include      https://www.ttcdw.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var script=document.createElement("script");
    script.type="text/javascript";
    document.getElementsByTagName('head')[0].appendChild(script);

    var href = window.location.href
    setTimeout(function(){
        if(href.indexOf("action=toNewMyClass") != -1) {
            //进入 未学完的课程 页面
            document.getElementsByClassName("customcur-tab-text")[1].click()
        }
    },1000)

    setTimeout(function(){
        if(href.indexOf("action=toNewMyClass") != -1) {
            //再次点击，防止因为网速问题，没有跳转到 未学完的课程页面
            //document.getElementsByClassName("customcur-tab-text")[1].click()
            //进入 第一门课程视频播放 页面
            document.getElementsByTagName("tbody")[0].getElementsByClassName("last-cell text-center")[0].getElementsByTagName("a")[0].click()
        }
    },2000)


    setTimeout(function(){
        if(href.indexOf("viewerforccvideo.do") != -1) {
            var courseNumbers = document.getElementsByClassName("cvtb-MCK-course-content").length
            for(var i = 0; i < courseNumbers; i++) {
                var progress = document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")[i].innerText
                //跳转到 未完成视频 分集
                if(progress != "100%") {
                    document.getElementsByClassName("cvtb-MCK-course-content")[i].click()
                }
            }
        }
    },2000)

    // 如果两个 60 秒之后进度没有变化，说明出现点击界面，刷新之
        var after =[]
        setInterval(()=>{

        if(href.indexOf("viewerforccvideo.do") != -1) {
            var courseNumbers = document.getElementsByClassName("cvtb-MCK-course-content").length
            var before = []

            for(var i = 0; i < courseNumbers; i++) {
                var progress = document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")[i].innerText
                // 填充第一轮的进度
                before.push(progress)
                // 第一轮不相等
            }

          if(before.toString() == after.toString()){
                   console.log("一样了")
               location.reload(true)
               }
                // 赋值

                after = before
        }
    },80000)

       setInterval(function(){
        if(href.indexOf("viewerforccvideo.do") != -1) {
            // 视频总数量
            var courseNumbers = document.getElementsByClassName("cvtb-MCK-course-content").length
            var toNextClass = true
            for(let i = 0; i < courseNumbers; i++) {
                // 获取每个视频的进度
                var progress = document.getElementsByClassName("cvtb-MCK-CsCt-studyProgress")[i].innerText

               // 如果有一个未到100%，就继续循环
                if(progress.substring(0,3) !="100"){
                    toNextClass =false

                }
            }
            console.log("是否可以跳转:"+toNextClass)
          if(toNextClass){
              window.location.href ="https://study.enaea.edu.cn/circleIndexRedirect.do?action=toNewMyClass&type=course&circleId=73689&syllabusId=419024&isRequired=true&studentProgress=10"
          }//https://study.enaea.edu.cn/circleIndexRedirect.do?action=toNewMyClass&type=course&circleId=54359&syllabusId=296838&isRequired=true&studentProgress=0
        }
    },4000)


})();