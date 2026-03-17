(defpackage connector/tests/main
  (:use :cl
        :connector
        :rove))
(in-package :connector/tests/main)

;; NOTE: To run this test file, execute `(asdf:test-system :connector)' in your Lisp.

(deftest test-target-1
  (testing "should (= 1 1) to be true"
    (ok (= 1 1))))
