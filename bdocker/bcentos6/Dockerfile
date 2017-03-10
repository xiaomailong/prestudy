# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/centos
FROM centos:6

MAINTAINER Bolik WaterBolik@163.com

# 设置时区 
ENV TZ            Asia/Shanghai
ENV LANG          C.UTF-8

# 中科大镜像
ENV YUM_MIRROR    mirrors.ustc.edu.cn
# 阿里
# ENV YUM_MIRROR    mirrors.aliyun.com

RUN set -ex \
  # 使用镜像源 cat /etc/yum.repos.d/CentOS-Base.repo
  # CentOS-Base.repo CentOS-Debuginfo.repo CentOS-Media.repo CentOS-Vault.repo CentOS-fasttrack.repo
  && sed -i "s|mirror.centos.org|${YUM_MIRROR}|g" /etc/yum.repos.d/* \    
  && sed -i "s|#baseurl=|baseurl=|g" /etc/yum.repos.d/* \    
  && sed -i "s|mirrorlist=|#mirrorlist=|g" /etc/yum.repos.d/* \    
  && sed -i "s|http|https|g" /etc/yum.repos.d/* \ 

  # 安装 epel repo 源
  # && yum -y install wget \
  # && wget -O /etc/yum.repos.d/CentOS-Base.repo http://${YUM_MIRROR}/repo/CentOS-Base.repo \
  # && yum -y install epel-release \
  # && wget -O /etc/yum.repos.d/epel.repo http://${YUM_MIRROR}/repo/epel-7.repo \
  && yum clean all \
  && yum makecache \

  # && yum -y update \
  # && yum -y reinstall glibc-common \
  # && yum -y install kde-l10n-Chinese \
  # && yum -y install system-config-language \
  # && yum -y install snack \
  && yum -y install fontconfig \
  # && yum -y install fonts-chinese.noarch \
  # && yum -y install m17n-db-common-cjk \
  # && yum -y install m17n-db-chinese \
  # && yum -y install fonts-chinese \
  # && yum -y install fonts-ISO8859-2-75dpi \
  && yum -y groupinstall chinese-support \

  # 设置时区
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone \

  # && locale-gen en_US.UTF-8 \

  # 命令执行结束
  && echo "end"

# 配置中文语言
ENV LANG          zh_CN.UTF-8
ENV LANGUAGE      zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en:C.UTF-8 
ENV LC_ALL        zh_CN.UTF-8
ENV SUPPORTED     zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en:C.UTF-8 
ENV SYSFONT       lat0-sun16

CMD ["bin/bash"]

# $ docker build -t bcentos6 /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bcentos6/
# docker build -t bcentos6 B:\OpenSource\WaterBolik\prestudy\bdocker\bcentos6\
# docker run -it --rm bcentos6 
