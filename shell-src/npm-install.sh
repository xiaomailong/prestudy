#!/bin/bash

# 临时使用淘宝 npm 库

# 淘宝 NPM 镜像
# npm install -g cnpm --registry=https://registry.npm.taobao.org

#alias for cnpm in .bashrc or .zshrc
# alias cnpm="npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc"

# npm update
cnpm update -g

# npm install -g
cnpm install -g babel-cli
cnpm install -g bower
cnpm install -g browserify
cnpm install -g browser-sync
cnpm install -g express
cnpm install -g forever
cnpm install -g gitbook-cli
cnpm install -g grunt-cli
cnpm install -g grunt-init
cnpm install -g gulp
cnpm install -g mocha
cnpm install -g node-gyp
cnpm install -g node-inspector
cnpm install -g react-native-cli
cnpm install -g semver
cnpm install -g strongloop
cnpm install -g supervisor

# 在Visual Studio Code中通过Typings实现智能提示功能
cnpm install -g typings
# 安装相关提示信息文件
# 安装完成后，我们需要安装相应的需要提示功能库或者框架的类型信息文件，在这里我们新建一个文件夹 NodeSnippet，
# 使用命令行进入到该目录中，分别输入下面两个命令来安装Node和Lodash的类型接口信息文件：
typings install node --ambient --save
typings install lodash --save

cnpm install -g typescript
cnpm install -g webpack

# Yeoman 是一个创建项目框架的应用，使用它我们可以创建出网站项目的基本框架。
cnpm install -g yo
# 安装 yeoman 之后，还需要安装 OmniSharp ASP.NET generators。
cnpm install -g generator-aspnet

# brew upgrade
brew upgrade --all
