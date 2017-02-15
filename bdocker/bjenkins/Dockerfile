FROM bopenjdk

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
    && apk add --update --no-cache \   
        build-base \
        autoconf \
        automake \
        libpng-dev \
        python2 \
        python2-dev \
        nodejs \
    && echo "end"

CMD ["bash"]

# $ docker build -t bjenkins /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bjenkins/
# $ docker run -it --rm bjenkins
# docker build -t bjenkins B:\OpenSource\WaterBolik\prestudy\bdocker\bjenkins\
# docker run -it --rm bjenkins 