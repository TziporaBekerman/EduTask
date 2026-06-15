import { useState, useEffect } from "react";
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } from "../../API/assignmentsApi";
import { getAllGroups, getMyGroups } from "../../API/groupsApi";
import { getAllUsers } from "../../API/usersApi";
import Table from "../../common/Table";
import Input from "../../common/Input";
import Errors from "../../common/Errors";

const emptyForm = { title: "", description: "", groupId: "", lecturerId: "", openDate: "", closeDate: "" };

export default function ManageAssignments() {
  const currentUser = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
  const isAdmin = currentUser.role === "admin";
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignments();
    isAdmin ? fetchGroups() : fetchMyGroups();
    if (isAdmin) fetchLecturers();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await getAllAssignments();
      setAssignments(res.assignments);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await getAllGroups();
      setGroups(res.groups);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchMyGroups = async () => {
    try {
      const res = await getMyGroups();
      setGroups(res.groups);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchLecturers = async () => {
    try {
      const res = await getAllUsers();
      setLecturers(res.users.filter((u) => u.role === "lecturer"));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = isAdmin ? form : { ...form, lecturerId: currentUser.id };
      await (editId ? updateAssignment(editId, data) : createAssignment(data));
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      fetchAssignments();
    } catch (err) {
      setError(err.message);
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
    try {
      await deleteAssignment(id);
      fetchAssignments();
    } catch (err) {
      setError(err.message);
    }
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
        <Input name="title" placeholder="כותרת" data={form} setData={setForm} />
        <textarea name="description" placeholder="תיאור" value={form.description} onChange={handleChange} />
        <select name="groupId" value={form.groupId} onChange={handleChange} required>
          <option value="">בחר קבוצה</option>
          {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        {isAdmin
          ? <select name="lecturerId" value={form.lecturerId} onChange={handleChange} required>
              <option value="">בחר מרצה</option>
              {lecturers.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          : <input type="hidden" name="lecturerId" value={currentUser.id} />}
        <label>תאריך פתיחה
          <Input name="openDate" type="datetime-local" data={form} setData={setForm} />
        </label>
        <label>תאריך סגירה
          <Input name="closeDate" type="datetime-local" data={form} setData={setForm} />
        </label>
        <Errors showError={error} setShowError={setError} />
        <div className="form-actions">
          <button type="submit">{editId ? "עדכן" : "הוסף"}</button>
          <button type="button" onClick={handleCancel}>ביטול</button>
        </div>
      </form>}

      <Table columns={columns} data={assignments} />
    </div>
  );
}
