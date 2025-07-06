@ECHO OFF

SET MYPATH=E:\OneDrive\dev\script\clean_windows_background\
SET MYSCRIPT=%MYPATH%clean_background.ps1

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& '%MYSCRIPT%'";

pause