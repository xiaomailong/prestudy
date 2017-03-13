FROM ubuntu

MAINTAINER Bolik WaterBolik@163.com

# 设置时区 
ENV TZ            Asia/Shanghai
ENV LANG          C.UTF-8

# 安装中文语言环境并设置时区
ENV APT_MIRROR    mirrors.ustc.edu.cn
# ENV APT_MIRROR    mirrors.tuna.tsinghua.edu.cn
RUN set -ex \
    # 使用apt镜像
    && sed -i "s/archive.ubuntu.com/${APT_MIRROR}/" /etc/apt/sources.list \
  
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

# 检查openssh的安装状态
# rpm -qa | grep openssh;chkconfig --list | grep sshd

# 配置ssh
# RUN set -ex \
#     # 创建 /var/run/sshd/目录，不然sshd服务启动会报错
#     && mkdir -p /var/run/sshd \
#     && mkdir -p $HOME/.ssh \
#     && chmod 700 $HOME/.ssh \
#     &&  { \
#             echo '#!/bin/bash'; \ 
#             echo '/usr/sbin/sshd -D'; \
#         } > /auto_sshd.sh \
#     && cat /auto_sshd.sh \
#     && chmod +x /auto_sshd.sh \
#     &&  { \
#             echo 'Host *'; \ 
#             echo '  UserKnownHostsFile /dev/null'; \
#             echo '  StrictHostKeyChecking no'; \ 
#             echo '  LogLevel quiet'; \
#             echo '  Port 2122'; \ 
#         } > $HOME/.ssh/config \ 
#     && chmod 600 $HOME/.ssh/config \
#     # 生成ssh访问秘钥 /etc/ssh/
#     && ssh-keygen -A \
#     # passwordless ssh
#     # && ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_dsa_key \
#     # && ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key \
#     && ssh-keygen -q -N "" -t rsa -f $HOME/.ssh/id_rsa \
#     && cp $HOME/.ssh/id_rsa.pub $HOME/.ssh/authorized_keys \
#     # && ls /etc/ssh/ \
#     # && cat /etc/ssh/ssh_host_rsa_key \
#     # && cat /etc/ssh/ssh_host_rsa_key.pub \
#     # && cat /etc/ssh/sshd_config \
#     # 将本机加入访问列表
#     # && cat /etc/ssh/*.pub > $HOME/.ssh/authorized_keys \
#     && chmod 600 $HOME/.ssh/authorized_keys \
#     # 免密访问配置
#     # && sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
#     # && sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config \
#     # && sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config \
#     && sed -i \
#         -e 's~^PasswordAuthentication yes~PasswordAuthentication no~g' \
#         -e 's~^#PermitRootLogin yes~PermitRootLogin no~g' \
#         -e 's~^#UseDNS yes~UseDNS no~g' \
#         -e 's~^\(.*\)/usr/libexec/openssh/sftp-server$~\1internal-sftp~g' \
#         /etc/ssh/sshd_config \

#     # fix the 254 error code
#     && sed  -i "/^[^#]*UsePAM/ s/.*/#&/"  /etc/ssh/sshd_config \
#     # && echo "UsePAM no" >> /etc/ssh/sshd_config \
#     && echo "Port 2122" >> /etc/ssh/sshd_config \

#     # 修改root用户密码 
#     && echo "root:root" | chpasswd \
#     && echo "end"    

# 容器需要开放SSH 22端口
EXPOSE 22

ENTRYPOINT ["/usr/sbin/init"]

CMD ["bin/bash"]  

# $ docker build -t bubuntu /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bubuntu/
# docker build -t bubuntu B:\OpenSource\WaterBolik\prestudy\bdocker\bubuntu\
# docker run -it --rm bubuntu 