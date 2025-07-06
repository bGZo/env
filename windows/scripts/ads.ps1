# 设置下载的目标目录
$distDir = "dist"

# 确保 dist 目录存在
if (-not (Test-Path -Path $distDir)) {
    # New-Item -Path $distDir -ItemType Directory
    mkdir $distDir
}

if (-not $distDir) {
    Write-Host "Error: \$distDir is null or empty!"
    exit
}

$fileUrl = "https://github.com/xM4ddy/OFGB/releases/download/v0.4/OFGB-Deps.exe"
$fileName = "OFGB-Deps.exe"
$destinationPath = Join-Path -Path $distDir -ChildPath $fileName

# 确保 dist 目录存在
if (-not (Test-Path -Path $distDir)) {
    New-Item -Path $distDir -ItemType Directory
}

# 默认代理地址
$defaultProxy = "http://127.0.0.1:7890"

# 询问用户是否使用代理
$useProxy = Read-Host "是否需要使用代理下载文件? (y/n)"

# 判断是否使用代理
if ($useProxy -eq "y") {
    # 询问用户是否使用默认代理地址
    $proxyAddress = Read-Host "是否使用默认代理地址 $defaultProxy? (y/n)"
    if ($proxyAddress -eq "y") {
        $proxy = $defaultProxy
    } else {
        # 用户提供自定义代理地址
        $proxy = Read-Host "请输入自定义代理地址"
    }

    # 设置代理并下载文件
    $webClient = New-Object System.Net.WebClient
    $webClient.Proxy = New-Object System.Net.WebProxy($proxy)
    $webClient.DownloadFile($fileUrl, $destinationPath)
    Write-Host "文件已通过代理下载到 $distDir 目录"
} else {
    # 直接下载文件，不使用代理
    Invoke-WebRequest -Uri $fileUrl -OutFile $destinationPath
    Write-Host "文件已下载到 $distDir 目录"
}
