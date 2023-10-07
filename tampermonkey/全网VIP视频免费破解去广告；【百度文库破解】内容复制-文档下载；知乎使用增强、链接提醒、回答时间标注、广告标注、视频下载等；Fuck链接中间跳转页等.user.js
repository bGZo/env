// ==UserScript==
// @name         全网VIP视频免费破解去广告；【百度文库破解】内容复制|文档下载；知乎使用增强、链接提醒、回答时间标注、广告标注、视频下载等；Fuck链接中间跳转页等
// @namespace    fengdiansanren_video_text_helper
// @version      2.1.5
// @description  【无任何广告和商业行为】常用功能专属: 一、百度文库文档内容自由复制，文档免费下载；二、爱奇艺|腾讯视频|优酷|芒果TV等VIP视频在线看，解析接口贵在稳定够用。支持：Tampermonkey|Violentmonkey|Greasymonkey，版本4.0+以上最佳（每个网站解析按钮位置可自定义，避免遮挡）； 三、知乎使用增强：为知乎视频播放器添加下载功能、为提回和回答添加时间戳、显示提问人、广告标注等；四、Fuck网站中间跳转页，链接直达(当前适配：书签地球、知乎、CSDN等更多适配请留言)；五、YouTube油管播放助手；六、服务器活动集锦 
// @author       人鬼情未了、王超、crud-boy
// @copyright    人鬼情未了, 王超 、crud-boy
// @include      *://wenku.baidu.com/*
// @include      https://*.youku.com/v_*
// @include      https://*.youku.com/alipay_*
// @include      https://*.iqiyi.com/v_*
// @include      https://*.iqiyi.com/w_*
// @include      https://*.iqiyi.com/a_*
// @include      https://*.le.com/ptv/vplay/*
// @include      https://v.qq.com/x/cover/*
// @include      https://v.qq.com/x/page/*
// @include      https://*.tudou.com/listplay/*
// @include      https://*.tudou.com/albumplay/*
// @include      https://*.tudou.com/programs/view/*
// @include      https://*.mgtv.com/b/*
// @include      https://film.sohu.com/album/*
// @include      https://tv.sohu.com/v/*
// @include      https://*.baofeng.com/play/*
// @include      https://vip.pptv.com/show/*
// @include      https://v.pptv.com/show/*
// @include      *://v.vzuu.com/video/*
// @include      *://www.youtube.com/watch?v=*
// @include      *://www.aliyun.com**
// @include      *://cloud.tencent.com** 
// @include      *://www.hostwinds.com**
// @include      *://www.west.cn**
// @include      *://bandwagonhost.com**
// @include      *://www.vultr.com**
// @include      *://*.zhihu.com**
//--------------------------------
// @include      https://show.bookmarkearth.com/view/*
// @include      https://www.jianshu.com/go-wild?ac=2&url=*
// @include      https://link.csdn.net/?target=*

// @connect      www.eggvod.cn
// @require      https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.2.1/jquery.min.js
// @grant        GM_info
// @grant        GM_download
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @license      AGPL License
// ==/UserScript==

