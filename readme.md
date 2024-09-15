# Ready for Windows
## Package management
>[!importent] 
`winget` is required by following command.

### Import `scoop`
* Move scoop folder under ~
* run `install-scoop.bat`
* run following command with admin permissions
```bash
scoop reset *
```


## Edit components build-in
### Ads
https://github.com/xM4ddy/OFGB  ![GitHub stars](https://img.shields.io/github/stars/xM4ddy/OFGB)

More garbage packages installed as follows:  
- Office plus via: [https://v2ex.com/t/1048191](https://v2ex.com/t/1048191)  
- WebExperience Widget, run `uninstall-widgets.bat`

### Option: Laptop 
>[!NOTE]
Considered battery duration and laptop overheat, disable `Processor performance boost mode`.

Run <code>process-boost.bat</code>, then go `powercfg.cpl` to disable boost.

### Disabled services
Run `disable-services.bat`

### Firewall
Run `disable-firewall.bat`

### Disable Windows Defender
dControl

### Font render
TODO


## Recommended others components
### Powershell 7
```shell
winget install --id Microsoft.PowerShell
```

### Search Everything ![GitHub stars](https://img.shields.io/github/stars/srwi/EverythingToolbar)
```shell
winget install stnkl.EverythingToolbar
```

## Customized
### Flypy input support 
Run `install-flypy.bat`

### Proxy
https://github.com/bGZo/proxy


## References
* https://stackoverflow.com/questions/70735284
* https://superuser.com/questions/1684005
* https://answers.microsoft.com/en-us/windows/forum/all/how-to-permanently-stop-the-widgets-service-from/de082ed2-81db-4074-a334-0c9ca13f15c4
* https://stackoverflow.com/questions/70735284