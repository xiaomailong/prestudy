FROM balpine

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
    # --no-document
    && gem install \
        # Grit is a Ruby library for extracting information from a git repository in an object oriented manner.
        grit \
        # Nokogiri is an HTML, XML, SAX, and Reader parser. 
        # Among Nokogiri's many features is the ability to search documents via XPath or CSS3 selectors.
        nokogiri \
        # A simple, Git-powered wiki with a sweet API and local frontend.
        gollum \
        # Adapter for Gollum to use Rugged (libgit2) at the backend.
        gollum-rugged_adapter \
        # Self-contained Markdown parser for GitHub, with all our custom extensions
        github-markdown \
        # An Org mode parser written in Ruby.
        org-ruby \
        # A fast, open source text processor and publishing toolchain, written in Ruby, 
        # for converting AsciiDoc content to HTML5, DocBook 5 (or 4.5) and other formats.
        asciidoctor \
        # WikiCreole
        # Creole is a lightweight markup language (http://wikicreole.org/).
        creole \
        # A Creole-to-XHTML converter written in pure Ruby
        WikiCreole \
        # MediaWiki parser
        wikicloth \
        # perlpod
        # Pod::Simple::HTML comes with Perl >= 5.10. Lower versions should install Pod::Simple from CPAN.
        # pod \
        # ReStructuredText 
        # ReStructuredText \
        # Textile parser for Ruby.
        RedCloth \
        # A fast, safe and extensible Markdown to (X)HTML parser
        redcarpet \
    # 清除缓存
    && rm -fr /usr/local/bundle/cache ~/.gem/ ~/.gemrc ~/.ash_history \
    # && find /usr/local/bundle/ \( -name 'gem_make.out' -o -name 'mkmf.log' \) -delete \
    && echo "end"

VOLUME /wiki
WORKDIR /wiki

EXPOSE 80

CMD ["gollum", "--port", "80"]

# CMD ["bash"]

# $ docker build -t bgollum /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bgollum/
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