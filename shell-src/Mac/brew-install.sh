#!/bin/bash

# brew update
brew update

# homebrew-cask
# brew tap phinze/homebrew-cask && brew install brew-cask

# bash-completion
brew install bash-completion
brew tap homebrew/completions
# add to ~/.bash_profile
# if [ -f $(brew --prefix)/etc/bash_completion ]; then
# . $(brew --prefix)/etc/bash_completion
# fi

# Aria2 是 Mac/Linux 下一个不错的高速下载工具。
# 由于它具有分段下载引擎，所以支持从多个地址或者从一个地址的多个连接来下载同一个文件。
# 这样自然就大大加快了文件的下载速度。
# aria2 也具有断点续传功能，这使你随时能够恢复已经中断的文件下载。
# 除了支持一般的 http(s) 和 ftp 协议外，aria2 还支持 BitTorrent 协议。
# 这意味着，你也可以使用 aria2 来下载 torrent 文件。
# brew install aria2

# Archey for OS X 命令行中显示计算机的基本信息
# brew install archey

brew install wget
# brew install curl

# python
# brew install python
# brew install python3
brew install python numpy scipy matplotlib

# brew install ruby

# brew install tmux

# Wine是一个非常伟大的项目，能够让用户在Linux、Mac设备上运行Windows应用程序。
brew cask install xquartz
brew install wine
brew install geckodriver
brew install gtkglext

brew install cvs
brew install subversion
brew install colorsvn
brew install git
brew install hg

# Convert text between DOS, UNIX, and Mac formats
brew install dos2unix

# brew install flow

# GCC 是 GNU 编译器套件（GNU Compiler Collection）
# 包括 C、C++、Objective-C、Fortran、Java、Ada 和 Go 语言的前端，
# 也包括了这些语言的库（如 libstdc++、libgcj 等等）。
# brew install gcc
brew install gdb
brew install cmake
# LLVM
# brew install llvm
# brew install --with-clang --with-lldb llvm
# brew install cmake pkg-config boost homebrew/x11/gtksourceviewmm3 aspell clang-format
# brew install qt
# brew install qt5

brew install go

# brew install docker

# brew install maven

# mysql
# brew install mysql
# MyCli 是一个 MySQL 命令行工具，支持自动补全和语法高亮。也可用于 MariaDB 和 Percona。
#
# brew install mycli
# brew install postgresql

brew install node
brew install yarn

# Pidgin 流行的跨平台即时通讯软件
# brew install pidgin

# brew install phantomjs


# brew upgrade
brew upgrade --all

# There is a cross-platform flock command here:
# https://github.com/discoteq/flock
# Is there a flock command on Mac OS X that manages file lock?
# brew tap discoteq/discoteq
# brew install flock

 brew install apr geckodriver libpng nettle subversion apr-util git libtasn1 node webp colorsvn gmp libtiff openssl wget cvs gnutls libtool pandoc wine dos2unix go libusb pkg-config xz fontconfig jasper libusb-compat python freetype jpeg little-cms2 readline gd libgphoto2 makedepend sane-backends gdbm libicns mercurial sqlite net-snmp --force
