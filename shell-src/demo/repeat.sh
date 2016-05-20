#!/bin/bash

exec 3> /tmp/.lock

if ! flock -xn 3
then
    echo "already running!"
    exit 1
fi

echo "running!"
sleep 30
echo "ending"

flock -u 3
exec 3>&-
rm /tmp/.lock

exit 0
