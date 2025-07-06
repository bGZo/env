// ==UserScript==
// @name          GitHub Code Wrap
// @namespace     http://userstyles.org
// @description	  Wrap long lines of code everywhere on GitHub.
// @author        StylishThemes
// @homepage      https://userstyles.org/styles/124860
// @include       http://github.com/*
// @include       https://github.com/*
// @include       http://*.github.com/*
// @include       https://*.github.com/*
// @include       http://gist.github.com/*
// @include       https://gist.github.com/*
// @include       http://*.gist.github.com/*
// @include       https://*.gist.github.com/*
// @run-at        document-start
// @version       0.20160603180549
// ==/UserScript==
(function() {var css = [
	".blob-code-inner,",
	"  .markdown-body pre > code,",
	"  .markdown-body .highlight > pre {",
	"    white-space: pre-wrap !important;",
	"    word-break: break-all !important;",
	"    overflow-wrap: break-word !important;",
	"    display: block !important;",
	"  }",
	"  td.blob-code-inner {",
	"    display: table-cell !important;",
	"  }"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
