#!/bin/bash

# brew install
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/brew-install.sh

# brew cask install & update
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/brew-cask.sh

# git clone & update
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/git-update.sh

# npm install -g
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/npm-install.sh

# svn cleanup & update
svn cleanup /Users/Bolik/Work/SvnWork/*
svn update /Users/Bolik/Work/SvnWork/*
