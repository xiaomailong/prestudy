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
choco install dotnet3.5 -y
choco install dotnet4.0 -y
choco install dotnet4.5.2 -y
choco install dotnet4.6.1 -y

echo Java JDK & JRE
REM choco install jdk7 -y
REM choco install jre8 -y
REM choco install jdk8 -y
REM choco install jre8 -y

echo Flash & Media & Picture
REM choco install flashplayerplugin -y
REM choco install flashplayeractivex -y
REM choco install k-litecodecpackmega -y
REM choco install mpc-hc -y
REM choco install picasa -y
REM choco install itunes -y

echo Reader
REM choco install foxitreader
REM choco install calibre -y
REM choco install winmerge -y
REM choco install beyondcompare -y

echo Editor
REM choco install pandoc -y
REM choco install markdownpad2 -y

echo Browser
REM choco install ie11 -y
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
choco install powershell -y
REM choco install winrar -y
REM choco install everything -y
REM choco install teamviewer -y
choco install chocolateygui -y
REM choco install cpu-z -y
REM choco install gpu-z -y
REM choco install crystaldiskmark -y

echo Version Control
REM choco install tortoisesvn -y
REM choco install sourcetree -y

echo Ruby & Python
REM choco install ruby -y
REM choco install ruby2.devkit -y
REM choco install python2 -y
REM choco install python -y
REM choco install pip -y

echo Develop Tools
REM choco install nodejs -y
REM choco install phantomjs -y
REM choco install atom -y
REM choco install visualstudiocode -y
REM choco install microsoft-build-tools -y
REM choco install visualstudio2015enterprise -y
REM choco install resharper -y
REM choco install nuget.commandline -y
REM choco install fiddler -y
REM choco install innosetup -y
REM choco install cmake -y
REM choco install android-sdk -y
REM choco install tomcat -y
REM choco install scala -y

echo Docker & Virtual Environment
REM choco install docker -y
REM choco install virtualbox -y
REM choco install vagrant -y

echo Linux Tools
REM choco install winscp -y
REM choco install mingw -y
REM choco install cygwin -y
REM choco install winpcap -y

echo Database
REM choco install mysql -y
REM choco install mysql.workbench -y
REM choco install postgresql -y
REM choco install mongodb -y
REM choco install sqlite -y
REM choco install mariadb -y
REM choco install redis -y

echo Note
REM choco install ynote -y
REM choco install xmind -y

echo Skype
REM choco install skype -y

echo    Press any key to exit ...
Pause>nul
echo on
exit
