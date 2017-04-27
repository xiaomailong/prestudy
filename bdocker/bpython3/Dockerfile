FROM balpine

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
  # 安装python3及其常用库
  && apk add --update --no-cache \
    build-base \ 
    g++ \
    linux-headers \
    musl-dev \
    lapack-dev \
    freetype-dev \
    gfortran \
    python3 \
    python3-dev \
    # py3-pytest \
    py3-pillow \
    py3-lxml \
    # libxml2 \
    # libxslt \
  && ln -s /usr/include/locale.h /usr/include/xlocale.h \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade --force-reinstall pip \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade numpy \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade scipy \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade pytz \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade pandas \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade matplotlib \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade regex \
  && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir --upgrade pytest \

  && echo "end"


CMD ["bash"]

# $ docker build -t bpython3 /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/python3/
# $ docker run -it --rm -v /Volumes/Work/OpenSource/WaterBolik/prestudy/python/PyTest:/pytest bpython3
# docker build -t bpython3 B:\OpenSource\WaterBolik\prestudy\bdocker\bpython3\
# docker run -it --rm -v /B/OpenSource/WaterBolik/prestudy/python/PyTest:/pytest bpython3 