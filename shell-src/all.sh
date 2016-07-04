#!/bin/bash

# brew install
# bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/brew-install.sh
brew update
brew upgrade --all

# brew cask install & update
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/brew-cask.sh

# git clone & update
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/git-update.sh

# npm install -g
# bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/npm-install.sh
cnpm update -g

# svn cleanup & update
svn cleanup /Users/Bolik/百度云同步盘/SvnWork/*
# svn update /Users/Bolik/百度云同步盘/SvnWork/*
svn update /Users/Bolik/百度云同步盘/SvnWork/ChangYongWenDang
svn update /Users/Bolik/百度云同步盘/SvnWork/ELP-8000
svn update /Users/Bolik/百度云同步盘/SvnWork/KeYanGuanLi
svn update /Users/Bolik/百度云同步盘/SvnWork/SolarLib
svn update /Users/Bolik/百度云同步盘/SvnWork/WeiDianWang
svn update /Users/Bolik/百度云同步盘/SvnWork/iAuto8000
svn update /Users/Bolik/百度云同步盘/SvnWork/DianDongQiChe
svn update /Users/Bolik/百度云同步盘/SvnWork/GuZhangLuBo
svn update /Users/Bolik/百度云同步盘/SvnWork/PeiXunZiLiao
svn update /Users/Bolik/百度云同步盘/SvnWork/SourceCode
svn update /Users/Bolik/百度云同步盘/SvnWork/YuanJianKu
svn update /Users/Bolik/百度云同步盘/SvnWork/DocLib
svn update /Users/Bolik/百度云同步盘/SvnWork/GuangFuXiTong
svn update /Users/Bolik/百度云同步盘/SvnWork/Solar
svn update /Users/Bolik/百度云同步盘/SvnWork/TuZhiCangKu
# svn update /Users/Bolik/百度云同步盘/SvnWork/bdzics8000
