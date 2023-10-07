// ==UserScript==
// @name         知乎网页助手
// @namespace    zhihu_helper_tool
// @version      2.0.2
// @description  功能介绍：1、知乎站外链接直接跳转至目标网址；2、自动展开问题全部信息，同时展示所有回答；3、去除知乎网页中的广告；4、知乎网页中短视频下载；5、解除知乎复制限制-划词复制（鼠标左键划词自动添加到剪切板）；6、去除烦人的登录提示；7、自动高清图片显示【注：支持Tampermonke4.0以上版本】【这可能是功能最全面的知乎助手了】
// @icon		 data:image/ico;base64,AAABAAIAEBAAAAEAIAAoBQAAJgAAACAgAAABACAAKBQAAE4FAAAoAAAAEAAAACAAAAABACAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAA6IYLxOuIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/6IYLxOuIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO//jWuP/xq2b/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64kQ/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7///////bJn//riA7/64gO//GrZv/riA7/64kQ///////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO//CoX//+/fz/64gO/++gUP//////64oX///////riA7/////////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7///////bQrf//////8rFx/+uKF///////64kT/+uIDv/riA7//////+uIDv/riA7/64gO/+uIDv/riA7/64gO//K3fv//////8rV7/+uIDv/rihf//////+uJE//riA7/64gO///////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7//////+uIDv/riA7/64oX///////riRD/64gO/+uJEP//////64gO/+uIDv/riA7/64gO//vo2P///////////////////////////+uKF///////64kQ/+uIDv/riRD//////+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv//////64gO/+uIDv/rihf//////+uIDv/riA7/64kT///////riA7/64gO/+uIDv/riA7/7ZU1/+uMHf/riRP//////+uJE//riA7/64oX///////riA7/64gO/+uKFf//////64gO/+uIDv/riA7/64gO//3z6//xrWv/64sY///////riA7/64gO/+uKF///////64oV/+uKFf/rjBv//////+uIDv/riA7/64gO/+uIDv/0wZD//v39//7+/v/+/v7//v7+///////rihf////////////////////////////riA7/64gO/+uIDv/riA7/7ZU1///////wp17/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/voVH/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/6IYLxOuIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/6IYLxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAIAAAAEAAAAABACAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAA5oQGSemGC+PriA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/6YYL4+aEBknphgvj64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/6YYL4+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/9cec//76+P/76tv/87yH/+uJEP/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/++dRv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/9suk////////////9tCu/+uIDv/riA7/64gO/+uIDv/riA7/64gO/++iU//riA7/64gO/+uIDv/riA7/+uLM//rizP/tlTT/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/99W2////////////8a1r/+uIDv/riA7/64gO/+uIDv/zvIf/+d7G/+uIDv/riA7/64gO/+uLGv/++/n///////328f/xsG7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/rjB3/++ze///////87uL/64kQ/+uIDv/riA7/8Kdd//79/P/64Mn/64gO/+uMH//////////////////76dn/////////////////////////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/vpFj//v7+///////xsG7/64gO/+6XO//99vD///////TClP/riA7/64wf/////////////////+2WOf/wqF///O/j///////////////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/42sD///////ncwv/sjSH/++rb///////64Mr/64kT/+uIDv/rjB/////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv///////////+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/++kVf///////vr4//nbwP//////++zf/+yPJf/riA7/64gO/+uMH////////////+uIDv/riA7/64gO/+uIDv/riA7/64gO////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO//zu4v//////+uDJ//3z6//ulzv/64gO/+uIDv/riA7/64wf////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/9s2o///////2yJ7/7I0h/+uIDv/riA7/64gO/+uIDv/rjB/////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv///////////+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/ysXP///////rgyf/riA7/64gO/+uIDv/riA7/64gO/+uMH////////////+uIDv/riA7/64gO/+uIDv/riA7/64gO////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/++gUP///////PDl/+uIDv/riA7/64gO/+uIDv/riA7/64wf////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO//K3ff////////////////////////////////////////////////////////////328P/rjB/////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv///////////+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/7I4k//zx5///////////////////////////////////////////////////////+dzB/+uMH////////////+uIDv/riA7/64gO/+uIDv/riA7/64gO////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/++vj//////+yNIf/riA7/64gO/+uIDv/riA7/64wf////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO//338v//////7ZQy/+uIDv/riA7/64gO/+uIDv/rjB/////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv///////////+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/751I/+2TL//riA7/64gO/+uIDv/riA7//fXt///////umD7/64gO/+uIDv/riA7/64gO/+uMH////////////+uIDv/riA7/64gO/+uIDv/riA7/64gO////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/xrm3//v38//XEl//riA7/64gO/+uIDv/98un//////++dRv/riA7/64gO/+uIDv/riA7/64wf////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uJEP/87+P///////GrZv/riA7/64gO//zv5P//////755L/+uIDv/riA7/64gO/+uIDv/rjB/////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv///////////+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO//TAj///////+Ne5/+uKFf/rihX//O7h///////volP/64oV/+uKFf/rihX/64gO/+uMH////////////+uIDv/riA7/64gO/+uIDv/riA7/64gO////////////64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/7ZQy//79/f/////////////////////////////////////////////////yt37/64wf///////////////////////////////////////////////////////riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/+uHL/////////////////////////////////////////////v38/++fTP/rjB///////////////////////////////////////////////////////+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/zuYP///////bOqv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+yPJ//99/L//fPr/+uJE//riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/++kVf/65tb/8Kpk/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/6YYL4+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+mGC+PmhAZJ6YYL4+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/riA7/64gO/+uIDv/phgvj5oQGSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
// @match        https://*.zhihu.com/*
// @match        https://v.vzuu.com/video/*
// @match        https://video.zhihu.com/video/*
// @connect      zhihu.com
// @connect      vzuu.com
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @run-at       document-end
// @grant        GM_openInTab
// @grant        GM_setClipboard
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @charset		 UTF-8
// @license      AGPL License
// ==/UserScript==
 
