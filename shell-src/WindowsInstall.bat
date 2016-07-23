@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

choco upgrade chocolatey

rem VC运行时
choco install vcredist2005 -y
choco install vcredist2008 -y
choco install vcredist2010 -y
choco install vcredist2012 -y
choco install vcredist2013 -y
choco install vcredist2015 -y

rem .Net
choco install dotnet3.5 -y
choco install dotnet4.0 -y
choco install dotnet4.6 -y

rem jdk
choco install jdk7 -y
choco install jdk8 -y

rem flash
choco install flashplayerplugin -y
choco install flashplayeractivex -y

rem choco install wsus-offline-update -y

rem choco install k-litecodecpackmega -y

rem 浏览器安装
rem choco install googlechrome -y
rem choco install firefox -y
rem choco install opera -y

choco install cmder -y
choco install totalcommander -y
choco install sysinternals -y
choco install rapidee -y
choco install 7zip -y
choco install autohotkey -y
choco install everything -y

choco install honeyview -y
choco install teamviewer -y

choco install nodejs -y

choco install ruby -y
choco install ruby2.devkit -y
choco install python2 -y
choco install pip -y

choco install atom -y

choco install visualstudiocode -y

choco install sourcetree -y
choco install tortoisesvn -y

choco install ynote -y

choco install picasa -y

@echo off
echo    Press any key to exit ...
Pause>nul
echo on
exit
