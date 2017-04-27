# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/centos
FROM registry.cn-hangzhou.aliyuncs.com/acs/centos
# FROM centos

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
  && yum install -y firefox \
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

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/centos
# $ docker build -t cfirefox .
# $ docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix cfirefox
