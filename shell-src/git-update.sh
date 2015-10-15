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
# react
if [ -d "/Users/Bolik/OpenSource/Tools/react" ]; then
  cd "/Users/Bolik/OpenSource/Tools/react"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/facebook/react"
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
# stackedit
if [ -d "/Users/Bolik/OpenSource/Tools/stackedit" ]; then
  cd "/Users/Bolik/OpenSource/Tools/stackedit"
  git pull
else
  cd "/Users/Bolik/OpenSource/Tools/"
  git clone "https://github.com/benweet/stackedit.git"
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
