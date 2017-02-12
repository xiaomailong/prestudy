FROM balpine

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
  # 安装python2及其常用库
  && apk add --update --no-cache \   
    build-base \
    g++ \
    linux-headers \
    musl-dev \
    lapack-dev \
    freetype-dev \
    gfortran \
    python \
    python2-dev \
    py2-pip \
    # py2-pytest \
    py2-pillow \
    py2-lxml \
  && ln -s /usr/include/locale.h /usr/include/xlocale.h \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade --force-reinstall pip \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade numpy \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade scipy \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade pytz \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade pandas \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade matplotlib \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade regex \
  && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade pytest \

  && echo "end"


CMD ["bash"]

# $ docker build -t bpython /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bpython/.
# $ docker run -it --rm  -v /Volumes/Work/OpenSource/WaterBolik/prestudy/python/PyTest:/pytest bpython
# docker build -t bpython B:\OpenSource\WaterBolik\prestudy\bdocker\bpython\
# docker run -it --rm  -v /B/OpenSource/WaterBolik/prestudy/python/PyTest:/pytest bpython 