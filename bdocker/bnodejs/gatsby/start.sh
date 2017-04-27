#!/bin/bash

docker run -it --rm -v /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bnodejs/gatsby/web:/web bnodejs

gatsby new web

cd /web

# localhost:8000
gatsby develop