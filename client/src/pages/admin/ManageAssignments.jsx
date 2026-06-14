import { useState, useEffect } from "react";
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } from "../../API/assignmentsApi";
import { getAllGroups } from "../../API/groupsApi";
import { getAllUsers } from "../../API/usersApi";
import Table from "../../common/Table";

const emptyForm = { title: "", description: "", groupId: "", lecturerId: "", openDate: "", closeDate: "" };

export default function ManageAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
    const res = await getAllGroups();
    if (res.success) setGroups(res.groups);
  };

  const fetchLecturers = async () => {
    const res = await getAllUsers();
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
      setShowForm(false);
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
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("האם למחוק מטלה זו?")) return;
    const res = await deleteAssignment(id);
    if (res.success) fetchAssignments();
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCancel = () => { setEditId(null); setForm(emptyForm); setShowForm(false); };

  const columns = [
    { label: "כותרת", render: (a) => a.title },
    { label: "קבוצה", render: (a) => groups.find((g) => g.id === a.groupId)?.name || a.groupId },
    { label: "פתיחה", render: (a) => a.openDate?.slice(0, 16).replace("T", " ") },
    { label: "סגירה", render: (a) => a.closeDate?.slice(0, 16).replace("T", " ") },
    { label: "פעולות", render: (a) => <>
      <button onClick={() => handleEdit(a)}>עריכה</button>
      <button className="btn-danger" onClick={() => handleDelete(a.id)}>מחיקה</button>
    </> },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h2>ניהול מטלות</h2>
        {!showForm && <button onClick={() => setShowForm(true)}>+ הוסף מטלה</button>}
      </div>

      {showForm && <form className="data-form" onSubmit={handleSubmit}>
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
          <button type="button" onClick={handleCancel}>ביטול</button>
        </div>
      </form>}

      <Table columns={columns} data={assignments} />
    </div>
  );
}
