// ==UserScript==
// @name         Bangumi Deleted Post Alpha
// @version      0.0.5
// @description  Why you delete it!
// @updateURL https://openuserjs.org/meta/gyakkun/Bangumi_Deleted_Post_Alpha.meta.js
// @downloadURL https://openuserjs.org/install/gyakkun/Bangumi_Deleted_Post_Alpha.user.js
// @copyright gyakkun
// @include     /^https?:\/\/(((fast\.)?bgm\.tv)|chii\.in|bangumi\.tv)\/(group|subject)\/topic\/*/
// @include     /^https?:\/\/(((fast\.)?bgm\.tv)|chii\.in|bangumi\.tv)\/(ep|character|person)\/*/
// @license MIT
// ==/UserScript==

(function () {
    const SPACE_TYPE = document.location.pathname.split("/")[1]
    const BA_DP_API_URL = "https://bgm.nyamori.moe/forum-enhance/deleted_post"
    const SPACE_ACTION_BUTTON_WORDING = "查看删除内容"

    attachActionButton()
    registerOnClickEvent()

    function getTopicId() {
        let pathSplitArr = document.location.pathname.split("/")
        let last = pathSplitArr[pathSplitArr.length - 1]
        last = last.split(/[^0-9]/)[0]
        return last
    }

    function getPostDivList() {
        return $("div[id^='post_'")
    }

    function getPostDiv(pid) {
        return $(`div[id^='post_${pid}'`).first()
    }

    function getUsernameAndPidOfPostDiv(postDiv) {
        return {
            username: postDiv.attr("data-item-user"),
            postId: parseInt(postDiv.attr("id").substring("post_".length))
        }
    }

    function drawActionButton(username, postId) {
        return `
        <div class="action">
            <a href="javascript:void(0);" class="icon" title="${SPACE_ACTION_BUTTON_WORDING}">
                <span data-dropped="false" class="ico" id="ba-deleted-post-action-btn-${postId}-${username}" style="text-indent: 0px">👁</span><span class="title">${SPACE_ACTION_BUTTON_WORDING}</span>
            </a>
        </div>
        `
    }

    function attachActionButton() {
        getPostDivList().each(function () {
            let that = $(this)
            let { username, postId } = getUsernameAndPidOfPostDiv(that)
            console.debug(`${username} - ${postId}`)
            let contentDiv = getContentDivFromPostDiv(that)
            if (!!!contentDiv) return
            if (!judgeDelete(contentDiv.html())) return
            console.debug(`[ba_dp] html: ${contentDiv.html()}`)
            that.find("div.post_actions.re_info > div:nth-child(1)").first().after(
                drawActionButton(username, postId)
            )
        })
    }

    function getContentDivFromPostDiv(postDiv) {
        let inner = postDiv.find("div.inner")
        if (inner.length == 0) return null
        let reply = inner.first().find("div.reply_content > div.message")
        let subReply = inner.first().find("div.cmt_sub_content")
        if (reply.length == 0 && subReply.length == 0) return null
        if (reply.length > 0) {
            let theReply = reply.first()
            return theReply
        } else {
            let theSubReply = subReply.first()
            return theSubReply
        }
    }

    function judgeDelete(html) {
        if (!!!html.match(/<span class="tip/)) return false
        if (html.indexOf("内容已被用户删除") != -1) return true
        if (html.indexOf("删除了回复") != -1) return true
        if (html.indexOf("违反") != -1 && html.indexOf("被删除") != -1) return true
        return false
    }

    function registerOnClickEvent() {
        $("span[id^='ba-deleted-post-action-btn-'").each(function () {
            let that = $(this)
            let pid = that.attr("id").split("-")[5]
            let username = that.attr("id").split("-")[6]
            that.click(async () => {
                if (that.attr("data-dropped") === "false") {
                    that.html("*")
                    await getDeletedPost(pid)
                    that.html("※")
                    that.attr("data-dropped", "true")
                }
            })
        })
    }

    async function getDeletedPost(postId) {
        let type = SPACE_TYPE
        let topicId = getTopicId()
        let postDiv = getPostDiv(postId)
        let contentDiv = getContentDivFromPostDiv(postDiv)
        console.debug(`[ba_dp] contentDiv ${contentDiv.html()}`)
        console.log(`[ba_dp] ${type} - ${topicId} - ${postId}`)
        await fetch(`${BA_DP_API_URL}/${type}/${topicId}/${postId}`)
            .then(res => {
                if (res.status / 100 != 2) {
                    console.warn(`[ba_dp] status ${res.status}`)
                    return null
                }
                return res.text()
            }).then(t => {
                if(t == null) {
                    contentDiv.html("(bgm-archive 未收录)")
                    return
                }
                console.debug(`[ba_dp] ${t}`)
                postDiv.removeClass("reply_collapse")
                postDiv.removeClass("sub_reply_collapse")
                contentDiv.html(t)
            }).catch(err => {
                console.error(`[ba_dp] Exception ${err}`)
                contentDiv.html("(发生错误 请稍后再试)")
            })
    }

})();
