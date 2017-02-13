FROM balpine

MAINTAINER Bolik WaterBolik@163.com

# jekyll 基本运行环境搭建

RUN set -ex \
    # 安装jeykll依赖项
    && apk add --update --no-cache \   
        build-base \
        ruby \
        ruby-dev \
        ruby-irb \
        ruby-json \
        ruby-bundler \
        libffi-dev \
    # 淘宝镜像
    # && gem sources -r https://rubygems.org/ \
    && gem source -a https://ruby.taobao.org/ \
    && gem update --system \
    # 安装jekyll
    && gem install --no-rdoc --no-ri jekyll \

  && echo "end"

VOLUME /data
VOLUME /var/www/html
WORKDIR /data

ENTRYPOINT [ "jekyll", "build", "--destination=/var/www/html" ]

# CMD ["bash"]

# $ docker build -t bjekyll /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bjekyll/
# $ docker run -it --rm bjekyll
# docker build -t bjekyll B:\OpenSource\WaterBolik\prestudy\bdocker\bjekyll\
# docker run -it --rm bjekyll 

# docker run -v /Volumes/Work/OpenSource/WaterBolik/waterbolik.github.io/:/data/ --name titusblog titushuang/jekyll

# docker run -d -P --volumes-from titusblog titushuang/apache

# 构建 Jeyll 容器
# sudo docker run -v /home/huangyi/Practice/Docker/apache/james_blog:/data/ --name titusblog titushuang/jekyll
# 构建 Apache 容器，共享使用 Jeyll 的卷
# sudo docker run -d -P --volumes-from titusblog titushuang/apache
# 更新博客内容后使用下列命令重新编译 Jekyll
# sudo docker start titusblog

