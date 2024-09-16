# Ready for Windows
## Package management
>[!IMPORTANT] 
`winget` is required by following command.

### Import `scoop`
* Move scoop folder under ~
* run `install-scoop.bat`
* run following command with admin permissions
```bash
$ scoop reset *
```


## Components build-in
### Remove: Ads 
Run `ads.bat` to download.

### Remove: Packages

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

### Replace: Search
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

### Disable: Windows Update

TODO

### Disable: Sticky keys

TODO



### Option: Font Render

* ClearType build-in

* MacType
  ````sh
  $ winget install MacType.MacType
  ````

* Replace Fonts

## Laptop Option

### Processor performance boost mode

Run <code>process-boost.bat</code>, then go `powercfg.cpl` to disable boost it. If you are using windows 11, you could use the `EnergyStar` meanwhile.

```bash
$ winget install 9NF7JTB3B17P
```

## Customized

### Install Runtime Dependencies

```bash
# C++
$ winget install Microsoft.VCRedist.2010.x64
$ winget install Microsoft.VCRedist.2012.x64
$ winget install Microsoft.VCRedist.2013.x64
$ winget install Microsoft.VCRedist.2015+.x64
```

### Coding: Case Sensitive

```shell
# Windows
$ fsutil.exe file setCaseSensitiveInfo ~\workspaces enable
# Git
$ git config core.ignorecase false 
```

### Chinese Flypy Support

Run `install-flypy.bat`

### Proxy
https://github.com/bGZo/proxy


## References

* https://github.com/xM4ddy/OFGB ![](https://img.shields.io/github/stars/xM4ddy/OFGB)
* https://github.com/srwi/EverythingToolbar ![](https://img.shields.io/github/stars/srwi/EverythingToolbar)
* https://v2ex.com/t/1048191
* https://v2ex.com/t/1048191
* https://www.youtube.com/watch?v=iWBVtXPfTB0
* https://stackoverflow.com/questions/70735284
* https://superuser.com/questions/1684005
* https://www.zhihu.com/question/443835000/answer/1726902348
* https://answers.microsoft.com/en-us/windows/forum/all/how-to-permanently-stop-the-widgets-service-from/de082ed2-81db-4074-a334-0c9ca13f15c4
* https://stackoverflow.com/questions/70735284
* https://juejin.cn/post/7135422871735631902
* https://www.xttblog.com/?p=5294
