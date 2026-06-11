import { useState, useEffect } from "react";
import { getAllSubmissions, gradeSubmission } from "../../API/submissionsApi";
import { getAllUsers } from "../../API/usersApi";
import { getAllAssignments } from "../../API/assignmentsApi";

export default function ManageSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [gradeForm, setGradeForm] = useState({ grade: "", lecturerComment: "" });
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [s, u, a] = await Promise.all([getAllSubmissions(), getAllUsers(), getAllAssignments()]);
    if (s.success) setSubmissions(s.submissions);
    if (u.success) setUsers(u.users);
    if (a.success) setAssignments(a.assignments);
  };

  const getName = (id) => users.find((u) => u.id === id)?.name || id;
  const getTitle = (id) => assignments.find((a) => a.id === id)?.title || id;

  const handleGrade = async (e) => {
    e.preventDefault();
    setError("");
    const res = await gradeSubmission(selectedId, gradeForm);
    if (res.success) {
      setSelectedId(null);
      setGradeForm({ grade: "", lecturerComment: "" });
      fetchAll();
    } else {
      setError(res.message);
    }
  };

  const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

  return (
    <div className="admin-page">
      <h2>הגשות וציונים</h2>

      {selectedId && (
        <form className="admin-form" onSubmit={handleGrade}>
          <h3>מתן ציון</h3>
          <input
            type="number" min="0" max="100"
            placeholder="ציון (0-100)"
            value={gradeForm.grade}
            onChange={(e) => setGradeForm((p) => ({ ...p, grade: e.target.value }))}
            required
          />
          <textarea
            placeholder="הערת מרצה"
            value={gradeForm.lecturerComment}
            onChange={(e) => setGradeForm((p) => ({ ...p, lecturerComment: e.target.value }))}
          />
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button type="submit">שמור ציון</button>
            <button type="button" onClick={() => setSelectedId(null)}>ביטול</button>
          </div>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr><th>סטודנט</th><th>מטלה</th><th>תאריך הגשה</th><th>סטטוס</th><th>ציון</th><th>פעולות</th></tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id}>
              <td>{getName(s.studentId)}</td>
              <td>{getTitle(s.assignmentId)}</td>
              <td>{s.submitDate?.slice(0, 16).replace("T", " ") || "-"}</td>
              <td>{statusLabel[s.status]}</td>
              <td>{s.grade ?? "-"}</td>
              <td>
                {s.status !== "checked" && (
                  <button onClick={() => setSelectedId(s.id)}>בדיקה וציון</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
