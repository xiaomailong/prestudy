FROM alpine:3.5

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8

RUN set -ex \
  # 使用清华apk镜像
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/main" > /etc/apk/repositories \
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/community" >> /etc/apk/repositories \

  && apk update \
  && apk add --update --no-cache \
    bash \
    firefox-esr \

  # $ id $User
  # 用你自己的 uid gid 替换下面的值
  && export uid=501 gid=20 \
  && mkdir -p /home/developer \
  && echo "developer:x:${uid}:${gid}:developer,,,:/home/developer:/bin/bash" >> /etc/passwd \
  && echo "developer:x:${uid}:" >> /etc/group \
  && echo "developer ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers \
  && chmod 0440 /etc/sudoers \
  && chown ${uid}:${gid} -R /home/developer  

USER developer

ENV HOME /home/developer

CMD ["/usr/bin/firefox"]

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/firefox
# $ docker build -t afirefox .
# $ docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix afirefox
