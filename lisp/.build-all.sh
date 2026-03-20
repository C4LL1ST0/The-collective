#!/bin/bash

for service in ./*; do
    if [[ -e "$service/build.lisp" ]]; then
        echo "$service"
        cd "$service"
        pwd
        sbcl --load "$service.lisp" --load build.lisp
        cd ..
    fi
done
