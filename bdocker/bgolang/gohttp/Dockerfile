FROM balpine

MAINTAINER Bolik WaterBolik@163.com

RUN mkdir -p /data/go
COPY http /data/go

EXPOSE 8080

ENTRYPOINT ["/data/go/http"]

# CMD ["bash"]

# $ docker build -t bgohttp /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bgolang/gohttp/
# $ docker run -it --rm -p 8080:8080 bgohttp
# docker build -t bgohttp B:\OpenSource\WaterBolik\prestudy\bdocker\bgohttp\
# docker run -it --rm -p 8080:8080 bgohttp 