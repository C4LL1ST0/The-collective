FROM debian:bookworm

RUN apt update && apt install -y sbcl cl-quicklisp

RUN sbcl \
  --load /usr/share/common-lisp/source/quicklisp/quicklisp.lisp \
  --eval '(quicklisp-quickstart:install :path "/quicklisp")' \
  --eval '(ql-util:without-prompting (ql:add-to-init-file))' \
  --quit

RUN mkdir -p /programs
COPY lisp /programs/

RUN mkdir -p /quicklisp/local-projects
RUN cp -r /programs/connector /quicklisp/local-projects/

WORKDIR /programs

RUN chmod +x .build-all.sh .run-all.sh
RUN bash .build-all.sh

EXPOSE 3001-3100

CMD ["./.run-all.sh"]
