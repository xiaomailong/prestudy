#!/bin/bash

# 创建目录
if [ ! -d "/Users/Bolik/OpenSource" ]; then
mkdir "/Users/Bolik/OpenSource"
fi

echo "ES6 相关开源项目更新"
if [ ! -d "/Users/Bolik/OpenSource/ES6" ]; then
mkdir "/Users/Bolik/OpenSource/ES6"
fi
# core-js
if [ -d "/Users/Bolik/OpenSource/ES6/core-js" ]; then
  cd "/Users/Bolik/OpenSource/ES6/core-js"
  git pull
else
  cd "/Users/Bolik/OpenSource/ES6/"
  git clone "https://github.com/zloirock/core-js"
fi
# es-class
if [ -d "/Users/Bolik/OpenSource/ES6/es-class" ]; then
  cd "/Users/Bolik/OpenSource/ES6/es-class"
  git pull
else
  cd "/Users/Bolik/OpenSource/ES6/"
  git clone "https://github.com/WebReflection/es-class"
fi
# es6-collections
if [ -d "/Users/Bolik/OpenSource/ES6/es6-collections" ]; then
  cd "/Users/Bolik/OpenSource/ES6/es6-collections"
  git pull
else
  cd "/Users/Bolik/OpenSource/ES6/"
  git clone "https://github.com/WebReflection/es6-collections"
fi
# es6-promise
if [ -d "/Users/Bolik/OpenSource/ES6/es6-promise" ]; then
  cd "/Users/Bolik/OpenSource/ES6/es6-promise"
  git pull
else
  cd "/Users/Bolik/OpenSource/ES6/"
  git clone "https://github.com/jakearchibald/es6-promise"
fi
# es6-shim
if [ -d "/Users/Bolik/OpenSource/ES6/es6-shim" ]; then
  cd "/Users/Bolik/OpenSource/ES6/es6-shim"
  git pull
else
  cd "/Users/Bolik/OpenSource/ES6/"
  git clone "https://github.com/paulmillr/es6-shim"
fi
# es6-tools
if [ -d "/Users/Bolik/OpenSource/ES6/es6-tools" ]; then
  cd "/Users/Bolik/OpenSource/ES6/es6-tools"
  git pull
else
  cd "/Users/Bolik/OpenSource/ES6/"
  git clone "https://github.com/addyosmani/es6-tools"
fi

echo "Tools 相关开源项目新"
if [ ! -d "/Users/Bolik/OpenSource/Tools" ]; then
mkdir "/Users/Bolik/OpenSource/Tools"
fi
# amphtml
if [ -d "/Users/Bolik/OpenSource/Tools/amphtml" ]; then
  cd "/Users/Bolik/OpenSource/Tools/amphtml"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/ampproject/amphtml.git"
fi
# google-hosts
if [ -d "/Users/Bolik/OpenSource/Tools/google-hosts" ]; then
  cd "/Users/Bolik/OpenSource/Tools/google-hosts"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/txthinking/google-hosts"
fi
# react-native
if [ -d "/Users/Bolik/OpenSource/Tools/react-native" ]; then
  cd "/Users/Bolik/OpenSource/Tools/react-native"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/facebook/react-native"
fi
# react-mix
if [ -d "/Users/Bolik/OpenSource/Tools/react-mix" ]; then
  cd "/Users/Bolik/OpenSource/Tools/react-mix"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/xueduany/react-mix.git"
fi
# react
if [ -d "/Users/Bolik/OpenSource/Tools/react" ]; then
  cd "/Users/Bolik/OpenSource/Tools/react"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/facebook/react"
fi
# flux
if [ -d "/Users/Bolik/OpenSource/Tools/flux" ]; then
  cd "/Users/Bolik/OpenSource/Tools/flux"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/facebook/flux"
fi
# jekyll
if [ -d "/Users/Bolik/OpenSource/Tools/jekyll" ]; then
  cd "/Users/Bolik/OpenSource/Tools/jekyll"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "git://github.com/jekyll/jekyll.git"
