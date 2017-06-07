FROM alpine_base

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8

RUN set -ex \
  # 使用清华apk镜像
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/main" > /etc/apk/repositories \
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/community" >> /etc/apk/repositories \

  && apk update \
  && apk add --update --no-cache \
    ca-certificates \
    bash \
		gcc \
		musl-dev \
		openssl \
		go 

CMD ["bash"]

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/go
# $ docker build -t go .
# $ docker run -it --rm  -v /Volumes/Work/OpenSource/WaterBolik/prestudy/go-src:/go-src go
# docker run -it --rm  -v /B/OpenSource/WaterBolik/prestudy/go-src:/go-src go
