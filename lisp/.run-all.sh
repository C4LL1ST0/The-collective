#!/bin/bash

for service in ./*; do
    if [[ -d  "$service/bin" ]]; then
        cd "$service/bin"
        pwd
        "$service" &
        cd ../..
        sleep 1
    fi
done

wait