fi
# jekyll-bootstrap
if [ -d "/Users/Bolik/OpenSource/Tools/jekyll-bootstrap" ]; then
  cd "/Users/Bolik/OpenSource/Tools/jekyll-bootstrap"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/plusjade/jekyll-bootstrap.git"
fi
# kramdown
if [ -d "/Users/Bolik/OpenSource/Tools/kramdown" ]; then
  cd "/Users/Bolik/OpenSource/Tools/kramdown"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "git://github.com/gettalong/kramdown.git"
fi
# GitHub Markup
if [ -d "/Users/Bolik/OpenSource/Tools/markup" ]; then
  cd "/Users/Bolik/OpenSource/Tools/markup"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/github/markup.git"
fi
# Octopress
if [ -d "/Users/Bolik/OpenSource/Tools/octopress" ]; then
  cd "/Users/Bolik/OpenSource/Tools/octopress"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/octopress/octopress.git"
fi
# stackedit
if [ -d "/Users/Bolik/OpenSource/Tools/stackedit" ]; then
  cd "/Users/Bolik/OpenSource/Tools/stackedit"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/benweet/stackedit.git"
fi
# kramdown-with-pygments
if [ -d "/Users/Bolik/OpenSource/Tools/kramdown-with-pygments" ]; then
  cd "/Users/Bolik/OpenSource/Tools/kramdown-with-pygments"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/mvdbos/kramdown-with-pygments.git"
fi
# Hosts
if [ -d "/Users/Bolik/OpenSource/Tools/Hosts" ]; then
  cd "/Users/Bolik/OpenSource/Tools/Hosts"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/highsea/Hosts.git"
fi
# Electronic WeChat
if [ -d "/Users/Bolik/OpenSource/Tools/electronic-wechat" ]; then
  cd "/Users/Bolik/OpenSource/Tools/electronic-wechat"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/geeeeeeeeek/electronic-wechat.git"
fi
# netdata：实时监视 Linux 系统性能
# netdata 能够监视 CPU、内存、磁盘、网络、进程、应用程序、Apache、NGINX、MySQL、Postfix、Squid 等总计 2000 多项度量指标，
# 并提供可视化的实时显示图表，看起来可谓一目了然。
if [ -d "/Users/Bolik/OpenSource/Tools/netdata" ]; then
  cd "/Users/Bolik/OpenSource/Tools/netdata"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/firehol/netdata.git"
fi
# Atom is a hackable text editor for the 21st century,
# built on Electron, and based on everything we love about our favorite editors.
# We designed it to be deeply customizable, but still approachable using the default configuration.
if [ -d "/Users/Bolik/OpenSource/Tools/atom" ]; then
  cd "/Users/Bolik/OpenSource/Tools/atom"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/atom/atom.git"
fi
# Electron 可以让你使用纯 JavaScript 调用丰富的原生 APIs 来创造桌面应用。
# 你可以把它看作是专注于桌面应用而不是 web 服务器的，io.js 的一个变体。
# 这不意味着 Electron 是绑定了 GUI 库的 JavaScript。
# 相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。
if [ -d "/Users/Bolik/OpenSource/Tools/electron" ]; then
  cd "/Users/Bolik/OpenSource/Tools/electron"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/electron/electron.git"
fi
# CopyQ：跨平台的高级剪贴板管理器
# 对于频繁的做剪切、拷贝、粘贴之类的操作，有一款剪贴板管理器将会方便不少。
# CopyQ 支持 Linux、Windows、Mac OS X 10.9+ 系统，可跨平台运行。
# 同时，它还具有编辑及脚本化等高级功能，实为不二之选。
if [ -d "/Users/Bolik/OpenSource/Tools/CopyQ" ]; then
  cd "/Users/Bolik/OpenSource/Tools/CopyQ"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/hluk/CopyQ.git"
