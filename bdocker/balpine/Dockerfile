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
        # Common CA certificates PEM files
        ca-certificates \
        # Timezone data
        tzdata \
        # The GNU Bourne Again shell
        bash \
        # An URL retrival utility and library
        curl \
        # Port of OpenBSD's free SSH release
        openssh \
        # OpenRC manages the services, startup and shutdown of a host
        openrc \
        # Linux networking base tools
        net-tools \
        # pluggable authentication modules for linux
        linux-pam \
        # PAM-using login and passwd utilities (usermod, useradd, ...)
        shadow \
        # Access control list utilities
        acl \

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

    # 生成 rsa key
    # && ssh-keygen -A \
    # && ls 
    # && cat $HOME/.ssh/*.pub > $HOME/.ssh/authorized_keys \

    # && mkdir $HOME/.ssh \
    # && chmod 700 $HOME/.ssh \
    # 创建SSH密钥并将其拷贝到远程主机
    # && ssh-keygen -A \
    # && cat /etc/ssh/*.pub > $HOME/.ssh/authorized_keys \
    # && chmod 600 $HOME/.ssh/authorized_keys \

    # && sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
    # && sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config \
    # && sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config \

    && echo "end"

# 容器需要开放SSH 22端口
EXPOSE 22

#Auto running sshd service
# CMD ["/usr/sbin/sshd","-D"]

CMD ["bash"]

# 编译及执行方法如下：
#     $ docker build -t balpine /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/balpine/
#     docker build -t balpine B:\OpenSource\WaterBolik\prestudy\bdocker\balpine\
#     docker run -it --rm balpine 