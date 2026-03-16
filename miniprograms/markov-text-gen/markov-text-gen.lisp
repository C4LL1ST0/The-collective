(ql:quickload :connector)

(defparameter dict (make-hash-table :test #'equal))
(defparameter training-text (uiop:read-file-string "markov-gen-input.txt"))
(setf training-text (string-upcase training-text))
(defparameter training-words (uiop:split-string training-text))

(defun prepare-table ()
  (loop :for i :from 0 :below (1- (length training-words)) :do
    (let* ((current-word (nth i training-words))
           (next-word (nth (1+ i) training-words)))

      (if (gethash current-word dict)
          (push next-word (gethash current-word dict))
          (setf (gethash current-word dict) (list next-word)))))
  t)

(defun generate ()
  (let* ((start-word (nth (random (length training-words)) training-words))
         (output (loop :for i :from 0 :to 30
                       :with prev-word := start-word
                       :collect prev-word
                       :do (let ((options (gethash prev-word dict)))
                             (setf prev-word (if (= (length options) 0)
                                                 "."
                                                 (nth (random (length options)) options)))))))
    output))

(defun list-to-string (input)
  (string-trim " " (reduce (lambda (x y) (concatenate 'string x y))
                           (loop :for word :in input
                                 :collect (if (equal word ".")
                                              word
                                              (format nil " ~A" word))))))

(defun make-text ()
  (let ((outp (list-to-string (generate))))
    (princ outp)
    outp))


(defun main ()
  (connector:init "markov-text-gen")
  (prepare-table)

  ;; navazani make-text na tlacitko
  (connector:make-input :name "generovat" :type :button :action #'make-text :output :text)
  (connector:make-input :name "trenovat" :type :button :action #'prepare-table :output :none)

  (sleep most-positive-fixnum))
