(ql:quickload :connector)

(defun arr-merge (a b)
  (let ((outp (make-array (+ (length a) (length b))))
        (outp-len 0))
    (loop :with a-index := 0
          :with b-index := 0
          :for out-index :from 0
          :while (not (and (= b-index (length b))
                           (= a-index (length a))))
          :do (cond
                ((= a-index (length a))
                 (setf (aref outp out-index) (aref b b-index))
                 (incf b-index))

                ((= b-index (length b))
                 (setf (aref outp out-index) (aref a a-index))
                 (incf a-index))

                ((= (aref a a-index) (aref b b-index))
                 (setf (aref outp out-index) (aref a a-index))
                 (incf a-index)
                 (incf b-index))

                ((> (aref a a-index) (aref b b-index))
                 (setf (aref outp out-index) (aref b b-index))
                 (incf b-index))

                (t
                 (setf (aref outp out-index) (aref a a-index))
                 (incf a-index)))
              (setf outp-len (1+ out-index)))

    (adjust-array outp outp-len)))


(defparameter a (make-array 6 :initial-contents '(1 7 9 13 17 102)))
(defparameter b (make-array 9 :initial-contents '(1 2 3 7 9 13 19 27 145)))
(print (arr-merge a b))

(defun list-to-string (input)
  (string-trim " " (reduce (lambda (x y) (concatenate 'string x y))
                           (loop :for word :in (coerce input 'list)
                                 :collect (if (equal word ".")
                                              word
                                              (format nil " ~A" word))))))

(defun make-text ()
  (let ((outp (list-to-string (arr-merge a b))))
    (princ outp)
    outp))


(defun main ()
  (connector:init "sorted-array-merge")

  (connector:make-input :name "serad" :type :button :action #'make-text :output :text)

  (sleep most-positive-fixnum))
