(sb-ext:save-lisp-and-die "bin/markov-text-gen"
                          :toplevel #'main
                          :executable t)
