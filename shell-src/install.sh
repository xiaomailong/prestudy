#!/bin/bash

# JavaScript Web云平台OS.js
curl -sS http://os.js.org/installer | sh

# Meteor —— Full stack JavaScript for amazing apps
curl https://install.meteor.com | /bin/sh

# Voltron 是一款不错的调试器图形化前端，目前支持 LLDB、GDB、VDB、WinDbg 等调试器。
# 其内置视图包括寄存器、反汇编、堆栈、内存、断点、回溯等等。利用 Voltron 的帮助，可以改善调试器的用户体验。
# Voltron 使用 Python 编写而成，支持 x86、x86_64、arm 等架构，可在 Linux、Mac OS X、Windows 上运行。
# pip install --upgrade pip setuptools
pip install voltron

# Homebrew OS X 不可或缺的套件管理器
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1
# homebrew-cask
brew tap phinze/homebrew-cask && brew install brew-cask

# Mac App Store下载最新版的Xcode，然后使用下面的命令安装Xcode command line tools，
# 这将为你安装很多终端下面常用的命令，将来很可能会使用到：
xcode-select --install
