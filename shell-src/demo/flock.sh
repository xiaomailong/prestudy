#!/bin/bash

countfile=/tmp/count

if ! [ -f $countfile ]
then
    echo 0 > $countfile
fi

do_count () {
    exec 3< $countfile
    #对三号描述符加互斥锁
    flock -x 3
    read -u 3 count
    echo $((++count)) > $countfile
    #解锁
    flock -u 3
    #关闭描述符也会解锁
    exec 3>&-
}

for i in `seq 1 100`
do
     do_count &
done

wait

cat $countfile

rm $countfile
