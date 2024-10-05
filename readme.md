# Ready for Windows
## Package management
>[!IMPORTANT] 
`winget` is required by following command.
Luckily, `winget` has supported for proxy, with unstable network.[^proxy_winget]. So Choose one way to use proxy:

```bash
# Set Proxy for winget
$ sudo winget settings --enable ProxyCommandLineOptions
# Temporary
$ winget --proxy http://127.0.0.1:10800 install 
# Permanent
$ winget settings set DefaultProxy https://127.0.0.1:2345
# Cancel permanent
$ winget settings reset DefaultProxy
```


### Import `scoop`
* Move scoop folder under ~
* run `install-scoop.bat`
* run following command with admin permissions
```bash
$ scoop reset *
# Set Proxy for scoop, via https://github.com/ScoopInstaller/Scoop/wiki/Using-Scoop-behind-a-proxy
$ scoop config proxy 127.0.0.1:10800
```


## Components build-in
### Remove: Ads  ![https://github.com/xM4ddy/OFGB ](https://img.shields.io/github/stars/xM4ddy/OFGB)
Run `ads.bat` to download. depend -> 

### Remove: Packages [^uninstall-garbage]
```bash
$ winget uninstall "windows web experience pack"
$ winget uninstall "电脑管家"
$ winget uninstall "资讯"
```

### Replace: Powershell
```shell
#Powershell 7
$ winget install --id Microsoft.PowerShell
```

### Replace: Search ![https://github.com/srwi/EverythingToolbar](https://img.shields.io/github/stars/srwi/EverythingToolbar)
```shell
# EverythingToolbar 
$ winget install stnkl.EverythingToolbar
```

### Disable: Services
Run `disable-services.bat`

### Disable: Firewall
Run `disable-firewall.bat`

### Disable: Windows Defender
use `dControl`, but ([not open-source](https://www.sordum.org/9480/defender-control-v2-1/))

### Hide: Windows Security Notifications[^wsn]

Run `disable-security-notifications.reg`

### Disable: Windows Update

TODO

### Disable: Sticky keys

TODO

## Laptop Option

### Processor performance boost mode [^overheat-laptop]

Run <code>process-boost.bat</code>, then go `powercfg.cpl` to disable boost it. If you are using windows 11, you could use the `EnergyStar` meanwhile.

```bash
$ winget install 9NF7JTB3B17P
```

### Modern Standby (S0)

Check your laptop whether support S3 sleep mode:

```bash
powercfg -a
```

If shown only support S0, run `kill-s0-sleep.bat` delete sleep mode.[^windows_modern_standby]

> [!NOTE]
> If you delete sleep mode, you should select your laptop to hibernate after closing lid.

```shell
powercfg /hibernate on
```

## SubSystem

### WSL

Install WSL

```bash
$ sudo dism /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
$ wsl --set-default-version 2
$ wsl --install --no-distribution
```

> [!NOTE]
> If show `无法解析服务器的名称或地址`, just set system proxy, then retry.

Then import ubuntu[^import_export_wsl]

```bash
wsl --import ubuntu "C:\Users\bgzo\wsl\" "C:\Users\bgzo\Downloads\ubuntu.tar" --version 2
```

### WSA

TODO

## Customized

### Install Runtime Dependencies

```bash
# C++
$ winget install Microsoft.VCRedist.2010.x64
$ winget install Microsoft.VCRedist.2012.x64
$ winget install Microsoft.VCRedist.2013.x64
$ winget install Microsoft.VCRedist.2015+.x64
```

### Install Font 

install under user permission, stored in `~\AppData\Local\Microsoft\Windows\Fonts`

```shell
$ scoop bucket add nerd-fonts

# https://github.com/lxgw/LxgwWenKai
$ scoop install LXGWWenKai
$ scoop install LXGWWenKaiMono

# https://github.com/JetBrains/JetBrainsMono
$ scoop install JetBrainsMono-NF
```

Recommend you install following fonts:

- Ping Fang Font
- Noble Scarlet

### Coding: Case Sensitive [^case-sensitive]

```shell
# Windows
$ fsutil.exe file setCaseSensitiveInfo ~\workspaces enable
# Git
$ git config core.ignorecase false 
```

### Chinese: Flypy Support
Run `install-flypy.bat`

### Chinese: Font rendering
1. ClearType build-in windows.
2. Install [Noble Scarlet](https://github.com/fernvenue/microsoft-yahei)[^auto_replace_in_chinese_windows]
3. Replace with Apple PingFang using https://github.com/Tatsu-syo/noMeiryoUI

> [!NOTE]
> In 22H2 later versions, something would be wrong. via https://github.com/Tatsu-syo/noMeiryoUI/discussions/86

4. (Not recommend, cause *outdated*) MacType

````sh
$ winget install MacType.MacType
````

5. (Not recommend, cause *side effect*) Replace Fonts

### Proxy

https://github.com/bGZo/proxy


## References

[^windows_modern_standby]: via https://www.chiphell.com/thread-2460017-1-1.html to check abnormal power on count with ssd disk. more instructions you could via https://www.bilibili.com/video/BV1Pv4y1d7Ms/, solution via https://blog.csdn.net/sinat_30603081/article/details/130637807, https://www.timochan.cn/posts/any_pen/stupid_modern_standby
[^case-sensitive]: case-sensitive via https://juejin.cn/post/7135422871735631902, https://www.zhihu.com/question/443835000/answer/1726902348↩
[^uninstall-garbage]: https://superuser.com/questions/1684005/how-do-i-prevent-widgets-exe-from-getting-automatically-started-on-windows-11, https://answers.microsoft.com/en-us/windows/forum/all/how-to-permanently-stop-the-widgets-service-from/de082ed2-81db-4074-a334-0c9ca13f15c4, https://v2ex.com/t/1048191
[^overheat-laptop]: https://www.youtube.com/watch?v=iWBVtXPfTB0
[^wsn]:https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/windows-defender-security-center/wdsc-hide-notifications
[^proxy_winget]: https://github.com/microsoft/winget-cli/issues/190, https://github.com/microsoft/winget-cli/discussions/4428
[^import_export_wsl]: https://blog.csdn.net/momodosky/article/details/108102146
[^auto_replace_in_chinese_windows]: via: https://hermit.world/post/2022/01/17/refining-windows-font-rendering/, https://www.zhihu.com/question/67196637, https://v2ex.com/t/941786
