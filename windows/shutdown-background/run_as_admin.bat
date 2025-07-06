@ECHO OFF

SET MYPATH=%~dp0
SET MYSCRIPT=%MYPATH%\clean_background.ps1

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& {Start-Process PowerShell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File ""%MYSCRIPT%""' -Verb RunAs}"