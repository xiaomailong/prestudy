#!/bin/bash

# apm update -y

# brew install
# bash /Volumes/Work/OpenSource/WaterBolik/prestudy/shell-src/brew-install.sh
brew update
brew upgrade --all

# brew cask install & update
bash /Volumes/Work/OpenSource/WaterBolik/prestudy/shell-src/brew-cask.sh

# git clone & update
bash /Volumes/Work/OpenSource/WaterBolik/prestudy/shell-src/git-update.sh

# npm install -g
# bash /Volumes/Work/OpenSource/WaterBolik/prestudy/shell-src/npm-install.sh
cnpm update -g

# svn cleanup & update
svn cleanup /Volumes/Work/百度云同步盘/SvnWork/*
# svn update /Volumes/Work/百度云同步盘/SvnWork/*
svn update /Volumes/Work/百度云同步盘/SvnWork/ChangYongWenDang
svn update /Volumes/Work/百度云同步盘/SvnWork/ELP-8000
svn update /Volumes/Work/百度云同步盘/SvnWork/KeYanGuanLi
svn update /Volumes/Work/百度云同步盘/SvnWork/SolarLib
svn update /Volumes/Work/百度云同步盘/SvnWork/WeiDianWang
svn update /Volumes/Work/百度云同步盘/SvnWork/iAuto8000
svn update /Volumes/Work/百度云同步盘/SvnWork/DianDongQiChe
svn update /Volumes/Work/百度云同步盘/SvnWork/GuZhangLuBo
svn update /Volumes/Work/百度云同步盘/SvnWork/PeiXunZiLiao
svn update /Volumes/Work/百度云同步盘/SvnWork/SourceCode
svn update /Volumes/Work/百度云同步盘/SvnWork/YuanJianKu
svn update /Volumes/Work/百度云同步盘/SvnWork/DocLib
svn update /Volumes/Work/百度云同步盘/SvnWork/GuangFuXiTong
svn update /Volumes/Work/百度云同步盘/SvnWork/Solar
svn update /Volumes/Work/百度云同步盘/SvnWork/TuZhiCangKu
# svn update /Volumes/Work/百度云同步盘/SvnWork/bdzics8000
