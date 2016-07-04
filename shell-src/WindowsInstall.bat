@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

choco upgrade chocolatey


choco install vcredist2005
 -y
choco install vcredist2008 -y
choco install vcredist2010 -y
choco install vcredist2012 -y
choco install vcredist2013 -y
choco install vcredist2015 -y

choco install dotnet3.5 -y
choco install dotnet4.0 -y
choco install dotnet4.6 -y

choco install jdk6 -y

choco install jdk7 -y

choco install jdk8 -y


choco install flashplayerplugin -y
choco install flashplayeractivex -y



choco install k-litecodecpackmega -y

choco install googlechrome -y
choco install firefox -y
choco install opera -y

choco install cmder -y
choco install totalcommander -y
choco install sysinternals -y
choco install rapidee -y
choco install 7zip -y
choco install autohotkey -y
choco install everything -y

choco install teamviewer -y

choco install nodejs -y



choco install ruby -y
choco install ruby2.devkit -y
choco install python2 -y
choco install pip -y



choco install atom -y


choco install sourcetree -y
choco install tortoisesvn -y


choco install ynote -y

choco install picasa -y

@echo off
echo    Press any key to exit ...
Pause>nul
echo on
exit
