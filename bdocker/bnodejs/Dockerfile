FROM balpine

MAINTAINER Bolik WaterBolik@163.com

# nodejs 基础架构及模块学习

RUN set -ex \
    && apk add --update --no-cache \   
        build-base \
        autoconf \
        automake \
        libpng-dev \
        python2 \
        python2-dev \
        nodejs \
        nodejs-dev \
    # 淘宝 npm 镜像 cnpm
    && echo "registry=https://registry.npm.taobao.org/" > /root/.npmrc \
    && echo "sass_binary_site=https://npm.taobao.org/mirrors/node-sass/" >> /root/.npmrc \
    && echo "phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs/" >> /root/.npmrc \
    && echo "ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/" >> /root/.npmrc \
    && npm install -g cnpm --registry=https://registry.npm.taobao.org \
    # 安装 yarn 淘宝镜像 tyarn
    && npm install yarn -g --registry=https://registry.npm.taobao.org \
    && yarn config set registry https://registry.npm.taobao.org \
    && cnpm install yarn tyarn -g --registry=https://registry.npm.taobao.org \
    && cnpm install -g coffee-script \
    && cnpm install -g webpack \
    && cnpm install -g electron \
    # JavaScript Standard Style 
    && cnpm install -g standard \
    && cnpm install -g phantomjs \
    # && npm install -g phantomjs --ignore-scripts \
    # GitBook 是一项致力于文档编制、数码写作和出版的新型、简单的解决方案。
    && cnpm install -g gitbook-cli \
    # && cnpm install -g phantomjs-prebuilt --ignore-scripts \
    && cnpm install -g gitbook-pdf \
    # && npm install -g gitbook-pdf --ignore-scripts \
    # 安装vue
    && cnpm install -g vue-cli \
    && echo "end"

CMD ["bash"]

# $ docker build -t bnodejs /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bnodejs/
# $ docker run -it --rm -v /Volumes/Work/OpenSource/WaterBolik/:/WaterBolik bnodejs
# docker build -t bnodejs B:\OpenSource\WaterBolik\prestudy\bdocker\bnodejs\
# docker run -it --rm -v /B/OpenSource/WaterBolik/:/WaterBolik/ bnodejs 