FROM debian:8.7
# https://hub.docker.com/_/debian/

# 8.7, 8, jessie, latest 
# 7.11, 7, wheezy 

MAINTAINER Bolik WaterBolik@163.com

ENV TZ=Asia/Shanghai \
    # 安装包源镜像请任选其一   
    APT_MIRROR=mirrors.ustc.edu.cn \
    # APT_MIRROR=mirrors.tuna.tsinghua.edu.cn \
    # APT_MIRROR=mirrors.aliyun.com \
    # 配置中文语言
    LANG=zh_CN.UTF-8 \
    LANGUAGE=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    SUPPORTED=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    SYSFONT=lat0-sun16 \
    # LC_ALL=C.UTF-8 
    LC_ALL=zh_CN.UTF-8 

RUN set -ex \
    # 查看系统版本
    && cat /etc/issue \
    # 使用apt镜像
    && sed -i \
            -e "s|deb.debian.org|${APT_MIRROR}|g" \
            -e "s|security.debian.org|${APT_MIRROR}/debian-security|g" \   
            # -e "s|http|https|g" \
        /etc/apt/sources.list \
    && cat /etc/apt/sources.list \
    # -qq 隐藏更新Apt缓存过程中打印的日志
    # -y  参数来消除更新过程中所有向用户提问的部分
    && apt-get -y update \
    && apt-get -y upgrade \

    && apt-get -y install \
        apt-utils \
        # 区域设置
        locales \
        # 常用的中文字体、SCIM输入法框架和拼音输入法
        # scim-pinyin \
        openssh-server \
        openssh-client \
        sshpass \
        openrc \
        tzdata \

    # 配置中文语言
    # && /usr/share/locales/install-language-pack zh_CN \
    # && locale-gen zh_CN.UTF-8 \
    # && dpkg-reconfigure --frontend noninteractive locales \
    # && apt-get -qqy install \
    #     # 安装中文包
    #     language-pack-zh-hans \
    #     # 安装基本字体
    #     fonts-ipafont-gothic \
    #     xfonts-100dpi \
    #     xfonts-75dpi \
    #     xfonts-cyrillic \
    #     xfonts-scalable \
    #     # 安装文泉驿微米黑字体
    #     ttf-wqy-microhei \
    #     # 安装时区数据
    #     tzdata \
    # # 将文泉驿微米黑设置为系统默认字体
    # && ln /etc/fonts/conf.d/65-wqy-microhei.conf /etc/fonts/conf.d/69-language-selector-zh-cn.conf \
    
    # 删除不必要的软件和Apt缓存包列表
    && apt-get autoclean  \
    && apt-get autoremove  \
    # && rm -rf /var/lib/apt/lists/* \
    && echo "end"

# 设置时区 
RUN set -ex \
    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \
    # 命令执行结束
    && echo "end"

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
    # && rc-update add sshd sysinit\
    # && rc-status \
    # && touch /run/openrc/softlevel \

    && echo "end"    

EXPOSE 2222

# CMD openrc && bash
CMD ["bin/bash"]  

# $ docker build -t bdebian /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bdebian/
# docker build -t bdebian B:\OpenSource\WaterBolik\prestudy\bdocker\bdebian\
# docker run -it --rm bdebian 