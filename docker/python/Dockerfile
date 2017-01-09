FROM alpine

MAINTAINER Bolik WaterBolik@163.com

RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main" > /etc/apk/repositories

RUN apk add --update \
    bash \
    python \
    # python-dev \
    py-pip \
    gcc \
    # mysql-dev \
    build-base \
  # && pip install Flask \
  # && pip install MySQL-python \
  && pip install \
    pytest \
    numpy \
  && rm -rf /var/cache/apk/*
