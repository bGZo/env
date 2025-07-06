@echo off

pwsh -WorkingDirectory %~dp0 -Command "Start-Process -Verb RunAs pwsh.exe '-NoExit -ExecutionPolicy Bypass -File "%~dp0\scripts\sudo-firewall.ps1""'"