fi
# TensorFlow is an open source software library for numerical computation using data flow graphs.
# Nodes in the graph represent mathematical operations,
# while the graph edges represent the multidimensional data arrays (tensors) that flow between them.
# This flexible architecture lets you deploy computation to one or more CPUs or GPUs
# in a desktop, server, or mobile device without rewriting code.
# TensorFlow also includes TensorBoard, a data visualization toolkit.
# Computation using data flow graphs for scalable machine learning http://tensorflow.org
if [ -d "/Users/Bolik/OpenSource/Tools/tensorflow" ]; then
  cd "/Users/Bolik/OpenSource/Tools/tensorflow"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/tensorflow/tensorflow.git"
fi

echo "Web 相关开源项目更新"
if [ ! -d "/Users/Bolik/OpenSource/Web" ]; then
mkdir "/Users/Bolik/OpenSource/Web"
fi
# 18F Pages
if [ -d "/Users/Bolik/OpenSource/Web/pages" ]; then
  cd "/Users/Bolik/OpenSource/Web/pages"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/18F/pages"
fi
# web-design-standards
if [ -d "/Users/Bolik/OpenSource/Web/web-design-standards" ]; then
  cd "/Users/Bolik/OpenSource/Web/web-design-standards"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/18F/web-design-standards.git"
fi
# web-design-standards-assets
if [ -d "/Users/Bolik/OpenSource/Web/web-design-standards-assets" ]; then
  cd "/Users/Bolik/OpenSource/Web/web-design-standards-assets"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/18F/web-design-standards-assets.git"
fi
# netlify-cms
if [ -d "/Users/Bolik/OpenSource/Web/netlify-cms" ]; then
  cd "/Users/Bolik/OpenSource/Web/netlify-cms"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/netlify/netlify-cms.git"
fi
# Bourbon
if [ -d "/Users/Bolik/OpenSource/Web/bourbon" ]; then
  cd "/Users/Bolik/OpenSource/Web/bourbon"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/bourbon.git"
fi
# Neat
if [ -d "/Users/Bolik/OpenSource/Web/neat" ]; then
  cd "/Users/Bolik/OpenSource/Web/neat"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/neat.git"
fi
# Bitters
if [ -d "/Users/Bolik/OpenSource/Web/bitters" ]; then
  cd "/Users/Bolik/OpenSource/Web/bitters"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/bitters.git"
fi
# Refills
if [ -d "/Users/Bolik/OpenSource/Web/refills" ]; then
  cd "/Users/Bolik/OpenSource/Web/refills"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/refills.git"
fi
# normalize.css
if [ -d "/Users/Bolik/OpenSource/Web/normalize.css" ]; then
  cd "/Users/Bolik/OpenSource/Web/normalize.css"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/necolas/normalize.css.git"
fi
# react-native-web
if [ -d "/Users/Bolik/OpenSource/Web/react-native-web" ]; then
  cd "/Users/Bolik/OpenSource/Web/react-native-web"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/necolas/react-native-web.git"
fi
# lib-flexible
if [ -d "/Users/Bolik/OpenSource/Web/lib-flexible" ]; then
  cd "/Users/Bolik/OpenSource/Web/lib-flexible"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/amfe/lib-flexible.git"
fi
# prism
if [ -d "/Users/Bolik/OpenSource/Web/prism" ]; then
  cd "/Users/Bolik/OpenSource/Web/prism"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/PrismJS/prism.git"
fi
# typo.css
if [ -d "/Users/Bolik/OpenSource/Web/typo.css" ]; then
  cd "/Users/Bolik/OpenSource/Web/typo.css"
  git pull
else
  cd "/Users/Bolik/OpenSource/Web/"
  git clone "https://github.com/sofish/typo.css.git"
fi

