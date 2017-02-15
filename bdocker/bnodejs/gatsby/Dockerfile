FROM bnodejs

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
    # Gatsby 使用 React 生态系统来生成静态 html 文件。
    # 事实上，您可以组合 React 组件，Markdown 文件和服务器端渲染使它非常强大。
    && cnpm install -g gatsby \
    && echo "end"

VOLUME /web
WORKDIR /web

EXPOSE 8000

ENTRYPOINT [ "gatsby", "develop" ]

# CMD ["bash"]

# $ docker build -t bnodejs /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bnodejs/
# $ docker run -it --rm bnodejs
# docker build -t bnodejs B:\OpenSource\WaterBolik\prestudy\bdocker\bnodejs\
# docker run -it --rm bnodejs 