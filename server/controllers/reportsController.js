const reportsModel = require("../models/reportsModel");

// GET /reports/my - סטודנט רואה את ההגשות שלו
const getMyReport = async (req, res) => {
  try {
    const submissions = await reportsModel.getSubmissionsByStudent(req.user.id);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/student/:id - אדמין או מרצה רואה הגשות של תלמיד
const getReportByStudent = async (req, res) => {
  try {
    // שולף את ה-id של התלמיד המבוקש מה-URL
    const { id } = req.params;

    // אם המשתמש המחובר הוא מרצה - צריך לבדוק שהתלמיד שייך אליו
    if (req.user.role === "lecturer") {
      // מביא את פרטי התלמיד מה-DB כדי לדעת באיזו קבוצה הוא
      const student = await reportsModel.getUserById(id);

      // אם התלמיד לא קיים - מחזיר 404
      if (!student) return res.status(404).json({ message: "Student not found" });

      // בודק אם התלמיד שייך לאחת מהקבוצות של המרצה
      const isMyStudent = await reportsModel.isStudentOfLecturer(req.user.id, student.groupId);

      // אם התלמיד לא שלו - חוסם גישה
      if (!isMyStudent) return res.status(403).json({ message: "Access denied" });
    }

    // מביא את כל ההגשות של אותו תלמיד
    const submissions = await reportsModel.getSubmissionsByStudent(id);

    // מחזיר את ההגשות
    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/assignment/:id - אדמין או מרצה רואה הגשות של מטלה
const getReportByAssignment = async (req, res) => {
  try {
    // שולף את ה-id של המטלה המבוקשת מה-URL
    const { id } = req.params;

    // אם המשתמש המחובר הוא מרצה - צריך לבדוק שהמטלה שלו
    if (req.user.role === "lecturer") {
      // מביא את פרטי המטלה מה-DB (id ו-lecturerId בלבד)
      const assignment = await reportsModel.getAssignmentByIdForLecturer(id);

      // אם המטלה לא קיימת - מחזיר 404
      if (!assignment) return res.status(404).json({ message: "Assignment not found" });

      // בודק שה-lecturerId של המטלה תואם למשתמש המחובר
      if (assignment.lecturerId !== req.user.id)
        return res.status(403).json({ message: "Access denied" });
    }

    // מביא את כל ההגשות של אותה מטלה
    const submissions = await reportsModel.getSubmissionsByAssignment(id);

    // מחזיר את ההגשות
    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/group/:id - אדמין או מרצה רואה הגשות של קבוצה
const getReportByGroup = async (req, res) => {
  try {
    // שולף את ה-id של הקבוצה המבוקשת מה-URL
    const { id } = req.params;

    // אם המשתמש המחובר הוא מרצה - בודק שהקבוצה שייכת אליו
    if (req.user.role === "lecturer") {
      // בודק אם יש מטלה של המרצה שמשויכת לקבוצה הזו
      const isMyGroup = await reportsModel.isStudentOfLecturer(req.user.id, id);

      // אם הקבוצה לא שלו - חוסם גישה
      if (!isMyGroup) return res.status(403).json({ message: "Access denied" });
    }

    // מביא את כל ההגשות של כל התלמידים בקבוצה
    const submissions = await reportsModel.getSubmissionsByGroup(id);

    // מחזיר את ההגשות
    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/dashboard - אדמין בלבד
const getDashboard = async (req, res) => {
  try {
    // מביא סטטיסטיקות כלליות על המערכת (כמות משתמשים, הגשות, ציון ממוצע וכו')
    const stats = await reportsModel.getDashboardStats();

    // מחזיר את הנתונים
    return res.status(200).json({ success: true, dashboard: stats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// מייצא את כל הפונקציות כדי שה-routes יוכלו להשתמש בהן
module.exports = { getMyReport, getReportByStudent, getReportByAssignment, getReportByGroup, getDashboard };
