#!/bin/bash

# brew update & upgrade
brew update
brew upgrade --all

# brew cask install & update
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/brew-cask.sh

# git-update
bash /Users/Bolik/OpenSource/WaterBolik/prestudy/shell-src/git-update.sh

# svn cleanup & update
svn cleanup /Users/Bolik/Work/SvnWork/*
svn update /Users/Bolik/Work/SvnWork/*
