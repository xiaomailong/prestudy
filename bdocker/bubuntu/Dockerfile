FROM ubuntu

MAINTAINER Bolik WaterBolik@163.com

# 设置时区 
ENV TZ            Asia/Shanghai
ENV LANG          C.UTF-8

# 安装中文语言环境并设置时区
# ENV APT_MIRROR    mirrors.ustc.edu.cn
# ENV APT_MIRROR    mirrors.tuna.tsinghua.edu.cn
ENV APT_MIRROR    mirrors.aliyun.com
RUN set -ex \
    # 查看系统版本
    && cat /etc/issue \
    # 使用apt镜像
    && sed -i \
        -e "s|archive.ubuntu.com|${APT_MIRROR}|g" \    
        -e "s|http|https|g" \
        /etc/apt/sources.list \
    && cat /etc/apt/sources.list \
    # -qq隐藏更新Apt缓存过程中打印的日志
    # -y参数来消除更新过程中所有向用户提问的部分
    && apt-get -y update \
    && apt-get -y install apt-utils \
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
        # 安装openssh
        openssh \
        openssh-server \
        openssh-clients \
        sshpass \
        openrc \
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

# 配置ssh
RUN set -ex \
    # && mkdir -p /var/run/sshd \
    # 生成ssh访问秘钥 /etc/ssh/
    && ssh-keygen -A \
    # 免密访问配置
    && sed -i \
        -e 's~^#PermitRootLogin prohibit-password~PermitRootLogin yes~g' \
        -e 's~^#HostKey /etc/ssh/ssh_host_rsa_key~HostKey /etc/ssh/ssh_host_rsa_key~g' \
        -e 's~^#PubkeyAuthentication yes~PubkeyAuthentication yes~g' \
        -e 's~^#PasswordAuthentication yes~PasswordAuthentication yes~g' \
        -e 's~^#PermitEmptyPasswords no~PermitEmptyPasswords yes~g' \
        -e 's~^#UseDNS no~UseDNS no~g' \
        -e 's~^#Port 22~Port 2222~g' \
        /etc/ssh/sshd_config \
    && cat /etc/ssh/sshd_config \
   
    # 客户端配置
    && mkdir -p $HOME/.ssh \
    && chmod 700 $HOME/.ssh \
    &&  { \
            echo 'Host *'; \ 
            echo '  UserKnownHostsFile /dev/null'; \
            echo '  StrictHostKeyChecking no'; \ 
            echo '  LogLevel quiet'; \
            echo '  Port 2222'; \ 
        } > $HOME/.ssh/config \ 
    && chmod 600 $HOME/.ssh/config \
    && cat $HOME/.ssh/config \
    && ssh-keygen -q -N "" -t rsa -f $HOME/.ssh/id_rsa \
    && cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys \
    && chmod 600 $HOME/.ssh/authorized_keys \   

    # 配置sshd服务
    && rc-update add sshd sysinit\
    && rc-status \
    && touch /run/openrc/softlevel \

    && echo "end"    

EXPOSE 2222

# CMD ["bin/bash"]  
CMD openrc && bash

# $ docker build -t bubuntu /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bubuntu/
# docker build -t bubuntu B:\OpenSource\WaterBolik\prestudy\bdocker\bubuntu\
# docker run -it --rm bubuntu 