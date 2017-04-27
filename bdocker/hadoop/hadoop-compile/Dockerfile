FROM ubuntu_base

MAINTAINER Bolik WaterBolik@163.com

# install dependencies for compiling hadoop
RUN set -ex \   
    && mkdir -p /opt \
    && apt-get -y install --no-install-recommends \
        curl \
        openjdk-8-jdk \
        libprotobuf-dev \
        protobuf-compiler \
        maven \
        cmake \
        build-essential \
        pkg-config \
        libssl-dev \
        zlib1g-dev \
        llvm \
        automake \
        autoconf \
        make \
    && echo "end"   

WORKDIR /opt

VOLUME /opt

COPY compile.sh /compile.sh

RUN chmod +x /compile.sh

CMD ["/compile.sh"]  

# $ docker build -t hadoop-compile /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop-compile/
# docker build -t hadoop-compile B:/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop-compile/
# docker run -it --rm -v /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop-compile/opt:/opt hadoop-compile 

