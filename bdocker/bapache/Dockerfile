FROM balpine

MAINTAINER Bolik WaterBolik@163.com

# jekyll 基本运行环境搭建

RUN set -ex \
    # 安装jeykll依赖项
    && apk add --update --no-cache \   
        apache2 \

  && echo "end"

VOLUME [ "/var/www/html" ]
WORKDIR /var/www/html

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2

RUN mkdir -p $APAHCE_RUN_DIR $APACHE_LOCK_DIR $APACHE_LOG_DIR

EXPOSE 80

ENTRYPOINT [ "/usr/sbin/apache2" ]

CMD ["-D", "FOREGROUND"]

# $ docker build -t bapache /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bapache/
# $ docker run -it --rm bapache
# docker build -t bapache B:\OpenSource\WaterBolik\prestudy\bdocker\bapache\
# docker run -it --rm bapache 