REM @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

choco upgrade all

choco upgrade chocolatey -y

choco install vcredist2005 vcredist2008 vcredist2010 vcredist2012 vcredist2013 vcredist2015 -y

choco install tortoisesvn -y

REM choco update dotnet3.5 -y
REM choco update dotnet4.0 -y
REM choco update dotnet4.6 -y

REM choco update jdk7 -y
REM choco update jdk8 -y

REM choco update flashplayerplugin -y
REM choco update flashplayeractivex -y

REM choco update 7zip -y

REM choco update k-litecodecpackmega -y

REM choco update googlechrome -y
REM choco update firefox -y
REM choco update opera -y

REM choco update cmder -y
REM choco update totalcommander -y
REM choco update sysinternals -y

REM choco update rapidee -y
REM choco update autohotkey -y

REM choco update everything -y

REM choco update teamviewer -y

REM choco update nodejs -y

REM choco update ruby -y
REM choco update ruby2.devkit -y
REM choco update python2 -y
REM choco update pip -y

REM choco update atom -y

REM choco update sourcetree -y

REM choco update tortoisesvn -y

REM choco update ynote -y

REM choco update picasa -y

@echo off
echo    Press any key to exit ...
Pause>nul
echo on
exit
