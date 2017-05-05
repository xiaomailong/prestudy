FROM alpine_base

MAINTAINER Bolik WaterBolik@163.com

# https://github.com/Dynalon/mdwiki/

ENV MDWIKI_VERSION=0.6.2

RUN set -ex \
    && apk --no-cache add \
        nginx \
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

VOLUME /wiki

WORKDIR /wiki

EXPOSE 80

# CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]

CMD ["nginx", "-g", "daemon off;"]
# CMD cp -f /opt/mdwiki/mdwiki.html /wiki/index.html && nginx -t



# 编译及执行方法如下: 
#     $ docker build -t mdwiki /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/
#     $ docker run -it --rm -p 8080:80 -v /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/wiki/:/wiki/ mdwiki
#     docker build -t mdwiki B:/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/
#     docker run -it --rm -p 8080:80 -v B:/OpenSource/WaterBolik/prestudy/bdocker/mdwiki/wiki/:/wiki/ mdwiki