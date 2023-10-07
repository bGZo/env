// ==UserScript==
// @name            Top-Back-Enable
// @include         *
// @grant GM_addScript
// ==/UserScript==

(function() {
    'use strict';
    var newHTML=document.createElement ('div');
    newHTML.innerHTML='<style>#kotori{position:fixed;bottom:-10px;left:-10px;height:70px;width:70px;cursor:pointer;transition:.2s all;display:block;z-index:100}#kotori:hover{transform:translate(10px,-10px)}</style><img id="kotori" src="https://s1.ax1x.com/2022/05/11/OUqj3D.png" onclick="smoothscroll()">';
    document.body.appendChild (newHTML);

    var scriptElem = document.createElement('script');
    scriptElem.innerHTML = 'window.addEventListener("scroll",handleScroll);function handleScroll(){var scollTop=document.documentElement.scrollTop||document.body.scrollTop;var clientHeight=document.documentElement.clientHeight;if(scollTop>=clientHeight){document.querySelector("#kotori").style.display="block"}else{document.querySelector("#kotori").style.display="none"}}function smoothscroll(){var currentScrollTop=document.documentElement.scrollTop||document.body.scrollTop;if(currentScrollTop>0){window.requestAnimationFrame(smoothscroll);window.scrollTo(0,currentScrollTop-currentScrollTop/10)}};';
    document.body.appendChild(scriptElem);

    var code = 'window.addEventListener("scroll",handleScroll);function handleScroll(){var scollTop=document.documentElement.scrollTop||document.body.scrollTop;var clientHeight=document.documentElement.clientHeight;if(scollTop>=clientHeight){document.querySelector("#kotori").style.display="block"}else{document.querySelector("#kotori").style.display="none"}}function smoothscroll(){var currentScrollTop=document.documentElement.scrollTop||document.body.scrollTop;if(currentScrollTop>0){window.requestAnimationFrame(smoothscroll);window.scrollTo(0,currentScrollTop-currentScrollTop/10)}};';
    eval(code);

//    let script_tag = GM_addScript('alert("works!");');

})();