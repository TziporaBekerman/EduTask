import { useState, useEffect } from "react";
import { getAllUsers } from "../../API/usersApi";
import { getAllAssignments } from "../../API/assignmentsApi";
import { getAllSubmissions } from "../../API/submissionsApi";
import { getAllGroups } from "../../API/groupsApi";

export default function Reports() {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState({ type: "student", id: "" });
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [u, a, g, s] = await Promise.all([
        getAllUsers(), getAllAssignments(), getAllGroups(), getAllSubmissions()
      ]);
      if (u.success) setUsers(u.users);
      if (a.success) setAssignments(a.assignments);
      if (g.success) setGroups(g.groups);
      if (s.success) setSubmissions(s.submissions);
    };
    fetchData();
  }, []);

  const generateReport = () => {
    if (!filter.id) return;

    let filtered = [];

    if (filter.type === "student") {
      filtered = submissions.filter((s) => s.studentId == filter.id);
      setReport(filtered.map((s) => ({
        student: users.find((u) => u.id == s.studentId)?.name,
        assignment: assignments.find((a) => a.id == s.assignmentId)?.title,
        grade: s.grade ?? "-",
        status: s.status,
        comment: s.lecturerComment || "-"
      })));
    } else if (filter.type === "assignment") {
      filtered = submissions.filter((s) => s.assignmentId == filter.id);
      setReport(filtered.map((s) => ({
        student: users.find((u) => u.id == s.studentId)?.name,
        assignment: assignments.find((a) => a.id == s.assignmentId)?.title,
        grade: s.grade ?? "-",
        status: s.status,
        comment: s.lecturerComment || "-"
      })));
    } else if (filter.type === "group") {
      const groupStudents = users.filter((u) => u.groupId == filter.id).map((u) => u.id);
      filtered = submissions.filter((s) => groupStudents.includes(s.studentId));
      setReport(filtered.map((s) => ({
        student: users.find((u) => u.id == s.studentId)?.name,
        assignment: assignments.find((a) => a.id == s.assignmentId)?.title,
        grade: s.grade ?? "-",
        status: s.status,
        comment: s.lecturerComment || "-"
      })));
    }
  };

  const handlePrint = () => window.print();

  const students = users.filter((u) => u.role === "student");
  const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

  return (
    <div className="page">
      <h2>דוחות ציונים</h2>

      <div className="data-form">
        <div className="form-actions">
          <select value={filter.type} onChange={(e) => setFilter({ type: e.target.value, id: "" })}>
            <option value="student">לפי סטודנט</option>
            <option value="assignment">לפי מטלה</option>
            <option value="group">לפי קבוצה</option>
          </select>

          {filter.type === "student" && (
            <select value={filter.id} onChange={(e) => setFilter((p) => ({ ...p, id: e.target.value }))}>
              <option value="">בחר סטודנט</option>
              {students.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          )}
          {filter.type === "assignment" && (
            <select value={filter.id} onChange={(e) => setFilter((p) => ({ ...p, id: e.target.value }))}>
              <option value="">בחר מטלה</option>
              {assignments.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
          )}
          {filter.type === "group" && (
            <select value={filter.id} onChange={(e) => setFilter((p) => ({ ...p, id: e.target.value }))}>
              <option value="">בחר קבוצה</option>
              {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          )}

          <button onClick={generateReport}>הפק דוח</button>
          {report.length > 0 && <button onClick={handlePrint}>הדפס</button>}
        </div>
      </div>

      {report.length > 0 && (
        <table className="data-table">
          <thead>
            <tr><th>סטודנט</th><th>מטלה</th><th>ציון</th><th>סטטוס</th><th>הערת מרצה</th></tr>
          </thead>
          <tbody>
            {report.map((r, i) => (
              <tr key={i}>
                <td>{r.student}</td>
                <td>{r.assignment}</td>
                <td>{r.grade}</td>
                <td>{statusLabel[r.status]}</td>
                <td>{r.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
