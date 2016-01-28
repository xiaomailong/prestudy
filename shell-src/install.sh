#!/bin/bash

# JavaScript Web云平台OS.js
curl -sS http://os.js.org/installer | sh

# Homebrew OS X 不可或缺的套件管理器
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1
# homebrew-cask
brew tap phinze/homebrew-cask && brew install brew-cask
