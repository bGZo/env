
function Open-Web{
    Param($browser, $pages)
    foreach($page in $pages){
        start $browser $page
    }
}

function Main{
    $browser='C:\Program Files (x86)\Microsoft\Edge Dev\Application\msedge.exe';
    $pages=@(
        '"https://aclash.bgzo.cc/"',                    #YCAD
        '"https://oi-wiki.org"',
        '"https://leetcode.cn/problemset/all/"',
        '"https://duolingo.com/"'
    )

    # Open web page
    Open-Web $browser $pages

}

Main
pause