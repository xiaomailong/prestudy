#!/bin/bash

countfile=/tmp/count

if ! [ -f $countfile ]
then
    echo 0 > $countfile
fi

do_count () {
    read count < $countfile
    echo $((++count)) > $countfile
}

for i in `seq 1 100`
do
     do_count &
done

wait

cat $countfile

rm $countfile
