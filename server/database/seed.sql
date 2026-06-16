USE assignment_system;

-- GROUPS
INSERT INTO StudentGroups (name) VALUES
('קבוצה א'),
('קבוצה ב'),
('קבוצה ג');

-- USERS
INSERT INTO Users (id, name, email, password, role, groupId) VALUES
(1, 'מנהלת מערכת', 'admin@college.com', 'admin123', 'admin', NULL),
(2, 'ד"ר רחל לוי', 'rachel@college.com', 'pass123', 'lecturer', NULL),
(3, 'פרופ מרים כץ', 'miriam@college.com', 'pass123', 'lecturer', NULL),
-- קבוצה א
(4,  'נועה כהן',      'noa@college.com',     'pass123', 'student', 1),
(5,  'תמר גולן',      'tamar@college.com',    'pass123', 'student', 1),
(6,  'שירה אברהם',    'shira@college.com',    'pass123', 'student', 1),
(7,  'מיכל דוד',      'michal@college.com',   'pass123', 'student', 1),
-- קבוצה ב
(8,  'אורית פרץ',     'orit@college.com',     'pass123', 'student', 2),
(9,  'דנה שפירא',     'dana@college.com',     'pass123', 'student', 2),
(10, 'יעל ביטון',     'yael@college.com',     'pass123', 'student', 2),
(11, 'הדס מזרחי',     'hadas@college.com',    'pass123', 'student', 2),
-- קבוצה ג
(12, 'ליאור חיים',    'lior@college.com',     'pass123', 'student', 3),
(13, 'רוני אשכנזי',   'roni@college.com',     'pass123', 'student', 3),
(14, 'גל בן דוד',     'gal@college.com',      'pass123', 'student', 3),
(15, 'עדי שלום',      'adi@college.com',      'pass123', 'student', 3);

-- =========================
-- ASSIGNMENTS - קבוצה א (רחל לוי)
-- =========================
INSERT INTO Assignments (id, title, description, groupId, lecturerId, openDate, closeDate) VALUES
(1,  'HTML פורטפוליו',         'בנייה אתר פורטפוליו אישי',                      1, 2, '2026-05-01 08:00:00', '2026-06-17 23:59:59'),
(2,  'CSS רספונסיבי',          'עיצוב רספונסיבי עם Flexbox ו-Grid',             1, 2, '2026-05-05 08:00:00', '2026-06-17 23:59:59'),
(3,  'JavaScript DOM',         'פרויקט מניפולציה על DOM',                       1, 2, '2026-05-10 08:00:00', '2026-06-17 23:59:59'),
(4,  'React קומפוננטות',       'בניית אפליקציה עם קומפוננטות לשימוש חוזר',      1, 2, '2026-05-15 08:00:00', '2026-06-18 23:59:59'),
(5,  'React Router',           'SPA עם ניתוב באמצעות React Router',             1, 2, '2026-05-20 08:00:00', '2026-06-18 23:59:59'),
(6,  'Node.js REST API',       'בניית REST API עם Express',                     1, 2, '2026-05-25 08:00:00', '2026-06-18 23:59:59'),
(7,  'JWT אותנטיקציה',         'מימוש אותנטיקציה עם JWT',                       1, 2, '2026-06-01 08:00:00', '2026-06-18 23:59:59'),
(8,  'MySQL מסד נתונים',       'עיצוב מסד נתונים רלציוני',                      1, 2, '2026-06-03 08:00:00', '2026-06-19 23:59:59'),
(9,  'פרויקט גמר',             'אפליקציית Full Stack מלאה',                     1, 2, '2026-06-05 08:00:00', '2026-06-20 23:59:59'),
(10, 'Unit Testing',           'כתיבת בדיקות עם Jest',                          1, 2, '2026-06-07 08:00:00', '2026-06-21 23:59:59');

