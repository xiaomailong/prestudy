FROM alpine:3.5

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8 

# 配置中文语言
ENV LANG zh_CN.UTF-8 
ENV LANGUAGE zh_CN.UTF-8 
ENV LC_ALL=zh_CN.UTF-8 

# 设置时区 
ENV TZ=Asia/Shanghai

RUN set -ex \
    # 使用清华apk镜像
    && sed -i 's/dl-cdn.alpinelinux.org/mirror.tuna.tsinghua.edu.cn/' /etc/apk/repositories \
    && apk update \
    # 使用apk安装必备软件 
    && apk add --update --no-cache \
      ca-certificates \
      tzdata \
      bash \
      curl \

     # 配置中文语言
  # && /usr/share/locales/install-language-pack zh_CN \
  # && locale-gen zh_CN.UTF-8 \
  # && dpkg-reconfigure --frontend noninteractive locales \
  # && apt-get -qqy install \
    # 安装中文包
    # language-pack-zh-hans \
    # 安装基本字体
    # fonts-ipafont-gothic \
    # xfonts-100dpi \
    # xfonts-75dpi \
    # xfonts-cyrillic \
    # xfonts-scalable \
    # 安装文泉驿微米黑字体
    # ttf-wqy-microhei \
  # 将文泉驿微米黑设置为系统默认字体
  # && ln /etc/fonts/conf.d/65-wqy-microhei.conf /etc/fonts/conf.d/69-language-selector-zh-cn.conf \
    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    # 安装及设置结束
    && echo "end"


CMD ["bash"]

# 编译及执行方法如下：
#     $ docker build -t balpine /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/balpine/
#     docker build -t balpine B:\OpenSource\WaterBolik\prestudy\bdocker\balpine\
#     docker run -it --rm balpine 