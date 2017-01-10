FROM alpine:3.5

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8

# alpine 3.5 defaule apk list
    # musl
    # busybox
    # alpine-baselayout
    # alpine-keys
    # libressl2.4-libcrypto
    # libressl2.4-libssl
    # zlib
    # apk-tools
    # scanelf
    # musl-utils
    # libc-utils

# Install needed packages. Notes:
    #   * dumb-init: a proper init system for containers, to reap zombie children
    #   * ca-certificates: for SSL verification during Pip and easy_install
    #   * bash: so we can access /bin/bash
    #   * python2: the binaries themselves
    #   * python2-dev: are used for gevent e.g.
    #   * build-base: used so we include the basic development packages (gcc)
    #   * linux-headers: commonly needed, and an unusual package name from Alpine.
    #   * musl: standard C library
    #   * git: to ease up clones of repos
    #   * py-pip: install Pip.
    #   * py-setuptools: required only in major version 2, installs easy_install so we can install Pip.
    #   * postgresql-client: for accessing a PostgreSQL server
    #   * postgresql-dev: for building psycopg2
    #   * py-lxml: instead of using pip to install lxml, this is faster. Must make sure requirements.txt has correct version
    #   * libffi-dev: for compiling Python cffi extension
    #   * freetype-dev: For Pillow: TrueType support
    #   * tiff-dev: For Pillow: TIFF support
    #   * jpeg-dev: For Pillow: JPEG support
    #   * openjpeg-dev: For Pillow: JPEG 2000 support
    #   * libpng-dev: For Pillow: PNG support
    #   * zlib-dev: For Pillow:
    #   * lcms2-dev: For Pillow: Little CMS 2 support
    #   * libwebp-dev: For Pillow: WebP support
    #   * gdal: For some Geo capabilities
    #   * geos: For some Geo capabilities

RUN set -ex \
  # 使用清华apk镜像
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/main" >> /etc/apk/repositories \

  # replacing default repositories with edge ones
  # && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" > /etc/apk/repositories \
  # && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  # && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \

  # Add the packages, with a CDN-breakage fallback if needed
  # && apk add --no-cache $PACKAGES || \
  #   (sed -i -e 's/dl-cdn/dl-4/g' /etc/apk/repositories && apk add --no-cache $PACKAGES) \

  && apk update \
  && apk add --update --no-cache \
    #   * dumb-init: a proper init system for containers, to reap zombie children
    dumb-init \
    #   * ca-certificates: for SSL verification during Pip and easy_install
    ca-certificates \
    #   * bash: so we can access /bin/bash
    bash \
    #   * python2: the binaries themselves
    python \
    #   * python2-dev: are used for gevent e.g.
    python-dev \
    py-pip \
    #   * build-base: used so we include the basic development packages (gcc)
    build-base \
    #   * linux-headers: commonly needed, and an unusual package name from Alpine.
    linux-headers \
    #   * musl: standard C library
    musl \
    # lapack-dev \ 
    #   * freetype-dev: For Pillow: TrueType support
    freetype-dev \
    gfortran \
    # g++ \
  # for install numpy 
  && ln -s /usr/include/locale.h /usr/include/xlocale.h \
  && pip install --no-cache-dir --upgrade --force-reinstall pip \
  && pip install --no-cache-dir --upgrade --force-reinstall \
    numpy \
    scipy \
    pandas \
    matplotlib \
    pytest 

CMD ["bash"]
