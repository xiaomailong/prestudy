#!/bin/bash

# JavaScript Web云平台OS.js
# curl -sS http://os.js.org/installer | sh

# Meteor —— Full stack JavaScript for amazing apps
# curl https://install.meteor.com | /bin/sh

# Voltron 是一款不错的调试器图形化前端，目前支持 LLDB、GDB、VDB、WinDbg 等调试器。
# 其内置视图包括寄存器、反汇编、堆栈、内存、断点、回溯等等。利用 Voltron 的帮助，可以改善调试器的用户体验。
# Voltron 使用 Python 编写而成，支持 x86、x86_64、arm 等架构，可在 Linux、Mac OS X、Windows 上运行。
# pip install --upgrade pip setuptools
# pip install voltron

# Homebrew OS X 不可或缺的套件管理器
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1

#  Homebrew 镜像
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
brew update

# Mac App Store下载最新版的Xcode，然后使用下面的命令安装Xcode command line tools，
# 这将为你安装很多终端下面常用的命令，将来很可能会使用到：
xcode-select --install

# gitsome：非常棒的 Git/Shell 自动补全工具
# gitsome 不仅能够为你补全 Git 命令、选项、分支、标签，而且也支持补全 Shell 命令、文件、目录、环境变量、manpages 等。
# 甚至更好的是，gitsome 还集成了对于 GitHub 的支持，这样你不用在命令行与浏览器之间进行切换便可完成各种操作。
# gitsome 所具有的类似 Fish 的自动建议用起来十分方便，此外，它也包含命令历史，以及可定制语法着色等其他特色。
# gitsome 使用 Python 编写，只需通过 pip 即可安装：
# pip3 install gitsome
# 与 GitHub 集成使用前，需先按提示配置：
# gh configure
# 执行
# gitsome

# oh-my-zsh配置
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

chsh -s /usr/local/bin/zsh
