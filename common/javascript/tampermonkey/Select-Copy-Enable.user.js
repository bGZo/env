// ==UserScript==
// @name Select-Copy-Enable
// @include         *
// ==/UserScript==

/*var $input = document.getElementById('search_form_input_homepage') || document.getElementById('search_form_input') ;
$input && $input.addEventListener('input', function (e) {
    if($input.value.search(/。/) === 0) {
      var start = $input.selectionStart;
      var end = $input.selectionEnd;
      this.value = this.value.replace(/。/, '. ');
      $input.selectionStart=start;
      $input.selectionEnd=end;
    }

})*/
window.onload=function() {
    'use strict';
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    sleep(5000).then(() => {
        var eles = document.getElementsByTagName('*');
        for (var i = 0; i < eles.length; i++) {
            eles[i].style.userSelect = 'text';
            eles[i].style.webkitUserSelect = 'text';
        }
        //document.getElementById('rdhs').innerHTML = '.rdhnav:before,mark[data-rdhid]{background:var(--rdhc,#fe0)!important}mark[data-rdhid]{background-image:linear-gradient(180deg,hsla(0,0%,100%,.7) 0,hsla(0,0%,100%,.7))!important;color:#000!important;-webkit-text-fill-color:#000!important;cursor:pointer!important}.rdhni{display:inline!important;padding:0!important;border:0!important;color:inherit!important;opacity:.5!important;fill:currentColor!important;background:transparent!important;border-radius:0!important;margin:0 .3em!important;width:.85em!important;height:.85em!important}.rdhnav{position:fixed!important;right:0!important;padding:10px 6px 10px 10px!important;cursor:pointer!important}.rdhnav:before{content:""!important;display:block!important;width:10px!important;height:10px!important;border-radius:10px!important;box-shadow:0 0 0 .5px ButtonShadow,0 5px 30px rgb(0 0 0/30%)!important;background-image:linear-gradient(180deg,hsla(0,0%,100%,.2) 0,hsla(0,0%,100%,.2))!important}.rdhnav:hover:before{background-image:linear-gradient(180deg,hsla(0,0%,100%,.5) 0,hsla(0,0%,100%,.5))!important}.rdhnav:active{filter:brightness(50%)!important}'
        console.log("run copy-able finished.")
    })
}