(function() {
	'use strict';	

    var window_url = window.location.href;
    var website_host = window.location.host;
	if(window.top != window.self){
    	return;
    }
	
	/****
	视频解析部分代码借鉴自：
		脚本：https://greasyfork.org/zh-CN/scripts/418804
		作者：爱画画的猫
		
		脚本：https://greasyfork.org/zh-CN/scripts/390952
		作者：橘子爱哭
	
		已经分别联系过原作者，并获得了原作者的同意，代码版权归原作者所有
	**/
	const fengdiansanren_object={};
	fengdiansanren_object.isRun=function(){
		var host = window.location.host;
		var videoWebsites = ["iqiyi.com","v.qq.com","youku.com", "le.com","tudou.com","mgtv.com","sohu.com","acfun.cn","baofeng.com","pptv.com"];
		for(var b=0; b<videoWebsites.length; b++){
			if(host.indexOf(videoWebsites[b]) != -1){
				return true;
			}
		}
		return false;
	};
	fengdiansanren_object.getWebsiteName=function(){
		var name="other";
		if(website_host.indexOf("iqiyi.com")!=-1){
			name="iqiyi";
		}else if(website_host.indexOf("qq.com")!=-1){
			name="qq";
		}else if(website_host.indexOf("youku.com")!=-1){
			name="youku";
		}else if(website_host.indexOf("mgtv.com")!=-1){
			name="mgtv";
		}else if(website_host.indexOf("tudou.com")!=-1){
			name="tudou";
		}else if(website_host.indexOf("sohu.com")!=-1){
			name="sohu";
		}
		return name;
	};
	fengdiansanren_object.generateHtmlAndEvent = function(){
		var left=0;
		var top=300;
		//初始化位置信息
		var playerBoxPosition = GM_getValue("playerBoxPosition_"+this.getWebsiteName());
		if(!!playerBoxPosition){
			left=playerBoxPosition.left;
			top=playerBoxPosition.top;
		}
		var css = "#fengdiansanren_objectvideo_player_box{position:fixed; top:"+top+"px; left:"+left+"px; z-index:999; width:25px;background-color:red;};"
			css += "#fengdiansanren_objectvideo_player_box>div{width:100%; height:20px;}";
			css += "#fengdiansanren_objectvideo_player_box>div>img{width:90%;}";
			css += "#fengdiansanren_objectvideo_player_jump{cursor:pointer;text-align:center;padding-top:5px;}";
			css += "#fengdiansanren_objectvideo_player_box_move{cursor:move;margin-top:5px;text-align:center;padding:5px 0px;}";
			
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box_outer{display:none;position:absolute;top:-60px;left:25px;padding:5px;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box{width:300px;height:350px;background-color:rgba(241,241,241,0.8);overflow-y:auto;border-radius:4px;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box::-webkit-scrollbar{width:5px; height:1px;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box::-webkit-scrollbar-thumb{border-radius: 4px;box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#A8A8A8;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box::-webkit-scrollbar-track{border-radius: 4px;box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#F1F1F1;}";
			
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box >span{border-radius:3px;border-top:3px solid red; border-bottom:3px solid red;display:inline-block;width:calc(25% - 6px);width:-moz-calc(25% - 6px);width: -webkit-calc(25% - 6px);height:20px;line-height:20px;background-color:red;color:#FFF;cursor:pointer;margin:3px;text-align:center;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow:ellipsis;font-size:12px!important;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box >span:hover{border-top:3px solid #FFF; border-bottom:3px solid #FFF;}";
			css += "#fengdiansanren_objectvideo_player_box .select_interface_box >span.hover-mark{border-top:3px solid #FFF; border-bottom:3px solid #FFF;}";
		$("head").append("<style>"+css+"</style>")
				
		var moveImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADjUlEQVRoQ+2YTYiVVRjHf38ESQXXVhsHl4IIJRpumsGFWo2jtZnGtrqSMTC36SYQg/ADomiVXxs/SvyghTqroahAW7QbdJNKmyAwR0QfeeC5cubl3vuemXve5A73rO573/Oe8/+d85zn44g+b+pz/QwAXvUODnZg0e6AmU0CXwLPgQ2S/mgCthETMrONwC1gWYh+BGyR9HNpiOIAZjYMnAFer4h9CExIulkSoiiAmb0HnAVWdhD5b0BcKQVRDMDMtgOXgSUh7j9gefx+nJjTM+AjST+UgCgJ4Db/boiaBc4Du+P5tIsGXovnKUluaj23kgATgAu9B3wKrAc+D4WHgTvASeANB5Pk56TnVgzAlZjZakkO4L8PpQCS/HlOn57VQ3O5UCeAEqLTMYruQDrwYgD4BPg+oIYlTZVefR+vsR0Ie98G/C3p9ybEzwsg/PxnwHelPEgVysz2AOPAUUnXcqCzdiAi7I9JkBpqeZucSXL6uAcD7kZfD3Y7JF2t+7YWIHIbj5qt9OCepKG6gRfy3swcwEG8edoxJskDZMfWFSCyyktJYuYRdjwnDTCzncCB2LVJSb/UQZnZGHAuidgPgJ3dvu0IYGbrgGlgRUzsuc1FYKYixNOCOR7GzPYBxyv91kr6s+Jq3eY9MqdtDbAryaN83gOSvm63AN0AngBL61Yt3r+dehoz87zfa4K0/SRpa+sPMxsF/FzltKeS2mopBbBd0vVEXDuAaUmbkz6e+HW174RsVlKrOJoD3A1gP/BFkgZ7SnyhjQnNSDpVMY2DwJHK0u6S5OfpZTOzt4AP2pjQh8m8bkLvdCpJ6w7xJsAnXRWT+CH+uCqkagNm5qv7foj7xys0SSfqbCUOvhdErbTbqzg/xB1L0Rw3OhIQLTd6X9KbdWIW8t7M/koOtbtRF9+1BK0FcCFm5qvpsaBVbf0fgcxjQG3pmQUQEO6j/arknKRvF7LCdd8kqcSxnFjj42UD1E3e7n2chZWSvFZupDUGEB7mt1C9t6ldaxKgbUlZehsGAJXA1L9FfXiQb7pcq9wGvop0udiZKGZCZtb3F1vdrhbTa0avtkZzS8a6Q19sByLY5Vzuei5VWyrWCW+9LwoQEJ2u17268uv13BQ6i6E4QEB4MXOjUs2N5JSVWaqTTo0ABISXpL9GuuI1cduScL6Cq/0bA+hVWO73A4DclWqq32AHmlrZ3HH7fgdeAL7GSUBqsOkSAAAAAElFTkSuQmCC";
		var playerImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABtklEQVRoQ+2YTytFQRjGn+czKBtbK7u79jl8CFtLK3auhYWFJEmS5EY3KQtlIZIotyRJkhQLIUWRbkdT79RZUHf+n1Nz1jPz/n7vM9OZc4iaP6w5P7JA6gRzAjkBxw7kLeTYQOfpxgkURTECYBzAAIB1AFMkH51JLBewEbgBMFiqdycSC5YMTtNsBIp/Km6LyLETkeFknwKqdFdJiMiHIYvVcN8CGqIDoElSnZGgTygBDb0qaVyGsggtoLjfRGI6hEQMAc19ICK7PkViCmjuORF58CGSQkBx34vEvKtEKgHNvSMiR7YiqQUUt3oxNkXk3VSkCgKa+UIk1kwkqiSguSdJTvQqUUWBV5J9dRbokGzUVeAFwCjJVh0FVuQQX/UKr8ZV4QycC/iGCbgem1LgR74d1LX70wY+ZQJt6fqJLXiqBG4FfNEVPIXArMA/+YKPtYX2BXzPJ3iMBJ4FfCYEeGiBZYG/DgkfYgudCfhmaHDfCXyX/gd9xYK3TeAQwHAJcku6fhoT3CWBIQBjAPoBtEkupQC3FkgJ+1dt47tQFvDcgZyA54YaL5cTMG6Z5wk5Ac8NNV7uF+15tDGwBHN+AAAAAElFTkSuQmCC";
		var html = "<div id='fengdiansanren_objectvideo_player_box'>"+
					"<div id='fengdiansanren_objectvideo_player_jump' name='跳转到解析'><img src='"+playerImage+"'></div>"+
					"<div id='fengdiansanren_objectvideo_player_box_move' name='移动按钮'><img src='"+moveImage+"'></div>"+
				"</div>";
		$("body").append(html);
		
		//接口显示		
		$("#fengdiansanren_objectvideo_player_jump").on("click", function(){
			GM_xmlhttpRequest({
				url: "https://www.eggvod.cn/jxcode.php?in=81516699&code=4",
				method: "get",
				onload: function(response) {
					var status = response.status;
					if(status==200||status=='200'){
						var responseText = response.responseText;
						GM_openInTab("https://www.eggvod.cn/jxjx.php?lrspm="+response.responseText+"&zhm_jx="+window.location.href, {active: true});
					}
				}
			});
		});
		
		this.listenerMouse();
	};
	fengdiansanren_object.point={"x":0,"y":0,"l":0,"t":0};
	fengdiansanren_object.isDown=false;
	fengdiansanren_object.$box=null;
	fengdiansanren_object.listenerMouse = function(){
		var that = this;
		
		this.$box = document.getElementById('fengdiansanren_objectvideo_player_box_move');
		this.$box.onmousedown = function(e) {
			//阻止默认事件
			e.preventDefault();
		    e.stopPropagation();
		    //获取x坐标和y坐标
		    that.point.x = e.clientX;
		    that.point.y = e.clientY;
		    //获取左部和顶部的偏移量
		    that.point.l = that.$box.parentNode.offsetLeft;
		    that.point.t = that.$box.parentNode.offsetTop;
		    //开关打开
		    that.isDown = true;
		    //设置样式  
		    that.$box.style.cursor = 'move';
		};
		window.onmousemove = function(e) {
			//阻止默认事件
			e.preventDefault();
			e.stopPropagation();
			if (that.isDown == false) {
				return;
			}
			//获取x和y
			var nx = e.clientX;
			var ny = e.clientY;
			//计算移动后的左偏移量和顶部的偏移量
			var nl = nx - (that.point.x - that.point.l);
			var nt = ny - (that.point.y - that.point.t);
			//更新位置
			that.$box.parentNode.style.left = nl + 'px';
			that.$box.parentNode.style.top = nt + 'px';
			GM_setValue("playerBoxPosition_"+that.getWebsiteName(),{"left":nl, "top":nt})
		}
		fengdiansanren_object.$box.onmouseup = function() {
			//开关关闭
			that.isDown = false;
			that.$box.style.cursor = 'move';
		}
	};
	fengdiansanren_object.removeAD = function(){
		var videoWebsiteADRemove_={};
		videoWebsiteADRemove_.youku=function(){
			
		};
		videoWebsiteADRemove_.iqiyi=function(){
		   
		};
		videoWebsiteADRemove_.qq=function(){

		};
		videoWebsiteADRemove_.start=function(){
			switch (website_host) {
		        case 'v.youku.com':
		            this.youku();
		            break
		        case 'v.qq.com' :
		            this.qq()
		            break
		        case 'www.iqiyi.com' :
		            this.iqiyi()
		            break
		        default :
		            break
		    }
		};
		videoWebsiteADRemove_.start();
	};
	fengdiansanren_object.start=function(){
		if(this.isRun()){
			this.generateHtmlAndEvent();
			this.removeAD();
		}
	};
	fengdiansanren_object.start();
	
	
	/**
	 * 百度文库开始
	 */
	const baiduwenkuHelper_={};
	baiduwenkuHelper_.wenkudownloadUrl = "http://www.tool77.com/tampermonkey/doc/download?docs=10?wenku_url=";
	baiduwenkuHelper_.isRun = function(){
		if(website_host.indexOf("wenku.baidu.com") != -1){
			return true;
		}
		return false;
	};
	baiduwenkuHelper_.removeAD=function(){
		if(website_host.indexOf("wenku.baidu.com") != -1){
		    setInterval(function(){
		    	$(".banner-ad").hide();
		    	$(".union-ad-bottom").hide();
		    	$("iframe").hide();
		    	
		    	//VIP去广告小按钮
		    	$(".ggbtm-vip-close").hide();
		    	$(".ad-vip-close-bottom").hide();
		    	$(".ad-vip-close").hide();
		    	
		    	//搜索页面
		    	$("#fengchaoad").hide();
		    	$(".search-aside-adWrap").hide();
		    },300);
	    }
	};
	baiduwenkuHelper_.generateHtml=function(){
		var $that = this;
		if((window_url.indexOf("wenku.baidu.com/view")==-1 && window_url.indexOf("wenku.baidu.com/link")==-1) 
			|| website_host!="wenku.baidu.com"){
			return;
		}
		var topBox = "<div style='position:fixed;z-index:999999;background-color:#ccc;cursor:pointer;top:150px;left:0px;'>"+
						"<div id='baiduwenku_helper_download_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#25AE84;'>下载</div>"+
				 	 "</div>";
		$("body").append(topBox);
		//解析下载
		$("body").on("click","#baiduwenku_helper_download_btn",function(){
			var wenkuUrl = $that.wenkudownloadUrl+encodeURIComponent(window_url);
			GM_openInTab(wenkuUrl, {active: true });
		});		
	};
	baiduwenkuHelper_.start=function(){
		if(this.isRun()){			
			this.generateHtml();
			this.removeAD();
		}
	};
	baiduwenkuHelper_.start();
	
	var serverNavigation_={};
	serverNavigation_.generateHtml = function(){
		const host = window.location.host
			, randomElementId = "a"+Math.ceil(Math.random()*100000000)+"jjlk";
		var backgroundColor = null;
		var serverPlatform = [
			{"host":"aliyun.com","color":"#ff6a00"},
			{"host":"cloud.tencent.com","color":"#00a4ff"},
			{"host":"huaweicloud.com","color":"#D64A52"},
			{"host":"hostwinds.com","color":"#1ea237"},
			{"host":"west.cn","color":"#ff6000"},
			{"host":"bandwagonhost.com","color":"#C18100"},
			{"host":"www.vultr.com","color":"#007bfc"}
		];
		for(var i=0;i<serverPlatform.length;i++){
			if(host.indexOf(serverPlatform[i].host)!=-1){
				backgroundColor = serverPlatform[i].color;
				break;
			}
		}
		if(backgroundColor==null) return;
		var innnerCss = `
			#`+randomElementId+`{				
				display: block;
				width: 30px;
				border-radius: 24px;
				font-size: 14px;
				color: #fff;
				text-align: center;
				letter-spacing: 4px;
				position:fixed;
				top:150px;
				left:15px;
				height: auto;
				text-decoration: none;
				writing-mode: vertical-rl;
				line-height: 2.2;
				cursor: pointer;
				z-index:9999999999999;
				padding: 10px 0px;
				background-color: `+backgroundColor+`;
			}
		`;
		var innerHTML = "<div target='_blank' id='"+randomElementId+"'>热门服务器厂商活动</div>";
		$("body").prepend("<style>"+innnerCss+"</style>");
		$("body").append(innerHTML);
		$("body").on("click", "#"+randomElementId+"", function(){
			GM_openInTab("https://www.bookmarkearth.com/activity/detail/server", {active:true});
		});
	};
	serverNavigation_.start = function(){
		this.generateHtml();
	};
	serverNavigation_.start();
	
	/**
	 * 知乎使用增强
	 */
	const zhihuObject = {};
	zhihuObject.markArticleOrQuestion = function(){ //首页标识文章or回答
		//此处代码借鉴自 - 知乎增强
		//原作者：X.I.U
		//https://greasyfork.org/zh-CN/scripts/419081-%E7%9F%A5%E4%B9%8E%E5%A2%9E%E5%BC%BA
		var questionsCss = `
			.AnswerItem .ContentItem-title a::before {
			    content: '问题';
			    color: #f68b83;
			    background-color: #f68b8333;
			    font-weight: bold;
			    font-size: 13px;
			    padding: 1px 4px 0px;
			    border-radius: 2px;
			    display: inline-block;
			    vertical-align: top;
			    margin: 4px 4px 4px 0px;
			}
			.ArticleItem .ContentItem-title a::before {
			    content: '文章';
			    color: #0066FF;
			    background-color: #E5EFFF;
			    font-weight: bold;
			    font-size: 13px;
			    padding: 1px 4px 0;
			    border-radius: 2px;
			    display: inline-block;
			    vertical-align: top;
			     margin: 4px 4px 4px 0px;
			}
			.TopstoryItem--advertCard{
				text-decoration:line-through;
			}
		`;
		$("body").prepend("<style>"+questionsCss+"</style>");
	};
	zhihuObject.addDateAnswerForQuestion = function(){ //为问题和回答添加时间
		function DateFormat(time, format) {  //
		    var o = {
		        "M+": time.getMonth() + 1, //月份 
		        "d+": time.getDate(), //日 
		        "h+": time.getHours(), //小时 
		        "m+": time.getMinutes(), //分 
		        "s+": time.getSeconds(), //秒 
		        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
		        "S": time.getMilliseconds() //毫秒 
		    };
		    if(/(y+)/.test(format)){
				format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
		    for(var k in o){
		        if(new RegExp("(" + k + ")").test(format)){
		            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
		    return format;
		}
		function addDateQuestion() {
			var title = document.querySelector(".QuestionPage");
			if(!!title){
				var dateCreated = title.querySelector("[itemprop~=dateCreated][content]").content;
				var dateModified = title.querySelector("[itemprop~=dateModified][content]").content;
				var createDate = DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
				var editDate = DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
				
				var side = title.querySelector(".QuestionHeader-side");
				var timeDiv = document.createElement('div');
				timeDiv.innerHTML = `<p>创建于:&nbsp;${createDate}</p><p>编辑于:&nbsp;${editDate}</p>`;
				timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;';
				side.appendChild(timeDiv);
			}
		}
		function addTimeAnswerItems() {
			var list = document.querySelectorAll(".AnswerItem");
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				if (item.getAttribute('zh_date_mk') === 'true') {
					continue;
				}
				item.setAttribute('zh_date_mk', 'true');
				try{					
					var dateCreated = item.querySelector("[itemprop~=dateCreated][content]").content;
					var dateModified = item.querySelector("[itemprop~=dateModified][content]").content;
					var createDate = DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
					var editDate = DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
		
					var sideItem = item.querySelector(".ContentItem-meta");
					var timeDiv = document.createElement('div');
					timeDiv.innerHTML = `创建于:&nbsp;${createDate}&nbsp;&nbsp;&nbsp;编辑于:&nbsp;${editDate}`;
					timeDiv.class = "Voters";
					timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;display:block;padding:5px 0px;';
					sideItem.appendChild(timeDiv);
				}catch(e){}
			}
		}
		addDateQuestion();
		setInterval(function(){ //循环检查回答和修改时间
			addTimeAnswerItems();
		},400);
	};
	zhihuObject.changePicQuality = function(){ //图片自动高清
		setInterval(function(){
			$("body").find("img").each(function(){
				var dataoriginal = $(this).attr("data-original");
				if(!!dataoriginal){
					$(this).attr("src", dataoriginal);
				}
			});
		}, 500);
	};
	zhihuObject.showQuestionAuthor = function(){
		//此处代码借鉴自 - 知乎增强
		//原作者：X.I.U
		//https://greasyfork.org/zh-CN/scripts/419081-%E7%9F%A5%E4%B9%8E%E5%A2%9E%E5%BC%BA
		if (document.querySelector('.BrandQuestionSymbol, .QuestionAuthor')) return
		let qJson = JSON.parse(document.querySelector('#js-initialData').textContent).initialState.entities.questions[/\d+/.exec(location.pathname)[0]].author,
			html = `<div class="BrandQuestionSymbol"><a class="BrandQuestionSymbol-brandLink" href="/people/${qJson.urlToken}"><img role="presentation" src="${qJson.avatarUrl}" class="BrandQuestionSymbol-logo" alt=""><span class="BrandQuestionSymbol-name">${qJson.name}</span></a><div class="BrandQuestionSymbol-divider" style="margin-left: 5px;margin-right: 10px;"></div></div>`;
		document.querySelector('.QuestionHeader-topics').insertAdjacentHTML('beforebegin', html);
	};
	zhihuObject.start = function(){
		if(window.location.host.indexOf("zhihu.com")!=-1){
		    if(window_url.indexOf("https://www.zhihu.com/question/") != -1){
				this.addDateAnswerForQuestion();
				this.showQuestionAuthor();
		    }
			this.markArticleOrQuestion();
		}
	};
	zhihuObject.start ();
	
	/**
	 * 去除跳转中间页
	 */
	const fuckLink = {};
	fuckLink.start = function(){
		const rules = [
			{"match":"link\.zhihu\.com\/\?target=", "element":"p.link"},
			{"match":"show\.bookmarkearth\.com\/view\/", "element":"p.link"},
			{"match":"www\.jianshu\.com\/go-wild\?", "element":"p.link"},
			{"match":"link\.csdn\.net\/\?target=", "element":"a.loading-color2"}
		]
		const url = window.location.href;
		let loopOK = true, ruleSize = rules.length;
		const loopInterval = setInterval(()=>{
			if(loopOK){
				for(var i=0;i<rules.length; i++){
					loopOK = ruleSize-1 == i
					if(url.search("^(http|https):\/\/"+rules[i].match)){
						let $element =  document.querySelector(rules[i].element);
						if(!!$element){
							clearInterval(loopInterval);
							window.location.href = $element.innerText;
						}
					}
				}
			}
		},50);
	};
	fuckLink.start();
})();