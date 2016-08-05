@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/update.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

choco upgrade chocolatey

choco update vcredist2005 -y
choco update vcredist2008 -y
choco update vcredist2010 -y
choco update vcredist2012 -y
choco update vcredist2013 -y
choco update vcredist2015 -y

REM choco update dotnet3.5 -y
REM choco update dotnet4.0 -y
REM choco update dotnet4.6 -y

REM choco update jdk7 -y
REM choco update jdk8 -y

choco update flashplayerplugin -y
choco update flashplayeractivex -y

choco update 7zip -y

REM choco update k-litecodecpackmega -y

REM choco update googlechrome -y
REM choco update firefox -y
REM choco update opera -y

choco update cmder -y
choco update totalcommander -y
choco update sysinternals -y

REM choco update rapidee -y
REM choco update autohotkey -y

choco update everything -y

REM choco update teamviewer -y

REM choco update nodejs -y

REM choco update ruby -y
REM choco update ruby2.devkit -y
REM choco update python2 -y
REM choco update pip -y

REM choco update atom -y

REM choco update sourcetree -y

choco update tortoisesvn -y

REM choco update ynote -y

REM choco update picasa -y

@echo off
echo    Press any key to exit ...
Pause>nul
echo on
exit
