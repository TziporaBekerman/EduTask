import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "../../API/assignmentsApi";
// ייבוא פונקציות לשליפת ההגשות של הסטודנט ויצירת הגשה חדשה
import { getMySubmissions, createSubmission } from "../../API/submissionsApi";
import Errors from "../../common/Errors";

export default function AssignmentDetails() {
  const { id: assignmentId } = useParams();

  const [assignment, setAssignment] = useState(null);
  // ההגשה הקיימת של הסטודנט למטלה זו (אם קיימת)
  const [submission, setSubmission] = useState(null);
  // תוכן ההגשה שהסטודנט מקליד בטופס
  const [content, setContent] = useState("");
  // הודעת שגיאה להצגה
  const [error, setError] = useState("");

  // שליפת פרטי המשתמש מהטוקן
  const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

  // טעינת פרטי המטלה וההגשה הקיימת במקביל בטעינה ראשונית
  useEffect(() => {
    const fetchData = async () => {
      // Promise.all מריץ את שתי הבקשות במקביל לחיסכון בזמן
      const [a, s] = await Promise.all([
        getAssignmentById(assignmentId),
        getMySubmissions()
      ]);
      // שמירת פרטי המטלה אם הבקשה הצליחה
      if (a.success) setAssignment(a.assignment);
      if (s.success) {
        // חיפוש הגשה קיימת של הסטודנט למטלה הנוכחית לפי assignmentId
        const found = s.submissions.find((sub) => sub.assignmentId == assignmentId);
        if (found) setSubmission(found);
      }
    };
    fetchData();
  }, []);

  // פונקציה שרצה בעת לחיצה על כפתור הגש
  const handleSubmit = async (e) => {
    // מניעת רענון דף
    e.preventDefault();
    setError("");
    // שליחת ההגשה לשרת עם ה-id של המטלה והתוכן
    const res = await createSubmission({ assignmentId, content });
    if (res.success) {
      // עדכון ה-state עם ההגשה החדשה שהתקבלה מהשרת
      setSubmission(res.submission);
    } else {
      setError(res.message);
    }
  };

  // מיפוי סטטוס מאנגלית לעברית
  const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

  // כל עוד המטלה לא נטענה — מציג טוען
  if (!assignment) return <div className="page">טוען...</div>;

  return (
    <div className="page">
      <h2>{assignment.title}</h2>
      <p>{assignment.description}</p>
      <p>תאריך סגירה: {assignment.closeDate?.slice(0, 16).replace("T", " ")}</p>

      {/* אם כבר הוגשה — מציג פרטי ההגשה, אחרת מציג טופס הגשה */}
      {submission ? (
        <div>
          <h3>ההגשה שלך</h3>
          <p>סטטוס: {statusLabel[submission.status]}</p>
          <p>ציון: {submission.grade ?? "-"}</p>
          <p>הערת מרצה: {submission.lecturerComment || "-"}</p>
        </div>
      ) : (
        <form className="data-form" onSubmit={handleSubmit}>
          <h3>הגשת מטלה</h3>
          <textarea placeholder="תוכן ההגשה" value={content} onChange={(e) => setContent(e.target.value)} required />
          <Errors showError={error} setShowError={setError} />
          <div className="form-actions">
            <button type="submit">הגש</button>
          </div>
        </form>
      )}
    </div>
  );
}
