FROM debian

RUN apt update

RUN apt install sbcl cl-quicklisp

RUN sbcl \
  --load /usr/share/common-lisp/source/quicklisp/quicklisp.lisp \
  --eval '(quicklisp-quickstart:install :path "/quicklisp")' \
  --eval '(ql-util:without-prompting (ql:add-to-init-file))' \
  --quit

RUN mkdir /lisp
