// ==UserScript==
// @name         eBooks Assistant
// @name:zh-CN   豆瓣读书助手
// @namespace    https://github.com/caspartse/eBooksAssistant
// @version      0.19.0
// @description  eBooks Assistant for douban.com
// @description:zh-CN 为豆瓣读书页面添加微信读书、多看阅读、京东读书、当当云阅读、喜马拉雅等直达链接
// @author       Caspar Tse
// @license      MIT License
// @supportURL   https://github.com/caspartse/eBooksAssistant
// @match        https://book.douban.com/subject/*
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js
// @connect      api.youdianzishu.com
// @connect      127.0.0.1
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    var version = "0.19.0";
    // 如果自己部署服务，这里修改成你的服务器地址
    var domain = "https://api.youdianzishu.com"
    // var domain = "http://127.0.0.1:8081";
    // for debug
    // var domain = "http://127.0.0.1:8082";

    // Base64 icons
    var b64_icon_weread = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABMlBMVEU4tP83tP8ysf8xsf8ysP8xsP8xr/8xrv8xrf8xrf4xrP8xrP4wrP4wq/4wqv4wqf4wqP4vqP4vp/4up/4rpv4rpf4tpv5Arf53xP6X0v6Fy/5Utv4upv4vpv4tpf5Utf7Q6v/8/v/////s9/+Mzf4wpv40p/7C5P/W7f+T0P7+/v/L6P+a0//z+v9lvP4rpP4vpf4tpP5Hr/7o9f/q9v/H5//+///k8//K6P8qo/4upP46qf7T7P/9/v94xP4vpP4so/52w/7v+P/B5P88qf4to/4uo/4tov6g1f7S6//d8P+X0f5Aq/4sov5DrP42pv4+qv43p/4rof4roP0roPwrof0uov4qoP0qoPyWzvmWzfmTzPlsu/ozo/z3+/73/P7t9v2IyPv0+v72+/7k8v31+v52qLiyAAAAAWJLR0QiXWVcrAAAAAd0SU1FB+QKERMSBxvkIzYAAAFFSURBVDjLhYqHUsJAFEWfcWMQNRQFayyxYsWuawk2ELsiKKFI/f9fcN9uZtgENGfuK3PmAvxFn3OVfoaiiAhcAhSFOJ5dQviWBRCiElVVCcGt4nYLGPDBv6D5AFogoGkifDSPgAAyyCPRERAcQoJOxJUFDCNBZ8RyCRjxgRV059X5o3sE6D5ACNFDHjoCQj5AWCbC4xIQQaKRzgnzd3QsFovjD9GexMcnJqemZ9gHhpso37Nz8wumubi0bBjegmBldS2xvrG5tb1jQLIHu3v7B4dHxydm4jTZs0DPzk3k4pIVLItSi0HxUkskdXWNhZvbOwvSHMpCnQfJ3Gcfso9Pz+m0U+ji5fXt/SPDHsghnzyMfKGQ5+Ir981FDoq2bRdx4SmVK5VySRJFG6oSP9VavV5jRwIaLpqtVtNtPIVGu934v9DFL75RivuAiiVCAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTEwLTE3VDExOjI2OjE5KzA4OjAwmsnyVQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0xMC0xN1QxMToxODowNyswODowMPAqZ5gAAAAASUVORK5CYII=";
    var b64_icon_duokan = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABUFBMVEXtkC/tkC/tkC/tkC/tkC/tkC/tkC/tkC/tkC/tjy7tjiztjyztkC7vnUjzs3Hyq2LulDbvmUDysGrulzztjy3wpVb76NT//fz++fT3y57tkzXzuHn++PLyr2r3zaL////+9u7xpln0u4H//Przs3D406zxqmDysWz99u353b/ulz3ysW3869nxql/tkTHyrmf3zKD1w47vnUftkzTvnEXtkjPuljvyrmj75c775MzyrGPulTntkDDulDf638P63b/xqFv517PumT/98+nwo1L2xpX75tH1wIj//v3tkTDvnkn87Nr3zJ/vnEb86df+9/D0uHv517X98ujxplfzt3j++fP+9+/2ypvwolDulTjumD7638T+/Pj1xJDtkjL98+j64sn63sD76NX++vX3zqTzt3f86tf//v787+H0un741K764cb64sj517T1v4bwoEzN5UsNAAAACHRSTlMcnfP0nh388p6FZyYAAAABYktHRB8FDRC9AAAAB3RJTUUH5AoRExEwiHTV+gAAAUFJREFUOMu9k9dTAkEMxg9E3L2LekoUsEXFXk4RFAuIYgHsXbFg7+3/f/NmnGt7A/fimLfN/ia7+fJFknx+VjFqArWSL8iqRDAg1bGq4ZeYR/wnwGUFrDSXQQCgvqFRNQloag6BA8CW1nAk2mYAcntHp+ys0EVE3T1oAL2xPgHo14HIgFIRwMEhouER4xPK6Ni44qygTUzGp7jZRSI5LbaJKFv3ep8uHSA0Y9OBgQjw1OzcvFVCW0g7AcgsEmVV872l5Rx3VlB1YGXV0AHX1gUlGeYLRNHibxY3NrfEWfDtHaLdvTSCPqjc/sEhCgDDo2Oik9OzUuI8dXF5ZfzR5odyPEJUuL65vbuPPZTADUD58SmsT4SeX/IZq2G7ozD5+vb+8fn1DTbJHJbjclHNaAracy5PgnD+A1d7rp7n8nqt/w9oaTwtTt+bTAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMC0xN1QxMToyNjoyNCswODowMHWRlHYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTAtMTdUMTE6MTc6NDgrMDg6MDBzI0IGAAAAAElFTkSuQmCC";
    var b64_icon_jd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuZWRhMmIzZmFjLCAyMDIxLzExLzE3LTE3OjIzOjE5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuMSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDItMTJUMTA6MTY6MTErMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTAyLTEyVDEwOjIwOjMwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAyLTEyVDEwOjIwOjMwKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkMTI3ZDdmNi0wZjJlLTRmZGEtOTgxZS0yYzc1MWIxN2M4MzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZDEyN2Q3ZjYtMGYyZS00ZmRhLTk4MWUtMmM3NTFiMTdjODMxIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDEyN2Q3ZjYtMGYyZS00ZmRhLTk4MWUtMmM3NTFiMTdjODMxIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMTI3ZDdmNi0wZjJlLTRmZGEtOTgxZS0yYzc1MWIxN2M4MzEiIHN0RXZ0OndoZW49IjIwMjItMDItMTJUMTA6MTY6MTErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy4xIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pkcx3wkAAALuSURBVFiFzZfNS1RhFMZ/7zv3js6oZdpMarYQUqSFolIpLRIKtCiotWTmPxAWtOgvcBMFQcvatQoyjT5Q84M+cCUJSi10YcUwVkIzzjhz5360uNrHzL02o6P2wOXCeQ/neS73vIfniHCgmjUcB/qAdsDP9iAOjAO3gSkAsSbgCnB/m0jd0As8EOFAdQPwfofJ19GoAP0ZYSFACMxwCJMUYpPVLUCiIg9UgmXZz9/oF+FAdQQoSVOA+W0JtakJ5Ug9Vkq3q+UCAUJV0Oc+kJqeRu4P4lAkqgBqetRcDuNta6NsYgQUJUfmNOg6yydPo029Q5YF009VCaTSo4ah4e3s2Do5gKLg7ezAMDSn05QjgwCsWOyftc1QiNWhpyjBCgounHfNs2Ix1z5y/0TTdAwbi4tow2MkBp+QGHzMKlBSVUNgAwFutTYWkE48v0Ck7zqJoQFSgAQKauoJXDyH73J3tmU2LyB26w6RoQH8hw5T3NNF4dlO1NbWTRPnLMBKJJFA6aOHqMeObpl4HTLbRKGqCEAonryR5yQAYfextZrYJQHbhKwFWJpmD9JUxtzaGQGYJiaAP79WIetbUHTzBt5T7agtzbsjQKmrRamrzSs5/NdNKDZrQ3Kr5SpAFBflj9/ny02AQKBP588m6rNzrmfOlswwMKMRfJe6UBsbsJIa1soKsrICX083orAgS2qL+N17RK5eQ+4pBa83PSHqLEB6QNcxvn/55eLW38HXb1FPtLlTxmNoYxMkX46gvRonNTuNLClHFBWDYWQIcL6GpgFS4Pm9tNiT8McyeDIbygyH0UbHSY6Mok1Moi98XHPECp7yg6B4nMgBew5kmFJHCIGFgfDZk9CYX0AbHSM5PIw2+QZ96TMAkkI8ZVU26boNd3dEqostd4aViKM2tyCDAZIvhjGiXwHwqCWIvXtASifvvxGiIhyofgacySZbKCpG6BMWOtK/z/6vglxJ/8TzXV/NJDCDvSjuNHqBGbHb6/lP9kL8xeX2i5QAAAAASUVORK5CYII=";
    var b64_icon_dangdang = "data:image/png;base64,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";
    var b64_icon_ximalaya = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABvFBMVEUAAAD7KAD6KAD6KQH7KAD6KAD6KAD6KAD6KAD7KQD6KAD6KAD7KQH7KAD6KAD6KAD6KAD6JwD6JgD6KwX6Pxv7QyD6PRj6KgP6KQL6PBf7QB36LAT6Lwj8lID93tn+5eD929X8hW/6KwP8gGj92tP+5OD+5+P9vbH6NhH6JQD7VDT+7+z++/v908v93tj+/v36RCH6Phr939r+/v7939n91Mz9x737a1D7YEL++Pf9w7j6PRn6Mw36Mgz7RCH90sr+8O77TSz6RiT+7Oj92dL7SCb6MAn6JwH++fj9rJ76KAH6LAf9v7P+8e/+7On6MAr9rZ76KQH6Lgf9v7T9yL76MQr6Lwr+6+f8nYv8mIb8mYb8moj8iXT6Mw7+6eX+///+/Pv8qZn+6+j929T7dl37cFX7cFb7blP8n43+/v/9sqT6LQr6JAD6IQD7bFP8m4n7blT8nIr9taj7Wz3+9fP+7uv8qpr8k3/7RSL6LQj9xbv7SSf6MQv6ORT9vrL7c1n9sKL6SCb+7er9xLn8l4T6Oxj7Z0v7ZEj6OBT7Vjb7ZUj6NxL6SCf93df8g2z7XkD7VDX6Lgj7Ti3///+bcN/WAAAAEHRSTlMAAAAAC1u87P0Vl/MVCv7ykU8bAQAAAAFiS0dEk+ED37YAAAAHdElNRQfkCgcIIAF69pagAAABeUlEQVQ4y2NgYGRhZWPnEMAAHOxsrCyMDAxMnFzcAjgANxcPMwMvF58ATsDHxcvAyi+AB/CzMrBBWIJCQCAIZ4EBiMfGwA4WFBYRBQIxcQEBCUlRKJCSBsqwM4DdLyMrJw8ECopKEsoqqvJgoKauATSRgwEkr6mlraOgq6unL29gaGRsogsCpmbmYLshCiwsraxtbO3sHRydnF1cbW1AwM0dWYGHp5egoLePr6OTn5m/IAQIoCgICBQQCAoGKQgJFUT2KKYCszCoLwWxKwiXj4iMAoHomFhBbAri4qEgITEIqwlJySmpaWnpGZlZYAOwuSE7JycnN884PwefLzQLjAs1h56CImEhoSAfnAqKS0rLyisqq7SrgQpqMBUI1tbpxHvUF8s3uDU2NcsIgBW0QBWAk5xga1t6e0dnV7dmT28fKIQ10436wYmWA5JoBQQ1czQFhTQFBW0mTATzRSZJgCXYYckeBgSFUGk2whmHYNbDn3k5mRgIZX8AAQWVTx3DBdsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTAtMDdUMDA6MzI6MDErMDg6MDBq1jCmAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTEwLTA3VDAwOjMyOjAxKzA4OjAwG4uIGgAAAABJRU5ErkJggg==";

    function adjustMargin() {
        if ($('[data-ebassistant="read"]').height() > 36) {
            $('[data-ebassistant="read"]').attr("style", "margin-right:0!important;");
            $('[data-ebassistant="read"] .online-read-or-audio').each(function() {
                if(($(this).offset().left - $('[data-ebassistant="read"]').offset().left) == 0) {
                    $(this).attr("style", "margin-left:65px!important;");
                }
            });
        }
    }

    // 使用服务器上的资源
    function queryWeread_Remote(isbn, title, subtitle, author, translator, publisher) {
        GM_xmlhttpRequest({
            method: "GET",
            url: `${domain}/weread?isbn=${isbn}&title=${title}&subtitle=${subtitle}&author=${author}&translator=${translator}&publisher=${publisher}&version=${version}`,
            headers: {
                "User-agent": window.navigator.userAgent,
            },
            onload: function(responseDetail) {
                var result = JSON.parse(responseDetail.responseText);
                console.log(result);
                if (result.errmsg == "") {
                    var bookUrl = result.data.url;
                    var bookPrice = result.data.price;
                    var partnerTemplate = "";
                    if ($('.online-type[data-ebassistant="read"]').length) {
                        partnerTemplate = `<div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}">
                        <img src="${b64_icon_weread}" width="16" height="16"> <span>微信读书</span> </a> </div>`;
                        $('.online-type[data-ebassistant="read"]').append(partnerTemplate);
                    } else if ($('.online-type[data-ebassistant="audio"]').length) {
                        partnerTemplate = `<div class="online-type" data-ebassistant="read"> <span>在线试读：</span> <div class="online-read-or-audio">
                        <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_weread}" width="16" height="16"> <span>微信读书</span> </a> </div></div>`;
                        $('.online-type[data-ebassistant="audio"]').before(partnerTemplate);
                    } else {
                        partnerTemplate = `<div class="online-partner"> <div class="online-type" data-ebassistant="read"> <span>在线试读：</span>
                        <div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_weread}" width="16" height="16"> <span>微信读书</span> </a> </div></div> </div>`;
                        $("#link-report").after(partnerTemplate);
                    }
                    var buyItemTemplate = `<li> <div class="cell price-btn-wrapper"> <div class="vendor-name"> <a target="_blank" href="${bookUrl}"> <span>
                    <img class="eba-vendor-icon" src="${b64_icon_weread}">&nbsp;微信读书</span> </a> </div> <div class="cell impression_track_mod_buyinfo"> <div class="cell price-wrapper">
                    <a target="_blank" href="${bookUrl}"> <span class="buylink-price"> ${bookPrice}元 </span> </a> </div> <div class="cell">
                    <a target="_blank" href="${bookUrl}" class="buy-book-btn e-book-btn"> <span>购买电子书</span> </a> </div> </div> </div> </li>`;
                    $("#buyinfo ul:nth-child(2)").prepend(buyItemTemplate);
                }
                adjustMargin();
                return;
            }
        });
        return;
    }

    // 使用服务器上的资源
    function queryDuokan_Remote(isbn, title, subtitle, author, translator, publisher) {
        GM_xmlhttpRequest({
            method: "GET",
            url: `${domain}/duokan?isbn=${isbn}&title=${title}&subtitle=${subtitle}&author=${author}&translator=${translator}&publisher=${publisher}&version=${version}`,
            headers: {
                "User-agent": window.navigator.userAgent,
            },
            onload: function(responseDetail) {
                var result = JSON.parse(responseDetail.responseText);
                console.log(result);
                if (result.errmsg == "") {
                    var bookUrl = result.data.url;
                    var bookPrice = result.data.price;
                    var partnerTemplate = "";
                    if ($('.online-type[data-ebassistant="read"]').length) {
                        partnerTemplate = `<div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}">
                        <img src="${b64_icon_duokan}" width="16" height="16"> <span>多看阅读</span> </a> </div>`;
                        $('.online-type[data-ebassistant="read"]').append(partnerTemplate);
                    } else if ($('.online-type[data-ebassistant="audio"]').length) {
                        partnerTemplate = `<div class="online-type" data-ebassistant="read"> <span>在线试读：</span> <div class="online-read-or-audio">
                        <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_duokan}" width="16" height="16"> <span>多看阅读</span> </a> </div></div>`;
                        $('.online-type[data-ebassistant="audio"]').before(partnerTemplate);
                    } else {
                        partnerTemplate = `<div class="online-partner"> <div class="online-type" data-ebassistant="read"> <span>在线试读：</span>
                        <div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_duokan}" width="16" height="16"> <span>多看阅读</span> </a> </div></div> </div>`;
                        $("#link-report").after(partnerTemplate);
                    }
                    var buyItemTemplate = `<li> <div class="cell price-btn-wrapper"> <div class="vendor-name"> <a target="_blank" href="${bookUrl}"> <span>
                    <img class="eba-vendor-icon" src="${b64_icon_duokan}">&nbsp;多看阅读</span> </a> </div> <div class="cell impression_track_mod_buyinfo"> <div class="cell price-wrapper">
                    <a target="_blank" href="${bookUrl}"> <span class="buylink-price"> ${bookPrice}元 </span> </a> </div> <div class="cell">
                    <a target="_blank" href="${bookUrl}" class="buy-book-btn e-book-btn"> <span>购买电子书</span> </a> </div> </div> </div> </li>`;
                    $("#buyinfo ul:nth-child(2)").prepend(buyItemTemplate);
                }
                adjustMargin();
                return;
            }
        });
        return;
    }

    // 使用服务器上的资源
    function queryXimalaya_Remote(isbn, title, subtitle, author, translator, publisher) {
        GM_xmlhttpRequest({
            method: "GET",
            url: `${domain}/ximalaya?isbn=${isbn}&title=${title}&subtitle=${subtitle}&author=${author}&translator=${translator}&publisher=${publisher}&version=${version}`,
            headers: {
                "User-agent": window.navigator.userAgent,
            },
            onload: function(responseDetail) {
                var result = JSON.parse(responseDetail.responseText);
                console.log(result);
                if (result.errmsg == "") {
                    var alubmUrl = result.data.url;
                    var partnerTemplate = "";
                    if ($(".online-partner .online-type").length == 2) {
                        partnerTemplate = `<div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${alubmUrl}">
                        <img src="${b64_icon_ximalaya}" width="16" height="16"> <span>喜马拉雅</span> </a> </div>`;
                        $('.online-type[data-ebassistant="audio"]').append(partnerTemplate);
                    } else if ($(".online-partner .online-type").length == 1) {
                        partnerTemplate = `<div class="online-type" data-ebassistant="audio"> <span>在线试听：</span> <div class="online-read-or-audio">
                        <a class="impression_track_mod_buyinfo" target="_blank" href="${alubmUrl}" one-link-mark="yes">
                        <img src="${b64_icon_ximalaya}" width="16" height="16"> <span>喜马拉雅</span> </a> </div></div>`;
                        $('.online-type[data-ebassistant="read"]').after(partnerTemplate);
                    } else {
                        partnerTemplate = `<div class="online-partner"> <div class="online-type" data-ebassistant="audio"> <span>在线试听：</span>
                        <div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${alubmUrl}" one-link-mark="yes">
                        <img src="${b64_icon_ximalaya}" width="16" height="16"> <span>喜马拉雅</span> </a> </div></div> </div>`;
                        $("#link-report").after(partnerTemplate);
                    }
                }
                adjustMargin();
                return;
            }
        });
        return;
    }

    // 使用服务器上的资源
    function queryJingdong_Remote(isbn, title, subtitle, author, translator, publisher) {
        GM_xmlhttpRequest({
            method: "GET",
            url: `${domain}/jd?isbn=${isbn}&title=${title}&subtitle=${subtitle}&author=${author}&translator=${translator}&publisher=${publisher}&version=${version}`,
            headers: {
                "User-agent": window.navigator.userAgent,
            },
            onload: function(responseDetail) {
                var result = JSON.parse(responseDetail.responseText);
                console.log(result);
                if (result.errmsg == "") {
                    var bookUrl = result.data.url;
                    var bookPrice = result.data.price;
                    var partnerTemplate = "";
                    if ($('.online-type[data-ebassistant="read"]').length) {
                        partnerTemplate = `<div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}">
                        <img src="${b64_icon_jd}" width="16" height="16"> <span>京东读书</span> </a> </div>`;
                        $('.online-type[data-ebassistant="read"]').append(partnerTemplate);
                    } else if ($('.online-type[data-ebassistant="audio"]').length) {
                        partnerTemplate = `<div class="online-type" data-ebassistant="read"> <span>在线试读：</span> <div class="online-read-or-audio">
                        <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_jd}" width="16" height="16"> <span>京东读书</span> </a> </div></div>`;
                        $('.online-type[data-ebassistant="audio"]').before(partnerTemplate);
                    } else {
                        partnerTemplate = `<div class="online-partner"> <div class="online-type" data-ebassistant="read"> <span>在线试读：</span>
                        <div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_jd}" width="16" height="16"> <span>京东读书</span> </a> </div></div> </div>`;
                        $("#link-report").after(partnerTemplate);
                    }
                    var buyItemTemplate = `<li> <div class="cell price-btn-wrapper"> <div class="vendor-name"> <a target="_blank" href="${bookUrl}"> <span>
                    <img class="eba-vendor-icon" src="${b64_icon_jd}">&nbsp;京东读书</span> </a> </div> <div class="cell impression_track_mod_buyinfo"> <div class="cell price-wrapper">
                    <a target="_blank" href="${bookUrl}"> <span class="buylink-price"> ${bookPrice}元 </span> </a> </div> <div class="cell">
                    <a target="_blank" href="${bookUrl}" class="buy-book-btn e-book-btn"> <span>购买电子书</span> </a> </div> </div> </div> </li>`;
                    $("#buyinfo ul:nth-child(2)").prepend(buyItemTemplate);
                }
                adjustMargin();
                return;
            }
        });
        return;
    }

    // 使用服务器上的资源
    function queryDangdang_Remote(isbn, title, subtitle, author, translator, publisher) {
        GM_xmlhttpRequest({
            method: "GET",
            url: `${domain}/dangdang?isbn=${isbn}&title=${title}&subtitle=${subtitle}&author=${author}&translator=${translator}&publisher=${publisher}&version=${version}`,
            headers: {
                "User-agent": window.navigator.userAgent,
            },
            onload: function(responseDetail) {
                var result = JSON.parse(responseDetail.responseText);
                console.log(result);
                if (result.errmsg == "") {
                    var bookUrl = result.data.url;
                    var bookPrice = result.data.price;
                    var partnerTemplate = "";
                    if ($('.online-type[data-ebassistant="read"]').length) {
                        partnerTemplate = `<div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}">
                        <img src="${b64_icon_dangdang}" width="16" height="16"> <span>当当云阅读</span> </a> </div>`;
                        $('.online-type[data-ebassistant="read"]').append(partnerTemplate);
                    } else if ($('.online-type[data-ebassistant="audio"]').length) {
                        partnerTemplate = `<div class="online-type" data-ebassistant="read"> <span>在线试读：</span> <div class="online-read-or-audio">
                        <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_dangdang}" width="16" height="16"> <span>当当云阅读</span> </a> </div></div>`;
                        $('.online-type[data-ebassistant="audio"]').before(partnerTemplate);
                    } else {
                        partnerTemplate = `<div class="online-partner"> <div class="online-type" data-ebassistant="read"> <span>在线试读：</span>
                        <div class="online-read-or-audio"> <a class="impression_track_mod_buyinfo" target="_blank" href="${bookUrl}" one-link-mark="yes">
                        <img src="${b64_icon_dangdang}" width="16" height="16"> <span>当当云阅读</span> </a> </div></div> </div>`;
                        $("#link-report").after(partnerTemplate);
                    }
                    var buyItemTemplate = `<li> <div class="cell price-btn-wrapper"> <div class="vendor-name"> <a target="_blank" href="${bookUrl}"> <span>
                    <img class="eba-vendor-icon" src="${b64_icon_dangdang}">&nbsp;当当云阅读&nbsp;</span> </a> </div> <div class="cell impression_track_mod_buyinfo"> <div class="cell price-wrapper">
                    <a target="_blank" href="${bookUrl}"> <span class="buylink-price"> ${bookPrice}元 </span> </a> </div> <div class="cell">
                    <a target="_blank" href="${bookUrl}" class="buy-book-btn e-book-btn"> <span>购买电子书</span> </a> </div> </div> </div> </li>`;
                    $("#buyinfo ul:nth-child(2)").prepend(buyItemTemplate);
                }
                adjustMargin();
                return;
            }
        });
        return;
    }

    try {
        $(".online-partner .online-type:nth-child(1)").attr("data-ebassistant", "read");
        $(".online-partner .online-type:nth-child(2)").attr("data-ebassistant", "audio");
    } catch(e) {
        console.log(e);
    }
    var newStyle = `<style type="text/css" media="screen">.online-partner{flex-wrap:wrap;padding-top:5px;padding-bottom:5px}.online-type{flex-wrap:wrap}
    .online-read-or-audio{margin-top:5px;margin-bottom:5px}.online-partner .online-type:nth-child(1){margin-right:20px}
    .online-partner .online-type:last-child{margin-right:0}.online-partner .online-type:nth-child(2){padding-left:0}[data-ebassistant=read] div:last-child a{margin-right:0}
    .eba-vendor-icon {text-decoration:none;display:inline-block;vertical-align:middle;width:15px;height:15px;margin-top:-2px;border:0;border-radius:50%;box-shadow: 0 0 1px 0 rgba(0,0,0,0.6);}</style>`;
    $("#content").append(newStyle);

    var _doc = document.documentElement.innerHTML;
    var regexLinkedData = /<script type="application\/ld\+json">([\s\S]+?)<\/script>/gi;
    var linkedData = regexLinkedData.exec(_doc)[1].trim();
    linkedData = JSON.parse(linkedData);
    console.log(linkedData);
    var isbn = linkedData.isbn;
    console.log(isbn);
    var title = linkedData.name;
    console.log(title);
    _doc = _doc.replace(/&nbsp;/gi, " ");
    var subtitle = "";
    try {
        var regexSubtitle = /<span class="pl">\s*副标题:?<\/span>\s*:?\s*([\s\S]+?)<br\/?>/gi;
        subtitle = regexSubtitle.exec(_doc)[1].trim();
    } catch(e) {
        console.log(e);
    }
    console.log(subtitle);
    var authorStr = "";
    for (var i=0, j=linkedData.author.length; i<j; i++) {
        authorStr += linkedData.author[i].name + " ";
    }
    var author = authorStr;
    console.log(author);
    var translator = "";
    try {
        var regexTranslator = /<span class="pl">\s*译者:?<\/span>\s*:?\s*<a[^>]+>([\s\S]+?)<\/a>/gi;
        translator = regexTranslator.exec(_doc)[1].trim();
    } catch(e) {
        console.log(e);
    }
    console.log(translator);
    var publisher = "";
    try {
        var regexPublisher = /<span class="pl">\s*出版社:?<\/span>\s*:?\s*<a[^>]+>([\s\S]+?)<\/a>/gi;
        publisher = regexPublisher.exec(_doc)[1].trim();
    } catch(e) {
        console.log(e);
    }
    console.log(publisher);

    queryWeread_Remote(isbn, title, subtitle, author, translator, publisher);
    queryDuokan_Remote(isbn, title, subtitle, author, translator, publisher);
    queryXimalaya_Remote(isbn, title, subtitle, author, translator, publisher);
    queryJingdong_Remote(isbn, title, subtitle, author, translator, publisher);
    queryDangdang_Remote(isbn, title, subtitle, author, translator, publisher);

    return;
})();