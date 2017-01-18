FROM centos

MAINTAINER Bolik WaterBolik@163.com

USER developer

ENV HOME /home/developer

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
  && chown ${uid}:${gid} -R /home/developer \

CMD ["/usr/bin/firefox"]

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/centos
# $ docker build -t firefox .
# $ docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix firefox
