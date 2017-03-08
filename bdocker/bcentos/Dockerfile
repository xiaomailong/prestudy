# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/centos
FROM centos

MAINTAINER Bolik WaterBolik@163.com

# 配置中文语言
ENV LANG          C.UTF-8
ENV LANGUAGE      zh_CN.UTF-8:zh_CN:en_US.UTF-8:C.UTF-8 
ENV LC_ALL        zh_CN.UTF-8
# 设置时区 
ENV TZ            Asia/Shanghai

# 中科大镜像
ENV YUM_MIRROR    mirrors.ustc.edu.cn

RUN set -ex \
  # 使用镜像源 /etc/yum.repos.d/CentOS-Base.repo
  && sed -i "s/mirror.centos.org/${YUM_MIRROR}/" /etc/yum.repos.d/* \    
  && yum repolist \
  && yum -y update  \
  && yum -y reinstall glibc-common \
  && yum -y install kde-l10n-Chinese \

  # 设置时区
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone \

  # && locale-gen en_US.UTF-8 \

  # 命令执行结束
  && echo "end"

CMD ["bin/bash"]

# $ docker build -t bcentos /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bcentos/
# docker build -t bcentos B:\OpenSource\WaterBolik\prestudy\bdocker\bcentos\
# docker run -it --rm bcentos 
