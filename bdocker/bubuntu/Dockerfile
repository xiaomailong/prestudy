FROM ubuntu

MAINTAINER Bolik WaterBolik@163.com

# 设置时区 
ENV TZ            Asia/Shanghai
ENV LANG          C.UTF-8
# 中科大镜像
ENV APT_MIRROR    mirrors.ustc.edu.cn
# 清华镜像
# ENV APT_MIRROR    mirrors.tuna.tsinghua.edu.cn

RUN set -ex \
    # 使用apt镜像
    && sed -i "s/archive.ubuntu.com/${APT_MIRROR}/" /etc/apt/sources.list \
  
    # -qq隐藏更新Apt缓存过程中打印的日志
    # -y参数来消除更新过程中所有向用户提问的部分
    && apt-get -y update \
    && apt-get -y upgrade \

    # 配置中文语言
    && /usr/share/locales/install-language-pack zh_CN \
    && locale-gen zh_CN.UTF-8 \
    && dpkg-reconfigure --frontend noninteractive locales \
  
    && apt-get -y install --no-install-recommends \
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
        openssh \
        openssh-server \
        openssh-clients \
    # 将文泉驿微米黑设置为系统默认字体
    && ln /etc/fonts/conf.d/65-wqy-microhei.conf /etc/fonts/conf.d/69-language-selector-zh-cn.conf \
  
    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    # && dpkg-reconfigure -f noninteractive tzdata \

    # 删除不必要的软件和Apt缓存包列表
    # && apt-get autoclean  \
    # && apt-get autoremove  \
    # && rm -rf /var/lib/apt/lists/* \

    # 命令执行结束
    && echo "end"

# 配置中文语言
ENV LANG          zh_CN.UTF-8
ENV LANGUAGE      zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en:C.UTF-8 
ENV LC_ALL        zh_CN.UTF-8
ENV SUPPORTED     zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en:C.UTF-8 
ENV SYSFONT       lat0-sun16

RUN set -ex \
    # 配置ssh
    && mkdir -p /var/run/sshd \
    &&  { \
            echo '#!/bin/bash'; \ 
            echo '/usr/sbin/sshd -D'; \
        } > /auto_sshd.sh \
    && cat /auto_sshd.sh \
    && chmod +x /auto_sshd.sh \
    && ssh-keygen -A \
    && echo "root:Pass@word8" | chpasswd \
    && echo 'export HISTTIMEFORMAT="%F %T `whoami` "' >> /etc/profile \
    # && ls /etc/ssh/ \
    # && cat /etc/ssh/ssh_host_rsa_key \
    # && cat /etc/ssh/ssh_host_rsa_key.pub \
    # && cat /etc/ssh/sshd_config \
    && echo "end"

CMD ["bin/bash"]  

# $ docker build -t bubuntu /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bubuntu/
# docker build -t bubuntu B:\OpenSource\WaterBolik\prestudy\bdocker\bubuntu\
# docker run -it --rm bubuntu 