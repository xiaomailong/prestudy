FROM bubuntu

MAINTAINER Bolik WaterBolik@163.com


RUN set -ex \ 
  && apt-get -qqy update \
  && apt-get -qqy upgrade \
  && apt-get -qqy install --no-install-recommends \
    # X 窗口系统
    # x-window-system-core \
    # 登录管理器 GDM、KDM、XDM 选其一
    # gdm \
    # kdm \
    # xdm \
    # 桌面环境 (ubuntu-desktop/kubuntu-desktop/xubuntu-desktop)选其一
    # ubuntu-desktop \
    # kubuntu-desktop \
    # xubuntu-desktop \
    # GNOME、KDE、XFCE 桌面环境最小化 (gnome-core/kde-core/xfce4)选其一
    # gnome-core \
    # kde-core \
    # Xfce 是一款适用于多种 *NIX 系统的轻量级桌面环境。
    # 它被设计用来提高您的效率，在节省系统资源的同时，能够快速加载和执行应用程序。 
    # xfce4 \
    # 窗口管理器 选其一
    # fluxbox \
    # icewm \
    # enlightenment \
    # fvwm \
  && echo "end"

CMD ["bin/bash"]  

# $ docker build -t bubuntu-desktop /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bubuntu-desktop/
# docker build -t bubuntu-desktop B:\OpenSource\WaterBolik\prestudy\bdocker\bubuntu-desktop\
# docker run -it --rm bubuntu-desktop 