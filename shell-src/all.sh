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
svn update /Users/Bolik/百度云同步盘/SvnWork/*
