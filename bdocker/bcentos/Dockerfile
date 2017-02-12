# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/centos
FROM centos

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8 

# 配置中文语言
ENV LANG zh_CN.UTF-8 
ENV LANGUAGE zh_CN.UTF-8 
ENV LC_ALL=zh_CN.UTF-8 

# 设置时区 
ENV TZ=Asia/Shanghai

RUN set -ex \

  # 设置时区
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone \

  # 命令执行结束
  && echo "end"

CMD ["bin/bash"]

# $ docker build -t bcentos /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bcentos/
# docker build -t bcentos B:\OpenSource\WaterBolik\prestudy\bdocker\bcentos\
# docker run -it --rm bcentos 
