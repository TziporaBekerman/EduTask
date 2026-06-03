USE assignment_system;

-- GROUPS
INSERT INTO StudentGroups (name) VALUES
('Group A'),
('Group B'),
('Group C');

-- USERS
INSERT INTO Users (id, name, email, password, role, groupId) VALUES
(1, 'System Admin', 'admin@college.com', 'admin123', 'admin', NULL),
(2, 'David Cohen', 'david@college.com', 'pass123', 'lecturer', NULL),
(3, 'Sarah Levi', 'sarah@college.com', 'pass123', 'lecturer', NULL),
(4, 'Moshe Azulay', 'moshe@college.com', 'pass123', 'student', 1),
(5, 'Yaakov Green', 'yaakov@college.com', 'pass123', 'student', 1),
(6, 'Rivka Ben David', 'rivka@college.com', 'pass123', 'student', 2),
(7, 'Chana Weiss', 'chana@college.com', 'pass123', 'student', 2),
(8, 'Noam Shalev', 'noam@college.com', 'pass123', 'student', 3);

-- ASSIGNMENTS
INSERT INTO Assignments
(id, title, description, groupId, lecturerId, openDate, closeDate)
VALUES
(
 1,
 'React Components',
 'Build a React application with reusable components',
 1,
 2,
 '2026-05-01 08:00:00',
 '2026-05-15 23:59:59'
),
(
 2,
 'Node REST API',
 'Create REST API using Express',
 2,
 2,
 '2026-05-03 08:00:00',
 '2026-05-18 23:59:59'
),
(
 3,
 'MySQL Database Design',
 'Design relational database for school system',
 3,
 3,
 '2026-05-05 08:00:00',
 '2026-05-20 23:59:59'
);

-- SUBMISSIONS
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
(1,4,'/uploads/react_moshe.zip','2026-05-10 14:30:00','Finished all requirements',95,'Excellent work','checked'),
(1,5,'/uploads/react_yaakov.zip','2026-05-12 10:15:00','Added extra features',88,'Good solution','checked'),
(2,6,'/uploads/api_rivka.zip','2026-05-16 18:45:00','Implemented authentication',NULL,NULL,'submitted'),
(2,7,NULL,NULL,NULL,NULL,NULL,'unsubmitted'),
(3,8,'/uploads/mysql_noam.zip','2026-05-22 09:00:00','Submitted after deadline',75,'Late submission','late');