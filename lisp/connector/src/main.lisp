(uiop:define-package connector
  (:use #:cl #:easy-routes #:frugal-uuid #:sqlite #:com.inuoe.jzon)
  (:export #:init #:make-input))
(in-package #:connector)

(defstruct input-type
  name
  (type :button)
  action
  (output :text))

(defparameter *acceptor* nil)
(defparameter *service-name* "")
(defparameter *service-port* nil)
(defparameter *input-table* (make-hash-table :test 'equal))

(defun init (name)
  (init-db)
  (let ((id (fuuid:to-string (fuuid:make-v4))))
    (setf *service-port* (get-port-num))
    (setf *acceptor* (make-instance 'easy-routes:easy-routes-acceptor :port *service-port*))
    (setf *service-name* (format nil "~A:~A" name id))
    (add-service *service-name* *service-port*))

  (unless (hunchentoot:started-p *acceptor*)
    (hunchentoot:start *acceptor*))

  (format t "~A connector started as: ~A" name *service-name*))

(defun input-table-to-list ()
  (loop :for val :being :the :hash-values :of *input-table*
        :collect val))

(defun make-input (&key name type action output)
  (when (gethash name *input-table*)
    (error (format nil "Input with name [~A] already exists." name)))

  (let ((inp (make-input-type :name name :type type :action action :output output)))
    (setf (gethash name *input-table*) inp))
  t)
