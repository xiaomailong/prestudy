# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/ubuntu
# FROM registry.cn-hangzhou.aliyuncs.com/acs/ubuntu
FROM ubuntu:latest

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8 

# 配置中文语言
ENV LANG zh_CN.UTF-8 
ENV LANGUAGE zh_CN.UTF-8 
ENV LC_ALL=zh_CN.UTF-8 

# 设置时区 
ENV TZ=Asia/Shanghai

RUN set -ex \
  # 使用清华镜像：mirrors.tuna.tsinghua.edu.cn
  && sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/' /etc/apt/sources.list \
  
  # -qq隐藏更新Apt缓存过程中打印的日志
  # -y参数来消除更新过程中所有向用户提问的部分
  && apt-get update -y \
  && apt-get upgrade -y \

  # 配置中文语言
  && /usr/share/locales/install-language-pack zh_CN \
  && locale-gen zh_CN.UTF-8 \
  && dpkg-reconfigure --frontend noninteractive locales \
  && apt-get -qqy install \
    # 安装中文包
    language-pack-zh-hans \
    # 安装基本字体
    fonts-ipafont-gothic \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-scalable \
    # 安装文泉驿微米黑字体
    ttf-wqy-microhei \
    # 安装时区数据
    tzdata \
  # 将文泉驿微米黑设置为系统默认字体
  && ln /etc/fonts/conf.d/65-wqy-microhei.conf /etc/fonts/conf.d/69-language-selector-zh-cn.conf \
  
  # 设置时区
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata \

  # 删除不必要的软件和Apt缓存包列表
  && apt-get autoclean  \
  && apt-get autoremove  \
  && rm -rf /var/lib/apt/lists/* \

  # 命令执行结束
  && echo "end"

CMD ["bin/bash"]  

# $ docker build -t bubuntu /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bubuntu/
# docker build -t bubuntu B:\OpenSource\WaterBolik\prestudy\bdocker\bubuntu\
# docker run -it --rm bubuntu 