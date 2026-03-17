(in-package #:connector)

(defparameter *database-path* nil)
(defparameter *db* nil)

(defun database-path ()
  (or *database-path*
      (merge-pathnames
       "connector/database.db"
       (uiop:xdg-data-home))))

(defun ensure-data-dir ()
  (ensure-directories-exist (database-path)))

(defun rm-self ()
  (when *db*
    (execute-non-query
     *db*
     "DELETE FROM services WHERE name = ?" *service-name*)
    (disconnect *db*)))

(defun setup-schema ()
  (execute-non-query *db* "CREATE TABLE IF NOT EXISTS services (
    name TEXT PRIMARY KEY,
    port INTEGER
   );"))

(defun init-db ()
  (ensure-data-dir)
  (setf *db* (connect (namestring (database-path))))
  (sqlite:execute-non-query *db* "PRAGMA journal_mode=WAL;")
  (setup-schema)
  (push #'rm-self sb-ext:*exit-hooks*)
  t)

(defstruct service-entry
  name
  port)

(defun service-entries-to-structured-list (2dlist)
  (loop :for pair :in 2dlist
        :collect (make-service-entry :name (nth 0 pair)
                                     :port (nth 1 pair))))

(defun find-services ()
  (execute-to-list *db* "SELECT * FROM services;"))

(defun add-service (name port)
  (execute-non-query
   *db*
   "INSERT OR REPLACE INTO services (name, port) VALUES (?, ?)"
   name port))

(defun get-port-num ()
  (if (eql (find-services) nil)
      3001
      (let ((ports (map 'list
                        (lambda (db-entry) (nth 1 db-entry))
                        (find-services))))
        (1+ (apply #'max ports)))))
