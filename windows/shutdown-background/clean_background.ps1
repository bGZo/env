$my_tasks = @(
  ############################################# Windows Service
  "Antimalware Service Executable",
  "BingSvc.exe",
  "BattMonSVC.exe",                           # BattMonUI
  "crashpad_handler.exe",                     # IDGAF
  "DTShellHlp.exe",                           # DAEMON Tools Lite
  "OriginWebHelperService.exe",               # Game/Origin
  "gamingservices.exe",
  "gamingservicesnet.exe",
  "Widgets.exe",
  "WidgetService.exe",
  "SystemOptimizer.exe",
  "SearchHost.exe",
  "msedge.exe",
  "msedgewebview2.exe",
  "RuntimeBroker.exe",


  ############################################# * Analytics Client
  "TouchpointAnalyticsClientService.exe",


  ############################################# HP Background
  "OmenCommandCenterBackground.exe",


  ############################################# User Task
  "AppleMobileDeviceService.exe",             # * Apple
  "yundetectservice.exe"                      # BaiduYun
  "Steam++.exe",                              # Watt Toolkit
  "kdeconnectd.exe",                          # KDE connect
  "kdeconnect-indicator.exe",                 # KDE connect GUI
  "ATService.exe",                            # AnyText
  "Everything.exe",                           # Everything
  "°×Ãè×ÀÃæ°æ.exe",
  "DTShellHlp.exe",
  "DiscSoftBusServiceLite.exe",
  "NVIDIA Web Helper.exe"

)

for ($i=0; $i -lt $my_tasks.Length; $i++) {
  taskkill /F /im  $my_tasks[$i]
}

# Stop-Service -Name
pause