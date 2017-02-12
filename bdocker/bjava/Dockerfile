FROM balpine

MAINTAINER Bolik WaterBolik@163.com

# openjdk for hadoop

RUN { \
		echo '#!/bin/sh'; \
		echo 'set -e'; \
		echo; \
		echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
	} > /usr/local/bin/docker-java-home \
	&& chmod +x /usr/local/bin/docker-java-home

ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk

ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

ENV JAVA_VERSION 8u111

ENV JAVA_ALPINE_VERSION 8.111.14-r0

RUN set -x \
	&& apk add --no-cache \
		openjdk8 \
	&& [ "$JAVA_HOME" = "$(docker-java-home)" ]

CMD ["bash"]

# $ docker build -t bjava /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bjava/.
# $ docker run -it --rm -v bjava
# docker build -t bjava B:\OpenSource\WaterBolik\prestudy\bdocker\bjava\
# docker run -it --rm bjava 