(function() {
    'use strict';
    if(window.top != window.self){
		return;
	}
	var window_url = window.location.href;
    var website_host = window.location.host;
	
	/**
	 * 知乎助手代码借鉴自：匆匆过客
	 * 原脚本地址：https://greasyfork.org/zh-CN/scripts/398195
	 * 本脚本已经获得原脚本授权，本脚本只是优化了该功能代码的逻辑结构，其它维持不变
	 */
   	var zhihuHelper={};
   	zhihuHelper.start = function(){
   	    if(website_host == "link.zhihu.com"){  //直接跳转到目标网页
   	    	var regRet = location.search.match(/target=(.+?)(&|$)/);
   	    	if(regRet && regRet.length==3){
   	    		location.href = decodeURIComponent(regRet[1]);
   	    	}
   		}
   	    //知乎正文
   	    else if(website_host.indexOf("zhihu.com")!=-1){
   	    	//问题全部展开
   		    function autoExpandQuestionInfo() {
   		        //展开问题描述
   		        const s4 = document.querySelector('.QuestionRichText-more');
   		        if (s4) {
   		            s4.click();
   		        }
   		        const s0 = document.querySelector('.SignContainer-content');
   			    if (s0) {
   			        const s1 = document.querySelector('.Modal-backdrop');
   			        if (s1) {
   			            s1.click();
   			        }
   			        const s2 = document.querySelector('.Modal-closeButton');
   			        if (s2) {
   			            s2.click();
   			        }
   		        }
   		    }
   		    
   		    //去除广告，可能造成误伤，用最小策略
   		    function clearAdvert() {
   		    	const ad1 = document.querySelector('.AppBanner');
   		        if (ad1) {
   		            ad1.style.display = "none";
   		        }
   		        const ad2 = document.querySelector('.AdblockBanner');
   		        if (ad2) {
   		            ad2.style.display = "none";
   		        }
   		    }
   	        
   	        //去除登录提示
   	        function noLoginBox(){
   				var IntervalUnit = 20;
   				var totalIntervalMs = 0;
   				var loginInterval = setInterval(function(){
   					$(".Modal-wrapper").hide();
   					$(".signFlowModal").children(".Modal-closeButton").click();
   					totalIntervalMs += IntervalUnit;
   					if(totalIntervalMs >= 2000){  //循环多次，我就不信还显示
   						clearInterval(loginInterval);
   					}
   				}, IntervalUnit); 
   				$(".AppHeader-login").click(function(){
   					clearInterval(loginInterval);
   					$(".Modal-wrapper").show();
   				});
   	        }
   		    
   		    //更改为直接高清显示
   		    function changeHeightQualityPic(){
   		    	$("body").find("img").each(function(){
   		    		var dataoriginal = $(this).attr("data-original");
   		    		if(!!dataoriginal){
   		    			$(this).attr("src", dataoriginal);
   		    		}
   		    	});
   		    }
   		    
   		    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
   		    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
   		    function timeFormat(time, fmt) { //author: meizz 
   		        var o = {
   		            "M+": time.getMonth() + 1, //月份 
   		            "d+": time.getDate(), //日 
   		            "h+": time.getHours(), //小时 
   		            "m+": time.getMinutes(), //分 
   		            "s+": time.getSeconds(), //秒 
   		            "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
   		            "S": time.getMilliseconds() //毫秒 
   		        };
   		        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
   		        for (var k in o)
   		            if (new RegExp("(" + k + ")").test(fmt))
   		                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
   		        return fmt;
   		    }
   		    
   		    function questiodate() {
   		        function QuestionPage() {
   		            const title = document.querySelector(".QuestionPage");
   		            if (title) {
   		                const dateCreated = title.querySelector("[itemprop~=dateCreated][content]").content;
   		                const dateModified = title.querySelector("[itemprop~=dateModified][content]").content;
   		
   		                const ctime = timeFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
   		                const mtime = timeFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
   		                const side = title.querySelector(".QuestionHeader-side");
   		                var timediv = document.createElement('div');
   		                timediv.innerHTML = `<p>创建于:&nbsp;${ctime}</p><p>编辑于:&nbsp;${mtime}</p>`;
   		                timediv.style.cssText = 'color:#999;font-size:12;';
   		                side.appendChild(timediv);
   		            }
   		        }
   		
   		        let listnum = 0;
   		        function ContentItem() {
   		            const list = document.querySelectorAll(".ContentItem");
   		            if (listnum != list.length) {
   		                listnum = list.length;
   		                for (var i = 0; i < list.length; i++) {
   		                    const item = list[i];
   		                    if (item.getAttribute('zh_date_mk') != 'true') {
   		                        const dateCreated = item.querySelector("[itemprop~=dateCreated][content]").content;
   		                        const dateModified = item.querySelector("[itemprop~=dateModified][content]").content;
   		
   		                        const ctime = timeFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
   		                        const mtime = timeFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
   		
   		                        const sideitem = item.querySelector(".css-h5al4j");
   		                        var timediv = document.createElement('span');
   		                        timediv.innerHTML = `<p>创建于:&nbsp;${ctime}&nbsp;&nbsp;&nbsp;编辑于:&nbsp;${mtime}</p>`;
   		                        timediv.class = "Voters";
   		                        timediv.style.cssText = 'color:#999;display:block;padding:5px 0px;';
   		                        sideitem.appendChild(timediv);
   		                        item.setAttribute('zh_date_mk', 'true');
   		                    }
   		                }
   		            }
   		        }
   		        QuestionPage();
   		        document.querySelector(".Question-main").addEventListener('DOMNodeInserted', ContentItem);
   		    }
   		     
   		    if(window_url.indexOf("https://www.zhihu.com/question/") != -1) {
   		        autoExpandQuestionInfo();     //问题全部展开
   	    		questiodate();     //问题日期
   		    }
   		   
   		    noLoginBox();   //去除登录框
   		    setInterval(clearAdvert, 1000);  //去除广告
   		   	setInterval(changeHeightQualityPic, 500);   //图片自动高清
   		}
   	};
   	zhihuHelper.start();
})();
/**
 * 避免重复造轮子
 * 集成插件：下载知乎视频
 * greasyfork地址：https://greasyfork.org/zh-CN/scripts/39206
 * 版本：V1.20
 * */
