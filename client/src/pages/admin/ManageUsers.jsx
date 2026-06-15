import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../API/usersApi";
import Table from "../../common/Table";
import Errors from "../../common/Errors";

const emptyForm = { id: "", name: "", email: "", password: "", role: "student", groupId: "" };

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.users);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      editId ? await updateUser(editId, form) : await createUser(form);
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ ...user, password: "" });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("האם למחוק משתמש זה?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCancel = () => { setEditId(null); setForm(emptyForm); setShowForm(false); };

  const columns = [
    { label: "ת.ז", render: (u) => u.id },
    { label: "שם", render: (u) => u.name },
    { label: "אימייל", render: (u) => u.email },
    { label: "תפקיד", render: (u) => u.role },
    { label: "קבוצה", render: (u) => u.groupId || "-" },
    { label: "פעולות", render: (u) => <>
      <button onClick={() => handleEdit(u)}>עריכה</button>
      <button className="btn-danger" onClick={() => handleDelete(u.id)}>מחיקה</button>
    </> },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h2>ניהול משתמשים</h2>
        {!showForm && <button onClick={() => setShowForm(true)}>+ הוסף משתמש</button>}
      </div>

      {showForm && <form className="data-form" onSubmit={handleSubmit} autoComplete="off">
        <h3>{editId ? "עריכת משתמש" : "הוספת משתמש"}</h3>
        {!editId && <input name="id" placeholder="ת.ז / מספר עובד" value={form.id} onChange={handleChange} autoComplete="off" required />}
        <input name="name" placeholder="שם מלא" value={form.name} onChange={handleChange} autoComplete="off" required />
        <input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} autoComplete="off" required />
        <input name="password" type="password" placeholder="סיסמה" value={form.password} onChange={handleChange} autoComplete="new-password" required={!editId} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">סטודנט</option>
          <option value="lecturer">מרצה</option>
          <option value="admin">מנהל</option>
        </select>
        <input name="groupId" placeholder="מזהה קבוצה (לסטודנט)" value={form.groupId} onChange={handleChange} />
        <Errors showError={error} setShowError={setError} />
        <div className="form-actions">
          <button type="submit">{editId ? "עדכן" : "הוסף"}</button>
          <button type="button" onClick={handleCancel}>ביטול</button>
        </div>
      </form>}

      <Table columns={columns} data={users} />
    </div>
  );
}
