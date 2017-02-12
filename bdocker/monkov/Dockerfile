FROM bnodejs

MAINTAINER Bolik WaterBolik@163.com

# Monkov is a blog system built with vue.js and koa.js You can easily build up your own blog with it.

RUN set -ex \
  # 安装python2及其常用库
    && apk add --update --no-cache \   
        git \

    && git clone https://github.com/DomonJi/monkov.git /src \
    && cd /src \
    && yarn install \
 
  && echo "end"

CMD ["/src", "npm run dev-client"]
# CMD ["/src", "npm run build-client"]

# $ docker build -t bpython /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bpython/.
# $ docker run -it --rm  -v /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/monkov/src:/src bnodejs
# docker build -t monkov B:\OpenSource\WaterBolik\prestudy\bdocker\monkov\
# docker run -it --rm -p 8080:8080  -v /B/OpenSource/WaterBolik/prestudy/bdocker/monkov/src:/src bnodejs 