(async () => {
  if (window.location.host == 'www.zhihu.com') return;
 
  const playlistBaseUrl = 'https://lens.zhihu.com/api/v4/videos/';
  // const videoBaseUrl = 'https://video.zhihu.com/video/';
  const videoId = window.location.pathname.split('/').pop(); // 视频id
  const menuStyle = 'transform:none !important; left:auto !important; right:-0.5em !important;';
  const playerId = 'player';
  const coverSelector = '#' + playerId + ' > div:first-child > div:first-child > div:nth-of-type(2)';
  const controlBarSelector = '#' + playerId + ' > div:first-child > div:first-child > div:last-child > div:last-child > div:first-child';
  const svgDownload = '<path d="M9.5,4 H14.5 V10 H17.8 L12,15.8 L6.2,10 H9.5 Z M6.2,18 H17.8 V20 H6.2 Z"></path>';
  const player = document.getElementById(playerId);
  // const resolutions = {'普清': 'ld', '标清': 'sd', '高清': 'hd', '超清': 'fhd'};
  const resolutions = [
    {ename: 'ld', cname: '普清'},
    {ename: 'sd', cname: '标清'},
    {ename: 'hd', cname: '高清'},
    {ename: 'fhd', cname: '超清'}
  ];
  let videos = []; // 存储各分辨率的视频信息
 
  function fetchRetry (url, options = {}, times = 1, delay = 1000, checkStatus = true) {
    return new Promise((resolve, reject) => {
      // fetch 成功处理函数
      function success (res) {
        if (checkStatus && !res.ok) {
          failure(res);
        }
        else {
          resolve(res);
        }
      }
 
      // 单次失败处理函数
      function failure (error) {
        if (--times) {
          setTimeout(fetchUrl, delay);
        }
        else {
          reject(error);
        }
      }
 
      // 总体失败处理函数
      function finalHandler (error) {
        throw error;
      }
 
      function fetchUrl () {
        return fetch(url, options)
          .then(success)
          .catch(failure)
          .catch(finalHandler);
      }
 
      fetchUrl();
    });
  }
 
  // 下载指定url的资源
  async function downloadUrl (url, name = (new Date()).valueOf() + '.mp4') {
    // Greasemonkey 需要把 url 转为 blobUrl
    if (GM_info.scriptHandler === 'Greasemonkey') {
      const res = await fetchRetry(url);
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
    }
 
    // Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制
    if (window.GM_download) {
      GM_download({url, name});
    }
    else {
      // firefox 需要禁用 CSP, about:config -> security.csp.enable => false
      let a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.style.display = 'none';
      // a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
 
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  }
 
  // 格式化文件大小
  function humanSize (size) {
    let n = Math.log(size) / Math.log(1024) | 0;
    return (size / Math.pow(1024, n)).toFixed(0) + ' ' + (n ? 'KMGTPEZY'[--n] + 'B' : 'Bytes');
  }
 
  if (!player) return;
 
  // 获取视频信息
  const res = await fetchRetry(playlistBaseUrl + videoId, {
    headers: {
      'referer': 'refererBaseUrl + videoId',
      'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20' // in zplayer.min.js of zhihu
    }
  }, 3);
  const videoInfo = await res.json();
 
  // 获取不同分辨率视频的信息
  for (const [key, video] of Object.entries(videoInfo.playlist)) {
    video.name = key.toLowerCase();
    video.cname = resolutions.find(v => v.ename === video.name)?.cname
    if (!videos.find(v => v.size === video.size)) {
      videos.push(video);
    }
  }
 
  // 按格式大小排序
  videos = videos.sort(function (v1, v2) {
    const v1Index = resolutions.findIndex(v => v.ename === v1.name);
    const v2Index = resolutions.findIndex(v => v.ename === v2.name);
 
    return v1Index === v2Index ? 0 : (v1Index > v2Index ? 1 : -1);
    // return v1.size === v2.size ? 0 : (v1.size > v2.size ? 1 : -1);
  }).reverse();
 
  document.addEventListener('DOMNodeInserted', (evt) => {
    const domControlBar = evt.relatedNode.querySelector(':scope > div:last-child > div:first-child');
    if (!domControlBar || domControlBar.querySelector('.download')) return;
 
    const domFullScreenBtn = domControlBar.querySelector(':scope > div:nth-last-of-type(1)');
    const domResolutionBtn = Array.from(domControlBar.querySelectorAll(':scope > div')).filter(el => el.innerText.substr(1, 1) === '清')[0];
    let domDownloadBtn, defaultResolution, buttons;
    if (!domFullScreenBtn || !domFullScreenBtn.querySelector('button')) return;
 
    // 克隆分辨率菜单或全屏按钮为下载按钮
    domDownloadBtn = (domResolutionBtn && (domResolutionBtn.className === domFullScreenBtn.className))
      ? domResolutionBtn.cloneNode(true)
      : domFullScreenBtn.cloneNode(true);
 
    defaultResolution = domDownloadBtn.querySelector('button').innerText;
 
    // 生成下载按钮图标
    domDownloadBtn.querySelector('button:first-child').outerHTML = domFullScreenBtn.cloneNode(true).querySelector('button').outerHTML;
    domDownloadBtn.querySelector('svg').innerHTML = svgDownload;
    domDownloadBtn.className = domDownloadBtn.className + ' download';
 
    buttons = domDownloadBtn.querySelectorAll('button');
 
    // button 元素添加对应的下载地址属性
    buttons.forEach(dom => {
      const video = videos.find(v => v.cname === dom.innerText) || videos[videos.length - 1];
 
      dom.dataset.video = video.play_url;
      if (dom.innerText) {
        (dom.innerText = `${dom.innerText} (${humanSize(video.size)})`);
      }
      else if (buttons.length == 1) {
        dom.nextSibling.querySelector('div').innerText = humanSize(video.size);
      }
    });
 
    // 鼠标事件 - 显示菜单
    domDownloadBtn.addEventListener('pointerenter', () => {
      const domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
      if (domMenu) {
        domMenu.style.cssText = menuStyle + 'opacity:1 !important; visibility:visible !important';
      }
    });
 
    // 鼠标事件 - 隐藏菜单
    domDownloadBtn.addEventListener('pointerleave', () => {
      const domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
      if (domMenu) {
        domMenu.style.cssText = menuStyle;
      }
    });
 
    // 鼠标事件 - 选择菜单项
    domDownloadBtn.addEventListener('pointerup', event => {
      let e = event.srcElement || event.target;
 
      while (e.tagName !== 'BUTTON') {
        e = e.parentNode;
      }
 
      downloadUrl(e.dataset.video);
    });
 
    // 显示下载按钮
    domControlBar.appendChild(domDownloadBtn);
  });
})();