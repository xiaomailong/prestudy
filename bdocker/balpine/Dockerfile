FROM alpine:3.5

MAINTAINER Bolik WaterBolik@163.com

ENV PATH /usr/local/bin:$PATH

ENV LANG C.UTF-8

# apk 镜像服务器地址
    # https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/main
    # https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/community
    # default repositories
    # http://dl-cdn.alpinelinux.org/alpine/v3.5/testing
    # http://dl-cdn.alpinelinux.org/alpine/v3.5/community
    # http://dl-cdn.alpinelinux.org/alpine/v3.5/main

RUN set -ex \
  # 使用清华apk镜像
  && sed -i 's/dl-cdn.alpinelinux.org/mirror.tuna.tsinghua.edu.cn/' /etc/apk/repositories \
  # && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/main" > /etc/apk/repositories \
  # && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/community" >> /etc/apk/repositories \
  && apk update \
  # 使用apk安装必备软件 
  && apk add --update --no-cache \
    bash \

  && echo "end"


CMD ["bash"]

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/balpine
# $ docker build -t balpine .
# $ docker run -it --rm balpine
# cd B:\OpenSource\WaterBolik\prestudy\bdocker\balpine\
# docker build -t balpine .
# docker run -it --rm balpine 