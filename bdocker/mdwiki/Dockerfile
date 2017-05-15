# FROM alpine_base

FROM nginx:alpine

MAINTAINER Bolik WaterBolik@163.com

# https://github.com/Dynalon/mdwiki/

ENV MDWIKI_VERSION=0.6.2

RUN set -ex \
    && apk --no-cache add \
        curl \
        # TODO: 通过该方式安装的nginx启动时会报错，不知原因如何，待查
        # nginx \
    && mkdir -p /opt \
    && cd /opt \
    # https://github.com/Dynalon/mdwiki/releases/download/0.6.2/mdwiki-0.6.2.zip
    # https://github.com/Dynalon/mdwiki/releases/download/0.6.2/mdwiki-0.6.2.zip
    && curl -fSL https://github.com/Dynalon/mdwiki/releases/download/$MDWIKI_VERSION/mdwiki-$MDWIKI_VERSION.zip  -o /opt/mdwiki-$MDWIKI_VERSION.zip \
    # && wget -q https://github.com/Dynalon/mdwiki/releases/download/$MDWIKI_VERSION/mdwiki-$MDWIKI_VERSION.zip \
    && unzip mdwiki-$MDWIKI_VERSION.zip \
    && mv /opt/mdwiki-$MDWIKI_VERSION /opt/mdwiki 

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
# COPY generate-index.sh /generate-index.sh

VOLUME /wiki

WORKDIR /wiki

EXPOSE 80

STOPSIGNAL SIGQUIT

HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1

# CMD cp -f /opt/mdwiki/mdwiki.html /wiki/index.html \
#     && cp -f /generate-index.sh /wiki/generate-index.sh \
#     && nginx -t

CMD ["nginx", "-g", "daemon off;"]
# CMD chmod a+x /wiki/generate-index.sh \
#     && sh /wiki/generate-index.sh /wiki \
#     && nginx -g "daemon off;"

# 编译及执行方法如下: 
#     $ docker build -t mdwiki /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/
#     $ docker run -it --rm -p 8080:80 -v /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/wiki/:/wiki/ mdwiki
#     docker build -t mdwiki B:/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/
#     docker run -it --rm -p 8080:80 -v B:/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/wiki/:/wiki/ mdwiki