echo "Cpp 相关开源项目新"
if [ ! -d "/Users/Bolik/OpenSource/Cpp" ]; then
mkdir "/Users/Bolik/OpenSource/Cpp"
fi
# CPPFormatLibrary
if [ -d "/Users/Bolik/OpenSource/Cpp/CPPFormatLibrary" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/CPPFormatLibrary"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/sczybt/CPPFormatLibrary"
fi
# fann
if [ -d "/Users/Bolik/OpenSource/Cpp/fann" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/fann"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/libfann/fann"
fi
# google-glog
if [ -d "/Users/Bolik/OpenSource/Cpp/google-glog" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/google-glog"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/google-glog.git"
fi
# googlemock
if [ -d "/Users/Bolik/OpenSource/Cpp/googlemock" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/googlemock"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/googlemock.git"
fi
# googletest
if [ -d "/Users/Bolik/OpenSource/Cpp/googletest" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/googletest"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/googletest.git"
fi
# log4cxx
if [ -d "/Users/Bolik/OpenSource/Cpp/log4cxx" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/log4cxx"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/apache/log4cxx.git"
fi
# protobuf
if [ -d "/Users/Bolik/OpenSource/Cpp/protobuf" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/protobuf"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/protobuf.git"
fi
# Computational Network Toolkit (CNTK)
if [ -d "/Users/Bolik/OpenSource/Cpp/CNTK" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/CNTK"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/Microsoft/CNTK.git"
fi
# juCi++
# a lightweight, platform independent C++-IDE with support for C++11, C++14, and experimental C++17 features
# depending on libclang version.
if [ -d "/Users/Bolik/OpenSource/Cpp/jucipp" ]; then
  cd "/Users/Bolik/OpenSource/Cpp/jucipp"
  git pull
else
  cd "/Users/Bolik/OpenSource/Cpp/"
  git clone "https://github.com/cppit/jucipp"
fi

# JavaScript 相关例程更新
if [ ! -d "/Users/Bolik/OpenSource/JavaScript" ]; then
mkdir "/Users/Bolik/OpenSource/JavaScript"
fi
# mojs motion graphics toolbelt for the web http://mojs.io/
if [ -d "/Users/Bolik/OpenSource/JavaScript/mojs" ]; then
  cd "/Users/Bolik/OpenSource/JavaScript/mojs"
  git pull
else
  cd "/Users/Bolik/OpenSource/JavaScript/"
  git clone "https://github.com/legomushroom/mojs.git"
fi


# # Sample 相关例程更新
# if [ ! -d "/Users/Bolik/OpenSource/Sample" ]; then
# mkdir "/Users/Bolik/OpenSource/Sample"
# fi
#
# if [ -d "/Users/Bolik/OpenSource/Sample/so" ]; then
#   cd "/Users/Bolik/OpenSource/Sample/so"
#   git pull
# else
#   cd "/Users/Bolik/OpenSource/Sample/"
#   git clone "https://github.com/ca0gu0/so"
# fi
#
# if [ -d "/Users/Bolik/OpenSource/Sample/mm" ]; then
#   cd "/Users/Bolik/OpenSource/Sample/mm"
#   git pull
# else
#   cd "/Users/Bolik/OpenSource/Sample/"
#   git clone "https://github.com/tsq/mm"
# fi
#
# if [ -d "/Users/Bolik/OpenSource/Sample/React-Learning" ]; then
#   cd "/Users/Bolik/OpenSource/Sample/React-Learning"
#   git pull
# else
#   cd "/Users/Bolik/OpenSource/Sample/"
#   git clone "https://github.com/zhangmengxue/React-Learning"
# fi
#
# if [ -d "/Users/Bolik/OpenSource/Sample/browserify-babel-demo" ]; then
#   cd "/Users/Bolik/OpenSource/Sample/browserify-babel-demo"
#   git pull
# else
#   cd "/Users/Bolik/OpenSource/Sample/"
#   git clone "https://github.com/sitepoint-editors/browserify-babel-demo"
# fi
