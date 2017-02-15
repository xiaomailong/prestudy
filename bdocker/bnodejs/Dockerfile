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
    # 淘宝 npm 镜像 cnpm
    && npm install -g cnpm --registry=https://registry.npm.taobao.org \
    # 安装 yarn 淘宝镜像 tyarn
    # && yarn config set registry https://registry.npm.taobao.org \
    && cnpm install yarn tyarn -g --registry=https://registry.npm.taobao.org \
    && cnpm install -g coffee-script \
    && cnpm install -g webpack \
    # 安装vue
    && cnpm install -g vue-cli \
    && echo "end"

RUN set -ex \
    && apk add --update --no-cache \   
        nodejs-dev \
        # Netwide Assembler
        nasm \
        imagemagick \

    # Gatsby 使用 React 生态系统来生成静态 html 文件。
    && cnpm install -g gatsby \
    && echo "end"

CMD ["bash"]

# $ docker build -t bnodejs /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bnodejs/
# $ docker run -it --rm bnodejs
# docker build -t bnodejs B:\OpenSource\WaterBolik\prestudy\bdocker\bnodejs\
# docker run -it --rm bnodejs 