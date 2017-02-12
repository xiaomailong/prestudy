FROM balpine

MAINTAINER Bolik WaterBolik@163.com

# nodejs 基本环节

RUN set -ex \
    # 安装python2及其常用库
    && apk add --update --no-cache \   
        nodejs \
    # 淘宝 NPM 镜像
    && npm install -g cnpm --registry=https://registry.npm.taobao.org \
    # 安装 Yarn
    && cnpm install -g yarn \

  && echo "end"

CMD ["bash"]

# $ docker build -t bnodejs /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bnodejs/
# $ docker run -it --rm bnodejs
# docker build -t bnodejs B:\OpenSource\WaterBolik\prestudy\bdocker\bnodejs\
# docker run -it --rm bnodejs 