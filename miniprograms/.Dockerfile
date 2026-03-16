FROM debian

RUN apt update

RUN apt install -y sbcl cl-quicklisp git

RUN sbcl \
  --load /usr/share/common-lisp/source/quicklisp/quicklisp.lisp \
  --eval '(quicklisp-quickstart:install :path "/quicklisp")' \
  --eval '(ql-util:without-prompting (ql:add-to-init-file))' \
  --quit

RUN git clone https://github.com/C4LL1ST0/The-collective.git

RUN chmod +x /the-collective/miniprograms/.build-all.sh

RUN cp -r /the-collective/connector /quicklisp

RUN bash /the-collective/miniprograms/.build-all.sh

EXPOSE 3001-3100

CMD ["/the-collective/miniprograms/.run-all.sh"]
