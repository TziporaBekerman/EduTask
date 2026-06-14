import { useState, useEffect } from "react";
// ייבוא פונקציה לשליפת כל המטלות מה-API
import { getAllAssignments } from "../../API/assignmentsApi";
// ייבוא hook לניווט בין דפים
import { useNavigate } from "react-router-dom";

export default function StudentAssignments() {
  // רשימת המטלות שתתמלא מהשרת
  const [assignments, setAssignments] = useState([]);
  // hook לניווט — ישמש למעבר לדף פרטי מטלה
  const navigate = useNavigate();

  // טעינת המטלות מהשרת בטעינה ראשונית בלבד
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAssignments();
      // אם הבקשה הצליחה — שמור את המטלות ב-state
      if (res.success) setAssignments(res.assignments);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <h2>מטלות</h2>
      {/* טבלת המטלות */}
      <table className="data-table">
        <thead>
          {/* כותרות הטבלה */}
          <tr><th>כותרת</th><th>תיאור</th><th>פתיחה</th><th>סגירה</th><th>פעולות</th></tr>
        </thead>
        <tbody>
          {/* רינדור דינמי של כל מטלה כשורה בטבלה */}
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              {/* אם אין תיאור — מציג מקף */}
              <td>{a.description || "-"}</td>
              {/* חיתוך התאריך ל-16 תווים להסרת שניות, והחלפת T ברווח */}
              <td>{a.openDate?.slice(0, 16).replace("T", " ")}</td>
              <td>{a.closeDate?.slice(0, 16).replace("T", " ")}</td>
              <td>
                {/* לחיצה מנווטת לדף פרטי המטלה לפי ה-ID שלה */}
                <button onClick={() => navigate(`/student/assignments/${a.id}`)}>פרטים</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
