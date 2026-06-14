import { useState, useEffect } from "react";
import { getAllSubmissions, gradeSubmission } from "../../API/submissionsApi";
import { getAllUsers } from "../../API/usersApi";
import { getAllAssignments } from "../../API/assignmentsApi";
import Table from "../../common/Table";

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

  const columns = [
    { label: "סטודנט", render: (s) => getName(s.studentId) },
    { label: "מטלה", render: (s) => getTitle(s.assignmentId) },
    { label: "תאריך הגשה", render: (s) => s.submitDate?.slice(0, 16).replace("T", " ") || "-" },
    { label: "סטטוס", render: (s) => statusLabel[s.status] },
    { label: "ציון", render: (s) => s.grade ?? "-" },
    { label: "קובץ", render: (s) => s.filePath ? <a href={`http://localhost:5000/${s.filePath}`} target="_blank" rel="noreferrer">פתח קובץ</a> : "-" },
    { label: "פעולות", render: (s) => s.status !== "unsubmitted" && (
      <button onClick={() => { setSelectedId(s.id); setGradeForm({ grade: s.grade ?? "", lecturerComment: s.lecturerComment ?? "" }); }}>
        {s.status === "checked" ? "עריכת ציון" : "בדיקה וציון"}
      </button>
    )},
  ];

  return (
    <div className="page">
      <h2>הגשות וציונים</h2>

      {selectedId && (
        <form className="data-form" onSubmit={handleGrade}>
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

      <Table columns={columns} data={submissions} />
    </div>
  );
}