-- =========================
-- ASSIGNMENTS - קבוצה ב (מרים כץ)
-- =========================
INSERT INTO Assignments (id, title, description, groupId, lecturerId, openDate, closeDate) VALUES
(11, 'Python בסיסי',           'תכנות Python למתחילים',                         2, 3, '2026-05-01 08:00:00', '2026-05-18 23:59:59'),
(12, 'עיבוד טקסט Python',      'עבודה עם מחרוזות וקבצים ב-Python',             2, 3, '2026-05-05 08:00:00', '2026-05-22 23:59:59'),
(13, 'NumPy ו-Pandas',         'ניתוח נתונים עם NumPy ו-Pandas',               2, 3, '2026-05-10 08:00:00', '2026-05-28 23:59:59'),
(14, 'Machine Learning בסיסי', 'מודלים בסיסיים עם scikit-learn',               2, 3, '2026-05-20 08:00:00', '2026-06-05 23:59:59'),
(15, 'Deep Learning',          'רשתות נוירונים עם TensorFlow',                  2, 3, '2026-06-01 08:00:00', '2026-06-18 23:59:59'),
(16, 'NLP',                    'עיבוד שפה טבעית',                               2, 3, '2026-06-05 08:00:00', '2026-06-20 23:59:59');

-- =========================
-- ASSIGNMENTS - קבוצה ג (מרים כץ)
-- =========================
INSERT INTO Assignments (id, title, description, groupId, lecturerId, openDate, closeDate) VALUES
(17, 'אלגוריתמים בסיסיים',    'מיון וחיפוש',                                   3, 3, '2026-05-01 08:00:00', '2026-05-20 23:59:59'),
(18, 'מבני נתונים',            'מחסנית, תור, עץ',                               3, 3, '2026-05-10 08:00:00', '2026-05-28 23:59:59'),
(19, 'תכנות מונחה עצמים',     'מחלקות ועצמים ב-Java',                          3, 3, '2026-06-01 08:00:00', '2026-06-18 23:59:59'),
(20, 'Design Patterns',        'תבניות עיצוב תוכנה',                            3, 3, '2026-06-05 08:00:00', '2026-06-20 23:59:59');


-- =========================
-- נועה כהן (id=4) — כל הווריאציות
-- =========================
INSERT INTO Submissions (assignmentId, studentId, filePath, submitDate, studentComment, grade, lecturerComment, status) VALUES

-- checked עם ציון גבוה
(1, 4, 'uploads/_הגשת נושא.pdf',
'2026-05-18 14:00:00', 'השלמתי את כל הדרישות', 95, 'עבודה מצוינת', 'checked'),

-- checked עם ציון בינוני
(2, 4, 'uploads/-פתרון תרגיל כיתה 5 מעה לא למתן ציון למשוב בלבד.pdf',
'2026-05-23 10:00:00', 'עיצוב רספונסיבי מלא', 78, 'טוב, אך יש מקום לשיפור', 'checked'),

-- checked עם ציון נמוך
(3, 4, 'uploads/-פתרון תרגיל כיתה 5 מעה לא למתן ציון למשוב בלבד.pdf 2.pdf',
'2026-05-28 16:30:00', 'ניסיתי כמיטב יכולתי', 65, 'הקוד לא מספיק נקי', 'checked'),

-- submitted — ממתין לבדיקה
(4, 4, 'uploads/215688377_X4485986.pdf',
'2026-06-03 11:00:00', 'מחכה למשוב', NULL, NULL, 'submitted'),

-- submitted — ממתין לבדיקה
(5, 4, 'uploads/NLP.pdf',
'2026-06-07 09:30:00', 'הוספתי תכונות נוספות', NULL, NULL, 'submitted'),

-- submitted — ממתין לבדיקה
(6, 4, 'uploads/מצגת לבינה.pdf',
'2026-06-09 20:00:00', 'REST API מלא עם כל הנקודות', NULL, NULL, 'submitted'),

-- לא הוגש — תאריך עתידי (ממתין)
-- אין רשומה למטלה 7 (JWT) — תופיע ב-pending

-- לא הוגש — תאריך עתידי (ממתין)
-- אין רשומה למטלה 8 (MySQL) — תופיע ב-pending

-- לא הוגש — תאריך עתידי (ממתין)
-- אין רשומה למטלה 9 (פרויקט גמר) — תופיע ב-pending

-- לא הוגש — תאריך עתידי (ממתין)
-- אין רשומה למטלה 10 (Unit Testing) — תופיע ב-pending
(10, 4, 'uploads/סריקה_20260529.pdf',
'2026-06-10 08:00:00', 'כתבתי בדיקות מקיפות', NULL, NULL, 'submitted');


