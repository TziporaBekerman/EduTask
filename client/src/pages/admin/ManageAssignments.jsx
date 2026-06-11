import { useState, useEffect } from "react";
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } from "../../API/assignmentsApi";
import { get } from "../../API/apiClient";

const emptyForm = { title: "", description: "", groupId: "", lecturerId: "", openDate: "", closeDate: "" };

export default function ManageAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignments();
    fetchGroups();
    fetchLecturers();
  }, []);

  const fetchAssignments = async () => {
    const res = await getAllAssignments();
    if (res.success) setAssignments(res.assignments);
  };

  const fetchGroups = async () => {
    const res = await get("/groups");
    if (res.success) setGroups(res.groups);
  };

  const fetchLecturers = async () => {
    const res = await get("/users");
    if (res.success) setLecturers(res.users.filter((u) => u.role === "lecturer"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = editId
      ? await updateAssignment(editId, form)
      : await createAssignment(form);

    if (res.success || res.id) {
      setForm(emptyForm);
      setEditId(null);
      fetchAssignments();
    } else {
      setError(res.message);
    }
  };

  const handleEdit = (a) => {
    setEditId(a.id);
    setForm({
      title: a.title,
      description: a.description || "",
      groupId: a.groupId,
      lecturerId: a.lecturerId,
      openDate: a.openDate?.slice(0, 16) || "",
      closeDate: a.closeDate?.slice(0, 16) || ""
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("האם למחוק מטלה זו?")) return;
    const res = await deleteAssignment(id);
    if (res.success) fetchAssignments();
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="admin-page">
      <h2>ניהול מטלות</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editId ? "עריכת מטלה" : "הוספת מטלה"}</h3>
        <input name="title" placeholder="כותרת" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="תיאור" value={form.description} onChange={handleChange} />
        <select name="groupId" value={form.groupId} onChange={handleChange} required>
          <option value="">בחר קבוצה</option>
          {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <select name="lecturerId" value={form.lecturerId} onChange={handleChange} required>
          <option value="">בחר מרצה</option>
          {lecturers.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <label>תאריך פתיחה
          <input name="openDate" type="datetime-local" value={form.openDate} onChange={handleChange} required />
        </label>
        <label>תאריך סגירה
          <input name="closeDate" type="datetime-local" value={form.closeDate} onChange={handleChange} required />
        </label>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit">{editId ? "עדכן" : "הוסף"}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm(emptyForm); }}>ביטול</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr><th>כותרת</th><th>קבוצה</th><th>פתיחה</th><th>סגירה</th><th>פעולות</th></tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{groups.find((g) => g.id === a.groupId)?.name || a.groupId}</td>
              <td>{a.openDate?.slice(0, 16).replace("T", " ")}</td>
              <td>{a.closeDate?.slice(0, 16).replace("T", " ")}</td>
              <td>
                <button onClick={() => handleEdit(a)}>עריכה</button>
                <button className="btn-danger" onClick={() => handleDelete(a.id)}>מחיקה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
