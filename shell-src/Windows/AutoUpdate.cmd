@echo off

apm upgrade -c false

REM chocolatey upgrade
choco upgrade all -y

REM svn update
REM svn update B:/SvnWork/ChangYongWenDang
REM svn update B:/SvnWork/DocLib
REM svn update B:/SvnWork/GuangFuXiTong
REM svn update B:/SvnWork/GuiDaoJiaoTong
REM svn update B:/SvnWork/KeYanGuanLi
REM svn update B:/SvnWork/PeiXunZiLiao
REM svn update B:/SvnWork/Solar
REM svn update B:/SvnWork/SolarLib
REM svn update B:/SvnWork/SourceCode
REM svn update B:/SvnWork/WeiDianWang
REM svn update B:/SvnWork/TuZhiCangKu

echo Press any key to exit ...
Pause>nul
echo on
exit
