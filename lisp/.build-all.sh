#!/bin/bash

for service in ./*; do
    echo "$service"
    cd "$service"
    pwd
    sbcl --load "$service.lisp" --load build.lisp
    cd ..
done
