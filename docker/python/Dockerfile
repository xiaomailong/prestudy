FROM alpine:latest

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8

RUN set -ex \
  # 使用清华apk镜像
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main" > /etc/apk/repositories \
  && apk add --update --no-cache \
    # install ca-certificates so that HTTPS works consistently
    ca-certificates \
    bash \
    python \
    python-dev \
    py-pip \
    build-base \
    gcc \
    freetype-dev \
    gfortran \
    musl-dev \
    g++ \
  && ln -s /usr/include/locale.h /usr/include/xlocale.h \
  && pip install --upgrade pip \
    pytest \
    numpy 

CMD ["bash"]
