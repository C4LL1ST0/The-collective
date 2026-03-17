(defsystem "connector"
  :version "0.0.1"
  :author "Štěpán Bílek"
  :license ""
  :depends-on (#:easy-routes #:hunchentoot #:frugal-uuid #:sqlite #:com.inuoe.jzon)
  :components ((:module "src"
                :components
                ((:file "main")
                 (:file "routes")
                 (:file "db"))))
  :description "Connecotr between lisp programs and web UI."
  :in-order-to ((test-op (test-op "connector/tests"))))

(defsystem "connector/tests"
  :author ""
  :license ""
  :depends-on ("connector"
               "rove")
  :components ((:module "tests"
                :components
                ((:file "main"))))
  :description "Test system for connector"
  :perform (test-op (op c) (symbol-call :rove :run c)))
