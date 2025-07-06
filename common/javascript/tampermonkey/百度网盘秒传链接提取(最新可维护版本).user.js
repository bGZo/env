// ==UserScript==
// @name            百度网盘秒传链接提取(最新可维护版本)
// @namespace       taobao.idey.cn/index
// @version         2.4.1
// @description     用于提取和生成百度网盘秒传链接
// @author          免费王子
// @license           AGPL
// @match           *://pan.baidu.com/disk/main*
// @match           *://yun.baidu.com/disk/main*
// @match           *://pan.baidu.com/disk/home*
// @match           *://yun.baidu.com/disk/home*
// @connect     idey.cn
// @connect     baidu.com
// @connect      baidupcs.com
// @require      https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @require https://cdn.bootcdn.net/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js
// @require         https://cdn.staticfile.org/spark-md5/3.0.0/spark-md5.min.js
// @require https://greasyfork.org/scripts/468166-base64%E5%BA%93/code/Base64%E5%BA%93.js?version=1201651
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_setClipboard
// @grant           GM_xmlhttpRequest
// @grant           GM_info
// @grant           GM_getResourceText
// @grant           GM_addStyle
// @run-at          document-start
// @connect         *
// @antifeature referral-link 此提示为GreasyFork代码规范要求含有查券功能的脚本必须添加,脚本描述也有说明,请知悉。
// ==/UserScript==
! function() {
	'use strict';
	var index_num = 0;
	var $ = $ || window.$;
	var item = [];
	var urls = [];
	var selectorList = [];
	var obj = {};
	var failed = 0;
	var bdstoken;
	var checkFileList;
	var fileList=[];
	var dirList=[];
	var hosturl = 'https://wk.idey.cn/red.html?url=';
	var inputSavePathHTML =
		'<input id="inputSavePathId" class="swal2-input" placeholder="保存路径, 示例:/BDLIST, 默认保存在BDLIST目录" style="display: flex;margin-top: 10px;font-size:0.95em">';
	var inputSavePath = "";
	var linkList = [];
	var errList='';
	var defaultPath='/BDLIST';
	var requestData = {};
	var reqstr = '/api/create';
	var reqfile='/rest/2.0/xpan/multimedia?method=listall&order=name&limit=10000&path=';
	var reqold = "https://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=download";
    var reqmetas='/api/filemetas?dlink=1&fsids=';
	var updateApi='https://jh.idey.cn/update.php';
	var upresponse='';
	var btnRespConf = {
		id: "btn-resp",
		text: "秒传",
		html: function(type) {
			if (type == "main") {
				return `<button><span>${this.text}</span></button>`
			}else if(type=="home"){
				return `<button><span>${this.text}</span></button>`
			}
		}
	}
	var btnCreateConf = {
		id: "btn-create",
		text: "生成秒传",
		html: function(type) {
			if (type == "main") {
				return `<button><span>${this.text}</span></button>`
			}else if(type=="home"){
				return `<button><span>${this.text}</span></button>`
			}
		}
	}

	var tool = {
		sleep: (time) => {return new Promise((resolve) => setTimeout(resolve, time));},get: async (url, headers, type, extra) => {
			return new Promise((resolve, reject) => {
				let req = GM_xmlhttpRequest({
					method: "GET",
					url,
					headers,
					responseType: type || 'json',
					onload: (res) => {
						if (res.status === 204) {
							req.abort();
						}
						if(type==='arraybuffer'){
							resolve(res);
						} else {
							resolve(res.response || res.responseText);
						}
					},
					onerror: (err) => {
						reject(err);
					}
				});
			})
		},post: async (url, data, headers) => {
			return new Promise((resolve, reject) => {
                 let query = "";
                 for (var key in data)
                     query += "&" + key + "=" + encodeURIComponent(data[key]);
				data = query;
				let req = GM_xmlhttpRequest({
					method: "POST",
					url,
					headers: headers,
					responseType: 'json',
					data: data,
					onload: (res) => {
						resolve(res.response || res.responseText);
					},
					onerror: (err) => {
						reject(err);
					}
				});
			})
		},request:(obj)=>{
			var method=obj.method || 'GET',headers=obj.headers|| {},data=obj.data || {}, url=obj.url || '';
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if((xhr.status>=200 && xhr.readyState<300) || xhr.status==304){
						obj.callback && obj.callback(xhr.responseText)
					}
				}
			}
			if((obj.method).toUpperCase()=='GET'){
				for(var key in data){
					url+=(url.indexOf("?")==-1 ? '?' :'&');
					url+=encodeURIComponent(key)+ "=" +encodeURIComponent(data['key']);
				}
			}
			xhr.open(method,url,true);
			if((obj.method).toUpperCase()=='GET'){
				xhr.send(null);
			}else{
				xhr.send(JSON.stringify(data));
			}
		},charRecoveStr:(str)=>{
			  var newStr = "";
			    for (var i = 0; i < str.length; i++) {
			        var reverseChar = void 0;
			        if (str.charAt(i) >= "a")
			            reverseChar = str.charAt(i).toUpperCase();
			        else if (str.charAt(i) >= "A")
			            reverseChar = str.charAt(i).toLowerCase();
			        else
			            reverseChar = str.charAt(i);
			        newStr += reverseChar;
			    }
			    return newStr;

		},queryUrlPath:()=>{
			let path=location.href.match(/path=(.+?)(?:&|$)/);
			if (path)
                 return decodeURIComponent(path[1]);
            else
                return "";
		},changePath:(p)=>{
			let fix = p.substring(p.lastIndexOf(".") + 1); // 获取后缀
			return p.substring(0, p.length - fix.length) + tool.charRecoveStr(fix);
		},loadAlert:async()=>{
			let url='https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.all.min.js';
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			head.appendChild(script);
		},timeStamp:()=>{
			 let time = new Date().getTime();
			 return time;
		},parse: (link) => {
            try {
                let arrays = link.split('\n').map(function(list) {
                    return list.trim().match(/([\dA-Fa-f]{32})#([\dA-Fa-f]{32})#([\d]{1,20})#([\s\S]+)/);
                }).map(function(info) {
                    return {md5: info[1],md5s:info[2],size: info[3],path: info[4]};
                });
                return arrays;
            }
            catch (e) {	return false;}
		},parse1:(link)=>{
              try {
                let arrays = link.split('\n').map(function(list) {
                    return list.trim().match(/([\dA-Fa-f]{32})#([\d]{1,20})#([\s\S]+)/);
                }).map(function(info) {
                    return {md5: info[1],size: info[2],path: info[3]};
                });
                  return arrays;
            }
            catch (e) {	return false;}

        },baiduClass:()=>{
			if (
				location.href.indexOf("//pan.baidu.com/disk/main") > 0 || location.href.indexOf("//yun.baidu.com/disk/main")>0
			) {
				return 'main';
			} else if (
				location.href.indexOf("//pan.baidu.com/s/") > 0
			) {
				return 'share';
			} else if (
				location.href.indexOf("//pan.baidu.com/disk/synchronization") > 0
			) {
				return 'synch';
			}else if (
				location.href.indexOf("//pan.baidu.com/disk/home") > 0 || location.href.indexOf("//yun.baidu.com/disk/home")>0
			) {
				return 'home';
			}
		},inputUserValue:(row = '')=>{
			Swal.fire({
				input: 'textarea',
				title: '请输入秒传',
				inputValue: row,
                allowOutsideClick: false,
				showCancelButton: true,
				inputPlaceholder: '格式：MD5#MD5s#大小#文件名\nMD5#大小#文件名格式 无法转存',
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				onBeforeOpen: function onBeforeOpen() {
					let d = document.createElement('div');
					d.innerHTML += inputSavePathHTML;
					Swal.getContent().appendChild(d);
					let p=tool.queryUrlPath();
					if(p) document.getElementById('inputSavePathId').value=p;

				},
				inputValidator: function inputValidator(inputRow) {
					if (!inputRow) {
						return '不能为空';
					}
					linkList = tool.parse(inputRow);

                    if (!linkList.length) {
						linkList = tool.parse1(inputRow);
						if(linkList.length){
							return '抱歉，MD5#大小#文件名格式由于百度接口问题无法转存!其它所有脚本都是无法转存的!!!';
						}
					}


					if (!linkList.length) {
						return '抱歉，链接无法识别哦';
					}


					inputSavePath = document.getElementById('inputSavePathId').value;
					if(!inputSavePath) inputSavePath=defaultPath;


				}
			}).then(function(res) {
				if (!res.dismiss) {
						Swal.fire({
						title: "文件转存中",
						html: "正在转存文件<index>0</index>",
						allowOutsideClick: false,
                        showCloseButton: false,
                            showConfirmButton:false,
						onBeforeOpen: function() {
							Swal.showLoading();
							savePathList(0, 0);
						}
					});
				}
			});
		},cookie:(n)=>{
			  let arrays = unsafeWindow.document.cookie.replace(/\s/g, "").split(";");
				for (var i = 0, l = arrays.length; i < l; i++) {
					var t = arrays[i].split("=");
					if (t[0] === n) {
						return decodeURIComponent(t[1]);
					}
				}
				return "";
		},getCheckFile:(type)=>{
			if(type=="home"){
				return require('system-core:context/context.js').instanceForSystem.list.getSelected();
			}else{
				return document.querySelector(".nd-main-list, .nd-new-main-list").__vue__
				    .selectedList;
			}

		},reqAjax:(f,n,num)=>{
			if(num>=4){
				f.errno=2;
                tool.signMd5(n+1,0);
				return;
			}
			tool.getOtherMd5Step1(f,n,0);
			// $.ajax({
			// 	url: `${reqstr}&bdstoken=${bdstoken}`,
			// 	type: 'POST',
			// 	dataType:'json',
			// 	data: {
			// 		block_list: JSON.stringify([f.md5.toLowerCase()]),
			// 		path: f.path,
			// 		size: f.size,
			// 		isdir: 0,
			// 		rtype: 3,
			// 		is_revision: 1
			// 	},
			// 	success:function(res){
			// 		console.log('res',res);
			// 		if(res.errno===2){
			// 			tool.reqAjax(f,n,++num)
			// 		}else if(res.errno===0){
			// 			tool.signMd5(n+1,0);
			// 		}else if(res.errno===31190){
			// 			tool.getOtherMd5Step1(f,n,0);
			// 		}else{

   //                      tool.getOtherMd5Step1(f,n,0);
			// 		}
			// 	},
			// 	error:function(code){
			// 		f.errno=code;
			// 		tool.signMd5(n+1);
			// 	}

			// })
		},getOtherMd5Step1:(f,n,flag)=>{
            let fsid=JSON.stringify([String(f.fs_id)]);
			tool.get(`${reqmetas}${fsid}`,{"User-Agent":"netdisk;"},'json').then((res)=>{
				tool.getOtherMd5Step2(f,n,flag,res.info[0].dlink);
			}).catch((err)=>{
				f.errno=err;
				tool.signMd5(n+1,0);
			})

        },getOtherMd5Step2:(f,n,flag,downfile)=>{
            let bufferSize=f.size< 262144 ? 1 : 262143;
			tool.get(downfile,{Range:"bytes=0-"+bufferSize,"User-Agent":"netdisk;"},'arraybuffer').then((res)=>{
				if(res.finalUrl.includes("issuecdn.baidupcs.com")){
					f.errno=1919;tool.signMd5(n+1,0);
					return;
				}
				let newMd5=res.responseHeaders.match(/content-md5: ([\da-f]{32})/i);
				if(newMd5){ f.md5=newMd5[1].toLowerCase();
                           if(bufferSize==1){
                               f.md5s=f.md5;
                           }else{
                                let sparkmd5=new SparkMD5.ArrayBuffer();
                               sparkmd5.append(res.response);
                               f.md5s=sparkmd5.end();

                           }
                            tool.signMd5(n+1,0);

                }
				else{
					tool.getOtherMd5Step3(f,n,flag,`${reqold}&path=${encodeURIComponent(f.path)}`);
				}
			}).catch((err)=>{
				f.errno=err;
				tool.signMd5(n+1,0);
			})
        },getOtherMd5Step3:(f,n,flag,downfile)=>{
            let bufferSize=f.size< 262144 ? 1 : 262143;
			tool.get(downfile,{Range:"bytes=0-"+bufferSize,"User-Agent":"netdisk;"},'arraybuffer').then((res)=>{
				if(res.finalUrl.includes("issuecdn.baidupcs.com")){
					f.errno=1919;tool.signMd5(n+1,0);
					return;
				}
				let newMd5=res.responseHeaders.match(/content-md5: ([\da-f]{32})/i);
				if(newMd5){ f.md5=newMd5[1].toLowerCase();
                           if(bufferSize==1){
                               f.md5s=f.md5;
                           }else{
                                let sparkmd5=new SparkMD5.ArrayBuffer();
                               sparkmd5.append(res.response);
                               f.md5s=sparkmd5.end();

                           }
                            tool.signMd5(n+1,0);

                }
				else{
					f.errno=996;tool.signMd5(n+1,0);
				}
			}).catch((err)=>{
				f.errno=err;
				tool.signMd5(n+1,0);
			})
        },randMd5:(str)=>{
            let t = [];
            for (let _i = 0, chars = str; _i < chars.length; _i++) {
                var i = chars[_i];
                if (!Math.round(Math.random())) {
                    t.push(i.toLowerCase());
                }
                else {
                    t.push(i.toUpperCase());
                }
            }
            return t.join("");
        },encodeMd5:(md5)=>{
			if (!((parseInt(md5[9]) >= 0 && parseInt(md5[9]) <= 9) ||
			        (md5[9] >= "a" && md5[9] <= "f")))
			        return decrypt(md5);
			    else
			        return md5;
			    function decrypt(encryptMd5) {
			        var key = (encryptMd5[9].charCodeAt(0) - "g".charCodeAt(0)).toString(16);
			        var key2 = encryptMd5.slice(0, 9) + key + encryptMd5.slice(10);
			        var key3 = "";
			        for (var a = 0; a < key2.length; a++)
			            key3 += (parseInt(key2[a], 16) ^ (15 & a)).toString(16);
			        var md5 = key3.slice(8, 16) +
			            key3.slice(0, 8) +
			            key3.slice(24, 32) +
			            key3.slice(16, 24);
			        return md5;
			    }
		},signMd5:(n,flag)=>{
			if(n>=fileList.length){
				tool.showOverSwal();
				return;
			}
			let f=fileList[n];
			if(f.errno && f.isdir==1){
				tool.signMd5(n+1);
				return;
			}
			Swal.getHtmlContainer().querySelector("index").textContent=n+1+"/"+fileList.length;
			tool.reqAjax(f,n,0);
		},forEachListFile:(n,flag)=>{
			if(n>=dirList.length){
				tool.signMd5(0,0);
				return;
			}
			let dirItem=encodeURIComponent(dirList[n]);
			$.ajax({
				url: `${reqfile}${dirItem}&recursion=1&start=${flag}`,
				type: 'GET',
				dataType:'json',
				success:function(res){
					if(!res.errno){
						if(!res.list.length){
							tool.forEachListFile(n+1,0);
						}else{
							res.list.forEach(function(i){
								if(i.isdir){

								}else{
									fileList.push({
										path:i.path,
										size:i.size,
										fs_id:i.fs_id,
										md5:tool.encodeMd5(i.md5.toLowerCase())
									})

								}
							})
							tool.forEachListFile(n,flag+10000);
						}
					}else{
						fileList.push({
							path:dirList[n],
							isdir: 1,
							errno: res.errno,
						})
						tool.forEachListFile(n+1,0);
					}
				},
				error:function(code){
					fileList.push({
						path: dirList[n],
						isdir: 1,
						errno: res.errno,
					})
					tool.forEachListFile(n+1,0);
				}
			})
		},showSwalCreate:()=>{
			Swal.fire({
				title: "秒传生成中",
				html:"<p>正在生成第 <index>0</index> 个</p>",
				showCloseButton: false,
                allowOutsideClick: false,
                showConfirmButton:false,
				onBeforeOpen: function() {
					Swal.showLoading();
				}
			})


		},responseErrnoInfo:(err)=>{
			 switch (err) {
			        case 31045:
			        case -6:
			            return "身份验证失败,退出帐户,重新登陆";
			        case -7:
			            return "转存路径含有非法字符";
			        case -8:
			            return "路径下存在同名文件";
			        case -9:
			            return "验证已过期, 请刷新页面";
			        case 400:
			            return "请求错误";
			        case 9019:
			        case 403:
			            return "接口限制访问";
			        case 404:
			            return "原始文件不存在秒传未生效";
			        case 114:
			            return "秒传失败";
			        case 514:
			            return "请求失败";
			        case 1919:
			            return "文件已被和谐";
			        case 996:
			            return "md5获取失败";
			        case 2:
			            return "参数错误";
			        case -10:
			            return "网盘容量已满";
			        case 500:
			        case 502:
			        case 503:
					case 31039:
			            return "服务器错误";
			        case 31066:
			        case 909:
			            return "路径不存在/云端文件已损坏";
			        case 900:
			            return "路径为文件夹, 不支持生成秒传";
			        case 110:
			            return "请先登录百度账号";
			        case 9013:
			            return "账号被限制, 尝试 更换账号 或 等待一段时间再重试";
			        default:
			            return "未知错误";
			    }
		},createErrFileList:(err,flag)=>{
			let html='<div class="createBox" style="height:auto; max-height:200px;overflow:auto;background:#FFFFFF;">';
			if(err>0){
				if(flag){
					html+=`<div><summary ><b class="showErrBtn" style="cursor:pointer">失败文件列表(点这里看失败原因):</b><a  class="mCopyList">复制列表</a></summary></div>`;
					html+=`<div style="display:none" class="errBox">`;
					for (let i=0;i<fileList.length;i++) {
						let f=fileList[i];
                        if(f.errno !=undefined && f.errno !='' && f.errno !=0){
                            errList+=`${f.path}(${f.errno})${tool.responseErrnoInfo(f.errno)}\n`;
                            html+='<p style="font-size:12px;line-height:22px">'+f.path+'<span class="redLink">('+f.errno+')'+tool.responseErrnoInfo(f.errno)+'</span></p>'
                        }
					}
					html+=`</div>`;
				}else{
					html+=`<div><summary ><b class="showErrBtn" style="cursor:pointer">失败文件列表(点这里看失败原因):</b><a  class="mCopyList">复制重新转存</a></summary></div>`;
					html+=`<div style="display:none" class="errBox">`;
					for (let i=0;i< linkList.length;i++) {
						let f=linkList[i];
                          if(f.errno !=undefined && f.errno !='' && f.errno !=0){
                            errList+=`${f.md5}#${f.md5s}#${f.size}#${f.path}\n`;
                            html+='<p style="font-size:12px;line-height:22px">'+f.path+'<span class="redLink">('+f.errno+')'+tool.responseErrnoInfo(f.errno)+'</span></p>'
                        }

					}
					html+=`</div>`;
				}

			}
			html+=`<br/>`;
			if(upresponse && upresponse.result){
				html+=upresponse.result;
			}
			if(flag){
				html+=`<p>快去复制秒传代码吧!!!</p></div>`
			}else{
				html+=`<p>快去刷新页面查看文件吧!!!</p></div>`
			}

			return html;
		},showOverSwal:()=>{
			let err=0,success='',ucode='',ecode='https://pan.baidu.com/#bdlink=';
			for (let i=0;i<fileList.length;i++) {
				let f=fileList[i];
				if(f.errno || f.isdir==1){
					err++;
				}else{
					success+='<p>'+f.path+'</p>';
                    if(f.md5s){
                        ucode+=`${f.md5}#${f.md5s}#${f.size}#${f.path}\n`;
                    }else{
                        ucode+=`${f.md5}#${f.size}#${f.path}\n`;
                    }
				}
			}
			let title="生成完成 共"+fileList.length+"个,失败"+err+"个";
			let html=tool.createErrFileList(err,true);
			Swal.fire({
				title: title,
				html:html,
                allowOutsideClick: false,
				showCloseButton: true,
				showConfirmButton:true,
				confirmButtonText:"复制秒传代码",
				showDenyButton:true,
				denyButtonText:"提取一键秒传代码",
				preDeny:function(){
					let newCode=ucode.replace(/(#\/.+\/)|(#\/)/g, "#");
					GM_setClipboard(ecode+Base64.encode(newCode));
					Swal.getDenyButton().innerText="一键秒传提取成功";
					return false;
				},
				preConfirm:function(){
					GM_setClipboard(ucode.replace(/(#\/.+\/)|(#\/)/g, "#"));
					Swal.getConfirmButton().innerText="复制成功";
					return false;
				}

			})
			fileList=[];dirList=[];
			tool.removeBtn();
			//添加事件
			tool.addEventBtn();
		},removeBtn:()=>{
			let mbtn1=GM_getValue('MBTN1');
			let mbtn2=GM_getValue('MBTN2');
			let mbtn3=GM_getValue('MBTN3');
			try{
				if(mbtn1) $(".mPbox1").remove();
				if(mbtn2) $(".mPbox2").remove();
				if(mbtn3) $(".mPbox3").remove();
			}catch(e){
				//TODO handle the exception
			}


		},addEventBtn:()=>{
			try{
				$(".mbtn1").click(function(){
					GM_setValue('MBTN1',1);
					$(".mPbox1").remove();
				})
				$(".mbtn2").click(function(){
					GM_setValue('MBTN2',1);
					$(".mPbox2").remove();
				})
				$(".mbtn3").click(function(){
					GM_setValue('MBTN3',1);
					$(".mPbox3").remove();
				})
				$(".showErrBtn").click(function(){
					if($(".errBox").is(':visible')){
						$(".errBox").hide();
					}else{
						$(".errBox").show();
					}
				})
				$(".mCopyList").click(function(){
					GM_setClipboard(errList);
					$(this).html('已复制');
				})
			}catch(e){
				//TODO handle the exception
			}
		},updateInfo:(data)=>{
			Swal.fire({
				title: "百度网盘秒传链接提取 v" + GM_info.script.version,
				showCloseButton: true,
				allowOutsideClick: false,
				confirmButtonText: "知道了",
				html:data
			}).then(function(res) {
				GM_setValue('BAIDUWPUPDATEINFO',tool.timeStamp());
			});
		}
	}
	function init(){
		//检查是否一键秒传代码
		 let base64code = location.href.match(/#bdlink=([\da-zA-Z+/=]+)/);
		 if(base64code) base64code=base64code[1];
		 if(base64code){
			GM_setValue('BASE64CODELINK',base64code);
		 }
		if (["interactive", "complete"].includes(document.readyState)){
			main();
		}
		else{
			window.addEventListener("DOMContentLoaded", main);
		}


	}



	function main() {
		GM_addStyle(
			`#btn-resp button,#btn-create button{line-height: 1;white-space: nowrap;cursor: pointer;outline: 0; margin: 0; transition: 0.1s;color: #fff; background-color: #06a7ff;font-weight: 700; padding: 8px 16px;height: 32px;font-size: 14px; border-radius: 16px;margin-left: 8px;    border: none;} .createBox p{line-height: 35px;} .myDidplayBtn{text-align: center;font-size: .85em;color: #09aaff;border: 2px solid #c3eaff;border-radius: 4px;margin-left: 5px;padding: 10px;padding-top: 5px;padding-bottom: 5px;cursor: pointer;} .redLink{color:red}`
			)
		 tool.loadAlert();
		let baiduCla = tool.baiduClass();
		if (baiduCla == "main" || baiduCla=="home") {
			// 创建按钮 START
			let btnResp = document.createElement('a');
			btnResp.id = btnRespConf.id;
			btnResp.title = btnRespConf.text;
			btnResp.innerHTML = btnRespConf.html(baiduCla);
			btnResp.addEventListener('click', function(e) {
				tool.inputUserValue();
				e.preventDefault();
			});
			bdstoken =baiduCla=='home' ? locals.get('bdstoken') : unsafeWindow.locals.userInfo.bdstoken;
			let btnCreate = document.createElement('a');
			btnCreate.id = btnCreateConf.id;
			btnCreate.title = btnCreateConf.text;
			btnCreate.innerHTML = btnCreateConf.html(baiduCla);
			btnCreate.addEventListener('click', function(e) {
                checkFileList=tool.getCheckFile(baiduCla);
				if(checkFileList.length<=0){
					Swal.fire({
					title: "错误提醒",
					html:"请勾选要生成秒传的文件/文件夹",
					confirmButtonText: '确定',
					showCloseButton: true
					})
					return '';
				}
				for (let i=0;i<checkFileList.length;i++) {
					if(checkFileList[i].isdir){
						dirList.push(checkFileList[i].path);
					}else{
						fileList.push({
							path:checkFileList[i].path,
							size:checkFileList[i].size,
							fs_id:checkFileList[i].fs_id,
							md5:tool.encodeMd5(checkFileList[i].md5.toLowerCase())
						})
					}
				}
				if(dirList.length>0){
					Swal.fire({
					 icon: "info",
					        title: "包含文件夹, 是否递归生成?",
					        text: "若选是, 将同时生成各级子文件夹下的文件",
					        allowOutsideClick: false,
					        focusCancel: true,
					        showCancelButton: true,
					        reverseButtons: true,
					        showCloseButton: true,
					        confirmButtonText: "是",
					        cancelButtonText: "否",
					}).then(function(res) {
						if (!res.dismiss) {
							tool.forEachListFile(0,0);
							tool.showSwalCreate();


						}
					});
				}else{
					tool.showSwalCreate();
                    tool.signMd5(0,0);
				}

				e.preventDefault();
			});

			if(baiduCla=="home"){
				tool.sleep(800).then(()=>{
					let parent = null;
					let btnUpload = document.querySelector('[node-type=upload]'); // 管理页面：【上传】
                    btnUpload.style.maxWidth = '80px';
                    btnUpload.style.display = 'inline-block';
					parent = btnUpload.parentNode;
					parent.insertBefore(btnResp, parent.childNodes[1]);
					parent.insertBefore(btnCreate, parent.childNodes[1]);
				})


			}else{
				let btnUpload;
				btnUpload = document.querySelector(
					"[class='nd-file-list-toolbar nd-file-list-toolbar__actions inline-block-v-middle']");
				if (btnUpload) {
					btnResp.style.cssText = 'margin-right: 5px;';
					btnCreate.style.cssText = 'margin-right: 5px;';

					btnUpload.insertBefore(btnResp, btnUpload.childNodes[0]);
					btnUpload.insertBefore(btnCreate, btnUpload.childNodes[0]);
				} else {
					btnUpload = document.querySelector(
						"[class='wp-s-agile-tool-bar__header  is-default-skin is-header-tool']");
					if (!btnUpload) {
						btnUpload = document.querySelector("[class='wp-s-agile-tool-bar__header  is-header-tool']");
					}
					let parentDiv = document.createElement('div');
					parentDiv.className = 'wp-s-agile-tool-bar__h-action is-need-left-sep is-list';
					parentDiv.style.cssText = 'margin-right: 10px;';
					parentDiv.insertBefore(btnResp, parentDiv.childNodes[0]);
					parentDiv.insertBefore(btnCreate, parentDiv.childNodes[0]);
					btnUpload.insertBefore(parentDiv, btnUpload.childNodes[0]);
				}
			}

			let base64code=GM_getValue('BASE64CODELINK');
			if(base64code){
				base64code=Base64.decode(base64code);
				if(typeof swal === 'undefined'){
					tool.sleep(1000).then(()=>{
						tool.inputUserValue(base64code);
						GM_setValue('BASE64CODELINK','');
						updateVersion(true);
					})
				}else{
					tool.inputUserValue(base64code);
				    GM_setValue('BASE64CODELINK','');
				    updateVersion(true);
				}


			}else{
				updateVersion(false);
			}


		}
	}

	function updateVersion(flag){
		//判断是否更新
		var isUpdateInfo= GM_getValue('BAIDUWPUPDATEINFO') || 0;
		tool.get(`${updateApi}?version=`+GM_info.script.version).then((res)=>{
			try{
				upresponse=res;
				if(!flag){
					let nowTime=tool.timeStamp();
					let isdiff=isUpdateInfo+60*24*1000;
					if(res.code==1 && nowTime>isdiff){
						tool.updateInfo(res.data);
						tool.removeBtn();
						//添加事件
						tool.addEventBtn();
					}else if(res.code==2 && nowTime>(isUpdateInfo+24*60*5*1000)){
						tool.updateInfo(res.data);
						tool.removeBtn();
						//添加事件
						tool.addEventBtn();
					}
				}
			}catch(e){
				//TODO handle the exception
			}
		})
	}



	function savePathList(i, labFig) {
		if (i >= linkList.length) {
			let html=tool.createErrFileList(failed,false);
			Swal.fire({
				title: "".concat('文件转存').concat(linkList.length, '个,').concat(failed, "个失败!"),
				confirmButtonText: '确定',
                allowOutsideClick: false,
                showCloseButton: true,
				html:html
			})
			failed = 0;
			linkList=[];
			tool.removeBtn();
			//添加事件
			tool.addEventBtn();
			return;
		}

		var f = linkList[i];
		Swal.getHtmlContainer().querySelector("index").textContent=i+1+"/"+linkList.length;
        f.path.replace(/["\\\:*?<>|]/, "");

        if(f.md5s){
             tool.post(`https://pan.baidu.com/api/rapidupload?bdstoken=${bdstoken}`,{
                rtype:0,
				path: inputSavePath + '/' + f.path,
                "content-md5": f.md5,
                "slice-md5": f.md5s.toLowerCase(),
                "content-length": f.size,
			},{"User-Agent":"netdisk;2.2.51.6;netdisk;10.0.63;PC;android-android;QTP/1.0.32.2"}).then((res)=>{
                 if(res.errno===0){
					f.errno = 0;
					savePathList(i+1,0);
				 }else{
					if (res.errno === 404 && labFig < 2) {
						 if(labFig==1){
							  f.md5=tool.randMd5(f.md5);
						 }else{
							  f.md5=tool.charRecoveStr(f.md5);
						 }
						 savePathList(i, labFig + 1);
					}else if (res.errno === 31039 && labFig < 2) {
						 f.path=tool.changePath(f.path);
						 savePathList(i, labFig + 1);
					}else{
					   failed++;
					   f.errno=res.errno;
					   savePathList(i+1,0);
					}
					 
				 }
             
        })
        }else{
            $.ajax({
			url: `${reqstr}&bdstoken=${bdstoken}`,
			type: 'POST',
			data: {
				block_list: JSON.stringify([f.md5.toLowerCase()]),
				path: inputSavePath + '/' + f.path,
				size: f.size,
				isdir: 0,
				rtype: 0,
				is_revision: 0
			}
		}).success(function(r) {
                f.errno = r.errno;

		}).fail(function(r) {
			linkList[i].errno = 115;
		}).always(function() {
			if (linkList[i].errno === -8 && labFig < 1) {
                 f.path='copy_'+f.path;
				savePathList(i, labFig + 1);
				return;
			} else if (linkList[i].errno) {
				failed++;
			}
			savePathList(i + 1, 0);
		});
        }



	}


		 // 绑定入口函数到dom事件
        try {
		    init();
        }catch (err) {
            console.log('脚本冲突或者被拦截',err);
        }
	

}();
