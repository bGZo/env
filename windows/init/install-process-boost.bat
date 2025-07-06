:: via: https://www.reddit.com/r/AMDHelp/comments/es0d4a/how_exactly_do_you_disable_pbo/
:: via: https://www.youtube.com/watch?v=iWBVtXPfTB0
@echo off
rem  set __COMPAT_LAYER=RunAsInvoker
REGEDIT.EXE  /S  "%~dp0\scripts\boost.reg"

if %ERRORLEVEL%==0 (
  echo Registration successful.
) else (
  echo Registration failed. Please check your .reg file.
)

pause
