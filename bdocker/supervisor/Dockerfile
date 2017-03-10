FROM balpine

MAINTAINER Bolik WaterBolik@163.com

# nodejs 基础架构及模块学习

RUN set -ex \
    && mkdir -p /var/run/sshd \
    && mkdir -p /var/log/supervisor \
    && apk add --update --no-cache \
        apache2 \
        supervisor \
    
    

    # && ps -a | grep sshd \
    
    && echo "end"

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 22 80

CMD ["bash"]

# $ docker build -t supervisor /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/supervisor/
# $ docker run -it --rm -v /Volumes/Work/OpenSource/WaterBolik/:/WaterBolik supervisor
# docker build -t supervisor B:\OpenSource\WaterBolik\prestudy\bdocker\supervisor\
# docker run -it --rm -v /B/OpenSource/WaterBolik/:/WaterBolik/ supervisor 