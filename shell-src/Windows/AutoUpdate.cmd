@echo off

apm upgrade -c false

REM chocolatey upgrade
choco upgrade all -y

REM svn update
svn update B:/SvnWork/ChangYongWenDang
svn update B:/SvnWork/DocLib
svn update B:/SvnWork/GuangFuXiTong
svn update B:/SvnWork/GuiDaoJiaoTong
svn update B:/SvnWork/KeYanGuanLi
svn update B:/SvnWork/PeiXunZiLiao
svn update B:/SvnWork/Solar
svn update B:/SvnWork/SolarLib
svn update B:/SvnWork/SourceCode
svn update B:/SvnWork/WeiDianWang
svn update B:/SvnWork/TuZhiCangKu

echo Press any key to exit ...
Pause>nul
echo on
exit
