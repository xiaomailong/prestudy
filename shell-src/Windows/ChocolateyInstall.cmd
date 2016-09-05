@echo off

echo chocolatey install
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

echo VC Runtime
choco install vcredist2005 -y
choco install vcredist2008 -y
choco install vcredist2010 -y
choco install vcredist2012 -y
choco install vcredist2013 -y
choco install vcredist2015 -y

echo .Net Framework
REM choco install dotnet3.5 -y
REM choco install dotnet4.0 -y
REM choco install dotnet4.6 -y

echo Java JDK & JRE
REM choco install jdk7 -y
REM choco install jdk8 -y

echo Flash & Media & Picture
REM choco install flashplayerplugin -y
REM choco install flashplayeractivex -y
REM choco install k-litecodecpackmega -y
REM choco install picasa -y

echo Browser
REM choco install googlechrome -y
REM choco install firefox -y
REM choco install opera -y

echo System Tools
choco install 7zip.commandline -y
choco install autohotkey.portable -y
choco install totalcommander -y
choco install cmder -y
choco install sysinternals -y
choco install rapidee -y
REM choco install everything -y
REM choco install teamviewer -y

echo Version Control
REM choco install tortoisesvn -y
REM choco install sourcetree -y

echo Ruby & Python
REM choco install ruby -y
REM choco install ruby2.devkit -y
REM choco install python2 -y
REM choco install pip -y

echo Develop Tools
REM choco install nodejs -y
REM choco install atom -y
REM choco install visualstudiocode -y

echo Docker
REM choco install docker -y

echo Linux Tools
REM choco install winscp -y
REM choco install mingw -y

echo Database
REM choco install mysql -y
REM choco install postgresql -y
REM choco install mongodb -y
REM choco install sqlite -y
REM choco install mariadb -y
REM choco install redis -y

echo Note
REM choco install ynote -y

echo    Press any key to exit ...
Pause>nul
echo on
exit
