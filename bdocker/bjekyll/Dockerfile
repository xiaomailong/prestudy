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
        ruby-rdoc \
        libffi-dev \
#     && echo "end"    
# RUN set -ex \
    # 淘宝镜像
    # && gem sources --remove https://rubygems.org/ \
    && gem source -a https://ruby.taobao.org/ \
    && gem update --system \

#     && echo "end"    
# RUN set -ex \
    # 安装jekyll --no-rdoc --no-ri
    && gem install \
        jekyll \
        jekyll-feed \
        minima \
        json \
        rouge \
        redcarpet \
        go_script \
    && echo "end"

VOLUME /data
VOLUME /var/www/html
WORKDIR /data

EXPOSE 4000

# ENTRYPOINT [ "jekyll", "build", "--destination=/var/www/html" ]

ENTRYPOINT [ "jekyll", "serve" , "--incremental"]

# CMD ["bash"]

# $ docker build -t bjekyll /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bjekyll/
# $ docker run -it --rm bjekyll
# docker build -t bjekyll B:\OpenSource\WaterBolik\prestudy\bdocker\bjekyll\
# docker run -it --rm bjekyll 

# docker run -v /Volumes/Work/OpenSource/WaterBolik/waterbolik.github.io/:/data/ --name bblog bjekyll
# docker run -v /B/OpenSource/WaterBolik/waterbolik.github.io/:/data/ --name bblog bjekyll
# docker run -d -P --volumes-from bblog bapache 


# docker run -it -p 4000:4000 --rm -v /B/OpenSource/WaterBolik/waterbolik.github.io/:/data/ bjekyll
# docker run -d -P --volumes-from titusblog titushuang/apache

# 构建 Jeyll 容器
# sudo docker run -v /home/huangyi/Practice/Docker/apache/james_blog:/data/ --name titusblog titushuang/jekyll
# 构建 Apache 容器，共享使用 Jeyll 的卷
# sudo docker run -d -P --volumes-from titusblog titushuang/apache
# 更新博客内容后使用下列命令重新编译 Jekyll
# sudo docker start titusblog

