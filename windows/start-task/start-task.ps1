Set-PSDebug -Trace 0

function Open-Applications{
    Param($data)
    $Applications=$data | sort-object -Property priority
    foreach($Application in $Applications){
        if($Application.isUWP -eq 'y'){
            $name=$Application.name
            start "shell:AppsFolder\$(Get-StartApps $name | select -ExpandProperty AppId | sort -Unique)"
            ## start -FilePath  $i
            # via https://stackoverflow.com/questions/46893260/how-to-start-a-universal-windows-app-uwp-from-powershell-in-windows-10
        }else{
            $path=$Application.path
            start $path
        }
    }
}

function Open-Web{
    Param($browser, $pages)
    foreach($page in $pages){
        start $browser $page
    }
}

function Open-Proxies{
    pwsh-preview $clash_path\update_rss.ps1
    clash -d $clash_path
}

function Main{
    $browser='C:\Program Files (x86)\Microsoft\Edge Dev\Application\msedge.exe';
    $clash_path='E:\OneDrive\workspace\proxy'
    $apps=@(
        @{name='Traffic Monitor';isUWP='n';priority=1;path='C:\Users\15517\bin\TrafficMonitor\TrafficMonitor.exe'},
        @{name='Logseq';isUWP='n';priority=1;path='C:\Users\15517\scoop\apps\logseq\current\Logseq.exe'},
        @{name='Anki';isUWP='n';priority=1;path='C:\Users\15517\scoop\apps\anki\current\anki.cmd'},
        @{name='Billfish';isUWP='n';priority=1;path='C:\Program Files\Billfish\Billfish\Billfish.exe'},
        @{name='qBitorrant';isUWP='n';priority=1;path='C:\Program Files\qBittorrent\qbittorrent.exe'},
        @{name='白描桌面版';isUWP='n';priority=1;path='C:\Program Files\白描桌面版\白描桌面版.exe'},
        @{name='Spotify';isUWP='y';priority=0;}
        
    )
    $pages=@(
        '"https://aclash.bgzo.cc/"',
        '"https://oi-wiki.org"',
        '"https://leetcode.cn/problemset/all/"',
        '"https://duolingo.com/"'
    )
    # Open app
    Open-Applications $apps
    # Open web page
    Open-Web $browser $pages
    #Open proxies
    Open-Proxies
}

Main
pause