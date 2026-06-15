-- USE assignment_system;

-- -- GROUPS
-- INSERT INTO StudentGroups (name) VALUES
-- ('Group A'),
-- ('Group B'),
-- ('Group C');

-- -- USERS
-- INSERT INTO Users (id, name, email, password, role, groupId) VALUES
-- (1, 'System Admin', 'admin@college.com', 'admin123', 'admin', NULL),
-- (2, 'David Cohen', 'david@college.com', 'pass123', 'lecturer', NULL),
-- (3, 'Sarah Levi', 'sarah@college.com', 'pass123', 'lecturer', NULL),
-- (4, 'Moshe Azulay', 'moshe@college.com', 'pass123', 'student', 1),
-- (5, 'Yaakov Green', 'yaakov@college.com', 'pass123', 'student', 1),
-- (6, 'Rivka Ben David', 'rivka@college.com', 'pass123', 'student', 2),
-- (7, 'Chana Weiss', 'chana@college.com', 'pass123', 'student', 2),
-- (8, 'Noam Shalev', 'noam@college.com', 'pass123', 'student', 3);

-- -- ASSIGNMENTS
-- INSERT INTO Assignments
-- (id, title, description, groupId, lecturerId, openDate, closeDate)
-- VALUES
-- (
--  1,
--  'React Components',
--  'Build a React application with reusable components',
--  1,
--  2,
--  '2026-05-01 08:00:00',
--  '2026-05-15 23:59:59'
-- ),
-- (
--  2,
--  'Node REST API',
--  'Create REST API using Express',
--  2,
--  2,
--  '2026-05-03 08:00:00',
--  '2026-05-18 23:59:59'
-- ),
-- (
--  3,
--  'MySQL Database Design',
--  'Design relational database for school system',
--  3,
--  3,
--  '2026-05-05 08:00:00',
--  '2026-05-20 23:59:59'
-- );

-- -- SUBMISSIONS
-- INSERT INTO Submissions
-- (
--  assignmentId,
--  studentId,
--  filePath,
--  submitDate,
--  studentComment,
--  grade,
--  lecturerComment,
--  status
-- )
-- VALUES
-- (1,4,'/uploads/react_moshe.zip','2026-05-10 14:30:00','Finished all requirements',95,'Excellent work','checked'),
-- (1,5,'/uploads/react_yaakov.zip','2026-05-12 10:15:00','Added extra features',88,'Good solution','checked'),
-- (2,6,'/uploads/api_rivka.zip','2026-05-16 18:45:00','Implemented authentication',NULL,NULL,'submitted'),
-- (2,7,NULL,NULL,NULL,NULL,NULL,'unsubmitted'),
-- (3,8,'/uploads/mysql_noam.zip','2026-05-22 09:00:00','Submitted after deadline',75,'Late submission','late');
USE assignment_system;

-- =========================
-- ASSIGNMENTS FOR GROUP 1
-- =========================

INSERT INTO Assignments
(id, title, description, groupId, lecturerId, openDate, closeDate)
VALUES
(4,'HTML Portfolio','Build personal portfolio website',1,2,'2026-05-20 08:00:00','2026-06-05 23:59:59'),
(5,'CSS Responsive Design','Responsive website using Flexbox',1,2,'2026-05-22 08:00:00','2026-06-08 23:59:59'),
(6,'JavaScript DOM','Interactive DOM project',1,2,'2026-05-24 08:00:00','2026-06-10 23:59:59'),
(7,'React Routing','SPA with React Router',1,2,'2026-05-25 08:00:00','2026-06-11 23:59:59'),
(8,'Redux Store','State management using Redux',1,2,'2026-05-26 08:00:00','2026-06-12 23:59:59'),
(9,'JWT Authentication','Authentication with JWT',1,2,'2026-05-27 08:00:00','2026-06-13 23:59:59'),
(10,'Socket Chat','Real-time chat application',1,2,'2026-05-28 08:00:00','2026-06-14 23:59:59'),
(11,'Docker Basics','Containerize Node application',1,2,'2026-05-29 08:00:00','2026-06-15 23:59:59'),
(12,'Unit Testing','Write Jest tests',1,2,'2026-05-30 08:00:00','2026-06-16 23:59:59'),
(13,'Final Project','Complete full stack application',1,2,'2026-06-01 08:00:00','2026-06-20 23:59:59');



-- =========================
-- MOSHE SUBMISSIONS
-- =========================

INSERT INTO Submissions
(
assignmentId,
studentId,
filePath,
submitDate,
studentComment,
grade,
lecturerComment,
status
)
VALUES

-- checked
(4,4,'/uploads/html_portfolio.zip',
'2026-06-02 18:30:00',
'Completed all pages',
98,
'Outstanding project',
'checked'),

-- checked
(5,4,'/uploads/css_design.zip',
'2026-06-05 20:15:00',
'Responsive for mobile',
90,
'Very good',
'checked'),

-- checked
(6,4,'/uploads/dom_project.zip',
'2026-06-08 17:20:00',
'DOM manipulation finished',
84,
'Need cleaner code',
'checked'),

-- submitted (waiting for lecturer)
(7,4,'/uploads/react_router.zip',
'2026-06-09 12:10:00',
'Waiting for feedback',
NULL,
NULL,
'submitted'),

-- submitted
(8,4,'/uploads/redux.zip',
'2026-06-10 16:00:00',
'Implemented Redux Toolkit',
NULL,
NULL,
'submitted'),

-- late
(9,4,'/uploads/jwt.zip',
'2026-06-15 11:45:00',
'Submitted one day late',
76,
'Late but acceptable',
'late'),

-- late
(10,4,'/uploads/socket.zip',
'2026-06-18 15:00:00',
'Network issue during upload',
69,
'Late submission',
'late'),

-- unsubmitted
(11,4,
NULL,
NULL,
NULL,
NULL,
NULL,
'unsubmitted'),

-- unsubmitted
(12,4,
NULL,
NULL,
NULL,
NULL,
NULL,
'unsubmitted'),

-- submitted
(13,4,
'/uploads/final_project.zip',
'2026-06-17 21:10:00',
'Final version uploaded',
NULL,
NULL,
'submitted');