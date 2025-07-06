$servicesToDisable = @(
  "WSearch", 
  "DtsApo4Service"
)

foreach ($service in $servicesToDisable) {
    # 获取服务状态
    $svc = Get-Service -Name $service -ErrorAction SilentlyContinue
    
    if ($null -ne $svc) {
        # 停止服务
        if ($svc.Status -ne 'Stopped') {
            Write-Host "Stopping service: $service"
            Stop-Service -Name $service -Force
        }
        
        # 设置服务启动类型为禁用
        Write-Host "Disabling service: $service"
        Set-Service -Name $service -StartupType Disabled
    } else {
        Write-Host "Service $service not found!"
    }
}