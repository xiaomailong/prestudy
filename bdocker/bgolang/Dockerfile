FROM balpine

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
    && apk add --update --no-cache \   
        build-base \
        go \

  && echo "end"

CMD ["bash"]

# $ docker build -t bgolang /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bgolang/
# $ docker run -it --rm -v /Volumes/Work/OpenSource/WaterBolik/prestudy/go-src/:/go-src/ bgolang
# docker build -t bgolang B:\OpenSource\WaterBolik\prestudy\bdocker\bgolang\
# docker run -it --rm bgolang 