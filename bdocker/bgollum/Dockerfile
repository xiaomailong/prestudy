FROM balpine

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
    && apk add --update --no-cache \   
        # The Interactive Ruby
        ruby-irb \
        # JSON implementation as a Ruby extension in C
        ruby-json \
        # Manage an application's gem dependencies
        ruby-bundler \
        # Ruby documentation tool
        ruby-rdoc \  
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
        # Pod::Simple::HTML comes with Perl >= 5.10. Lower versions should install Pod::Simple from CPAN.
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