-- =========================
-- תמר גולן (id=5)
-- =========================
INSERT INTO Submissions (assignmentId, studentId, filePath, submitDate, studentComment, grade, lecturerComment, status) VALUES
(1, 5, 'uploads/פיזיקה .pdf', '2026-05-19 10:00:00', 'עבודה מסודרת', 88, 'יפה מאוד', 'checked'),
(2, 5, 'uploads/תרגיל כיתה 5 מעה לא למתן ציון למשוב בלבד.pdf', '2026-05-24 14:00:00', 'עיצוב נקי', 92, 'מצוין', 'checked'),
(3, 5, 'uploads/מצגת לבינה.pdf', '2026-05-29 16:00:00', 'DOM מלא', NULL, NULL, 'submitted'),
(4, 5, 'uploads/NLP.pdf', '2026-06-04 11:00:00', 'קומפוננטות מודולריות', NULL, NULL, 'submitted');

-- =========================
-- שירה אברהם (id=6)
-- =========================
INSERT INTO Submissions (assignmentId, studentId, filePath, submitDate, studentComment, grade, lecturerComment, status) VALUES
(1, 6, 'uploads/סריקה_20260529.pdf', '2026-05-17 09:00:00', 'פורטפוליו מלא', 100, 'מושלם!', 'checked'),
(2, 6, 'uploads/215688377_X4485986.pdf', '2026-05-22 13:00:00', 'רספונסיבי לחלוטין', 95, 'עבודה מעולה', 'checked'),
(4, 6, 'uploads/_הגשת נושא.pdf', '2026-06-02 10:00:00', NULL, NULL, NULL, 'submitted');

-- =========================
-- מיכל דוד (id=7)
-- =========================
INSERT INTO Submissions (assignmentId, studentId, filePath, submitDate, studentComment, grade, lecturerComment, status) VALUES
(1, 7, 'uploads/NLP.pdf', '2026-05-20 15:00:00', 'השלמתי', 72, 'צריך לשפר', 'checked'),
(3, 7, 'uploads/מצגת לבינה.pdf', '2026-05-31 17:00:00', 'DOM בסיסי', NULL, NULL, 'submitted');

-- =========================
-- קבוצה ב — הגשות נבחרות
-- =========================
INSERT INTO Submissions (assignmentId, studentId, filePath, submitDate, studentComment, grade, lecturerComment, status) VALUES
(11, 8,  'uploads/פיזיקה .pdf',   '2026-05-15 10:00:00', 'Python בסיסי', 85, 'טוב מאוד', 'checked'),
(11, 9,  'uploads/NLP.pdf',        '2026-05-16 11:00:00', 'השלמתי הכל', 90, 'מצוין', 'checked'),
(12, 8,  'uploads/מצגת לבינה.pdf','2026-05-20 14:00:00', 'עבודה עם קבצים', 88, 'יפה', 'checked'),
(13, 9,  'uploads/סריקה_20260529.pdf', '2026-05-25 09:00:00', 'ניתוח נתונים', NULL, NULL, 'submitted'),
(14, 10, 'uploads/215688377_X4485986.pdf', '2026-06-03 10:00:00', 'מודל בסיסי', NULL, NULL, 'submitted'),
(15, 11, 'uploads/_הגשת נושא.pdf', '2026-06-10 08:00:00', 'רשת נוירונים', NULL, NULL, 'submitted'),
(16, 8,  'uploads/NLP.pdf',        '2026-06-12 10:00:00', 'NLP מלא', NULL, NULL, 'submitted');

-- =========================
-- קבוצה ג — הגשות נבחרות
-- =========================
INSERT INTO Submissions (assignmentId, studentId, filePath, submitDate, studentComment, grade, lecturerComment, status) VALUES
(17, 12, 'uploads/תרגיל כיתה 5 מעה לא למתן ציון למשוב בלבד.pdf', '2026-05-18 10:00:00', 'מיון ב-O(n log n)', 91, 'מצוין', 'checked'),
(17, 13, 'uploads/פיזיקה .pdf', '2026-05-19 11:00:00', 'חיפוש בינארי', 84, 'טוב', 'checked'),
(18, 12, 'uploads/מצגת לבינה.pdf', '2026-05-26 14:00:00', 'עץ בינארי', NULL, NULL, 'submitted'),
(18, 14, 'uploads/NLP.pdf', '2026-05-27 15:00:00', 'תור ומחסנית', NULL, NULL, 'submitted'),
(19, 15, 'uploads/סריקה_20260529.pdf', '2026-06-10 09:00:00', 'OOP מלא', NULL, NULL, 'submitted'),
(20, 12, 'uploads/215688377_X4485986.pdf', '2026-06-12 11:00:00', 'Design Patterns', NULL, NULL, 'submitted');
