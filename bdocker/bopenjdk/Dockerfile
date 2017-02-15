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

ENV PATH ${PATH}:${JAVA_HOME}/jre/bin:${JAVA_HOME}/bin

ENV JAVA_VERSION 8u121

ENV JAVA_ALPINE_VERSION 8.121.13-r0

RUN set -x \
	&& apk add --no-cache \
		# OpenJDK 8 provided by IcedTea openjdk8-8.121.13-r0
		openjdk8 \
		# openjdk8-jre-base \
	&& [ "$JAVA_HOME" = "$(docker-java-home)" ]

CMD ["bash"]

# $ docker build -t bopenjdk /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bopenjdk/
# $ docker run -it --rm -v bopenjdk
# docker build -t bopenjdk B:\OpenSource\WaterBolik\prestudy\bdocker\bopenjdk\
# docker run -it --rm bopenjdk 