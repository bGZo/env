@echo off

chcp 65001

set scriptPath="%~dp0\scripts\ads.ps1"

pwsh "%~dp0\scripts\ads.ps1"

pause
