#!/bin/bash

while [ 1 ]
do
	sleep $(( ($RANDOM % 10) * 100))
	osascript -e "set Volume 2" # 主动设置音量大小
	say -v Whisper i
	osascript -e "set Volume 0" # 消音
done
