FROM balpine

MAINTAINER Bolik WaterBolik@163.com

# jekyll 基本运行环境搭建

RUN set -ex \
    # 安装jeykll依赖项
    && apk add --update --no-cache \   
        # Meta package for build base
        build-base \
        # An object-oriented language for quick and easy programming
        ruby \
        ruby-dev \
        # The Interactive Ruby
        ruby-irb \
        # JSON implementation as a Ruby extension in C
        ruby-json \
        # Manage an application's gem dependencies
        ruby-bundler \
        # Ruby documentation tool
        ruby-rdoc \
        # A portable, high level programming interface to various calling conventions.
        libffi-dev \
        # International Components for Unicode library
        icu-dev \
        # Larry Wall's Practical Extraction and Report Language
        perl \
        # A compression/decompression Library
        zlib \
    && echo "end"


RUN set -ex \
    # 淘宝镜像
    # && gem sources --remove https://rubygems.org/ \
    && gem sources -a https://ruby.taobao.org/ \
    && gem update --system \
    && echo "end"    


RUN set -ex \
    && apk add --update --no-cache \   
        linux-headers \
        musl-dev \
        lapack-dev \
        freetype-dev \
    && echo "end"

RUN set -ex \
    && gem install --no-document \
        # A simple, Git-powered wiki with a sweet API and local frontend.
        gollum \
        # Markdown
        github-markdown \
        # Org 
        org-ruby \
        # AsciiDoc 
        asciidoctor \
        # WikiCreole
        creole \
        # MediaWiki 
        wikicloth \
        # perlpod
        # pod \
        # ReStructuredText 
        # ReStructuredText \
        # Textile 
        RedCloth \
    && echo "end"

VOLUME /wiki
WORKDIR /wiki

EXPOSE 80

CMD ["gollum", "--port", "80"]

# CMD ["bash"]

# $ docker build -t bgollum /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bgollum/
# $ docker run -it --rm bgollum
# docker build -t bgollum B:\OpenSource\WaterBolik\prestudy\bdocker\bgollum\
# docker run -it --rm bgollum 

# docker run -v /Volumes/Work/OpenSource/WaterBolik/waterbolik.github.io/:/data/ --name bblog bgollum
# docker run -v /B/OpenSource/WaterBolik/waterbolik.github.io/:/data/ --name bblog bgollum
# docker run -d -P --volumes-from bblog bapache 

# docker run -it --rm -p 4000:4000 -v /Volumes/Work/OpenSource/WaterBolik/waterbolik.github.io/:/data/ bgollum
# docker run -it --rm -p 4000:4000 -v /B/OpenSource/WaterBolik/waterbolik.github.io/:/data/ bgollum
# docker run -d -P --volumes-from titusblog titushuang/apache

# 构建 Jeyll 容器
# sudo docker run -v /home/huangyi/Practice/Docker/apache/james_blog:/data/ --name titusblog titushuang/jekyll
# 构建 Apache 容器，共享使用 Jeyll 的卷
# sudo docker run -d -P --volumes-from titusblog titushuang/apache
# 更新博客内容后使用下列命令重新编译 Jekyll
# sudo docker start titusblog

# docker run -v /`pwd`:/wiki -p 4567:80 bgollum