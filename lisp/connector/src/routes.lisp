(in-package #:connector)

(defun json-response (data &key (status 200))
  (setf (hunchentoot:return-code*) status
        (hunchentoot:content-type*) "application/json"
        (hunchentoot:header-out "Access-Control-Allow-Origin") "*")
  (if (stringp data)
      (format nil "{\"data\": \"~A\"}" data)
      (format nil "{\"data\": ~A}" (stringify data))))

(defstruct info-dto
  (name *service-name*)
  (port *service-port*)
  (inputTable (input-table-to-list)))

(defroute alive ("/alive" :method :get) ()
  (json-response t))

(defroute services ("/services" :method :get) ()
  (json-response (service-entries-to-structured-list (find-services))))

(defroute info ("/info" :method :get) ()
  (let ((outp-dto (make-info-dto)))
    (json-response outp-dto)))

(defroute input ("/input/:input-name" :method :get) ()
  (if (gethash input-name *input-table*)
      (let* ((inp (gethash input-name *input-table*))
             (output (funcall (input-type-action inp))))
        (json-response output))
      (json-response "bad request" :status 400)))
