#!/bin/bash

for service in ./*; do
    cd "$service/bin"
    pwd
    "$service" &
    cd ../..
    sleep 1
done

wait
