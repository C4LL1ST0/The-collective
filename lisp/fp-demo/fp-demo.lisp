(ql:quickload :connector)

(defun compose (&rest fns)
  (lambda (args)
    (reduce (lambda (acc f) (funcall f acc)) fns :initial-value args)))

(defstruct user
  name
  role
  passwd)

(defun trim (user)
  (let ((trimmed-name (string-trim '(#\space) (user-name user))))
    (make-user :name trimmed-name
               :role (user-role user)
               :passwd (user-passwd user))))

(defun add-role (role)
  (lambda (user)
    (make-user :name (user-name user)
               :role role
               :passwd (user-passwd user))))

(defun log-user (user)
  (print user)
  user)

(defparameter *pipeline*
  (compose #'trim (add-role 'admin) #'log-user))

(defparameter *karel* (make-user :name "  Karel " :role nil :passwd "heslo123"))

(defun make-output ()
  (with-output-to-string (s)
    (princ (funcall *pipeline* *karel*) s)))

(defun main ()
  (connector:init "fp-demo")
  (connector:make-input :name "call function pipeline"
                        :type :button
                        :action #'make-output
                        :output :text)
  (sleep most-positive-fixnum))
