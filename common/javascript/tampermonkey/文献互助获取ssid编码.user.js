// ==UserScript==
// @name         文献互助获取ssid编码
// @namespace    book.ucdrs
// @version      3.3.2
// @author       You
// @match        *://book.ucdrs.superlib.net/views/specific/*
// @match        *://book.ucdrs.superlib.net/search*
// @match        *://book.ly.superlib.net/bookDetail.jsp*
// @match        *://book.ly.superlib.net/search*
// @require      https://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @copyright    wxhzssid
// @description  可以直接显示文献的ssid号，读秀超星龙岩全国图书馆参考联盟，可获取文献440W册目前全网库存最多。（手机无法按照插件的访问：http://106.54.95.178/xunsearch）
// @grant        GM_setValue
// @antifeature ads 脚本仅显示ssid号如需获取文件会跳转第三方广告页面。
// ==/UserScript==

const BookQueryUrl = "http://121.5.69.234:8099/goods/";
const ConfuseQueryUrl = "http://106.54.95.178/blog/first-category/ssi";
const innerHTML = String(document.getElementsByTagName("html")[0].innerHTML);
mainTask();
function mainTask() {
  if (location.href.includes("book.ucdrs.superlib.net")) {
    if (location.href.includes("/views/specific/")) {
      let m = $("script:contains(send_requestajax)")
        .text()
        .match(/ssn=(\d{3,})/);
      if (m) {
        $("div.tubookimg>img:only-child").after(getAddBtn(m[1]));
      } else if ((m = location.href.match(/dxNumber=(\d+)/))) {
        $("div.tubookimg>img:only-child").after(getAddBtn(m[1], "疑难查询"));
      }
    } else if (location.href.includes("/search")) {
      $('td[id="b_img"]').each((i, el) => {
        let ssid = $(el).parent("tr").find('input[name*="ssid"]').val();
        if (ssid) {
          $(el).after(getAddBtn(ssid));
        } else if (
          (ssid = $(el)
            .find("a[href]")
            .attr("href")
            .match(/dxNumber=(\d+)/))
        ) {
          $(el).after(getAddBtn(ssid[1], "疑难查询"));
        }
      });
    }
  }


  else if (location.href.includes("book.ly.superlib.net")) {
    jQuery(mainTask2);
  }
}

function getAddBtn(ssid, name) {
  return `<p style="font-family: Verdana; color: red; font-size: 15px; font-weight: bold; text-align: center; margin-top: 5px; margin-bottom: 5px;">${ssid}</p>
<p style="text-align: center;"><a href="${
    name ? ConfuseQueryUrl : BookQueryUrl
  }${ssid}" target="_blank" style="color: blue; font-size: 15px; font-weight: bold; text-decoration: none;">${
    name || "文献查询"
  }</a>
</p>`;
}

handleJsonp = (data) => {
  if (data && data.ssid && !localStorage.bookSsid.includes(data.ssid + ",")) {
    localStorage.bookSsid += data.ssid + ",";
  }
};

if (typeof localStorage.bookSsid === "undefined") localStorage.bookSsid = "";

if (location.href.includes("/views/specific/")) {
  setTimeout(pick, 1000);
} else if (location.href.includes("/search")) {
  setTimeout(batchUpload, 1000);
}

async function batchUpload() {
  let $img = $('td[id="b_img"]');
  for (let i = 0; i < $img.length; i++) {
    let ssid = $img.eq(i).parent("tr").find('input[name*="ssid"]').val();
    if (ssid) {
      let url = $img.eq(i).find('a[href^="/views/specific/"]').attr("href");
      if (url) {
        try {
          await pick(location.origin + url, ssid);
        } catch (e) {
          //console.log(e);
        }
      }
    }
  }
}

async function pick(url, ssid) {
  let obj = await getBookInfo(url, ssid);
  if (!obj) return;
  return $.ajax({
    url: "http://106.54.95.178:8200/?" + urlEncode(obj),
    dataType: "jsonp",
    jsonpCallback: "handleJsonp",
  });
}

function getInfoArea(url) {
  return fetch(url)
    .then((r) => r.text())
    .then((text) => {
      let index = text.indexOf('<div class="leftnav_tu">');
      if (index > -1) {
        return $(text.substr(index, 28000)).filter("div.leftnav_tu");
      }
      return null;
    });
}

async function getBookInfo(url, ssid) {
  let $area;
  if (url) {
    if (localStorage.bookSsid.includes(ssid + ",")) {
      return null;
    }
    $area = await getInfoArea(url);
    if (!$area || !$area.length === 0) return null;
  } else {
    $area = document.body;
    url = location.href;
    ssid = $("script:contains(send_requestajax)")
      .text()
      .match(/ssn=(\d{3,})/);

    if (!ssid) return;
    ssid = ssid[1];

    if (localStorage.bookSsid.includes(ssid + ",")) {
      return null;
    }
  }

  let obj = {};
  obj.ssid = ssid;
  let $dd = $("div.tubox>dl>dd", $area);
  let ssn = url.match(/dxNumber=(\d+)/);
  if (ssn) obj.ssn = ssn[1];
  obj.name = $("div.tutilte", $area).text().trim();
  obj.pic = $("div.tubookimg>img", $area).attr("src");
  for (let i = 0; i < $dd.length; i++) {
    let m,
      t = $dd
        .eq(i)
        .text()
        .trim()
        .replace(/['"]/g, (m) => `\\` + m);
    if ((m = t.match(/【作　者】\s*(.+)/))) {
      obj.author = m[1].trim();
    } else if ((m = t.match(/【形态项】\s*(.+)/))) {
      obj.category = m[1].trim();
    } else if ((m = t.match(/【出版项】\s*(.+)/))) {
      obj.public = m[1].trim();
    } else if ((m = t.match(/【ISBN号】\s*([0-9\-]+)/))) {
      obj.isbn = m[1].trim();
    } else if ((m = t.match(/【丛书名】\s*(.+)/))) {
      obj.series = m[1].trim();
    }
  }
  return obj;
}

function urlEncode(obj) {
  return Array.isArray(obj)
    ? obj.map((o) => urlEncode(o)).join("&")
    : Object.keys(obj)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
        )
        .join("&");
}

function mainTask2() {
  if (location.href.includes("book.ly.superlib.net/search")) {
    var html_target = $("div.divImg");
    html_target.each((index, element) => {
      element.style = "z-index:999";
    });
    html_target.append((index) => {
      var href;
      if ($(`[name='f[${index}].ssid']`)[0].value)
        href = BookQueryUrl + $(`[name='f[${index}].ssid']`)[0].value;
      else href = ConfuseQueryUrl + $(`[name='f[${index}].dxid']`)[0].value;

      return `<div style="width: 110px;text-align: center"><a href="${href}" style="color: blue;font-size: 16px;">文献查询</a></div>`;
    });
  } else {
    var html_target1 = $("dd.bnt_content");
    var html_target2 = $("div.card_pic");
    if (html_target1.length)
      html_target1.append(
        `<a href="${
          BookQueryUrl + innerHTML.match(/ssn=(\d+)/)[1]
        }" class="bnt_book leftF" style="color: red;">文献查询</a>`
      );
    else if (html_target2.length)
      html_target2.append(
        `<a href=${
          ConfuseQueryUrl + location.href.match(/dxNumber=(\d+)/)[1]
        } style="color: blue;font-size: 16px">文献查询</a>`
      );
  }
}
