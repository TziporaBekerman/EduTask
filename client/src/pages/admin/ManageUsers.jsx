import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../API/usersApi";

const emptyForm = { id: "", name: "", email: "", password: "", role: "student", groupId: "" };

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    if (res.success) setUsers(res.users);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = editId
      ? await updateUser(editId, form)
      : await createUser(form);

    if (res.success) {
      setForm(emptyForm);
      setEditId(null);
      fetchUsers();
    } else {
      setError(res.message);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ ...user, password: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("האם למחוק משתמש זה?")) return;
    const res = await deleteUser(id);
    if (res.success) fetchUsers();
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="admin-page">
      <h2>ניהול משתמשים</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editId ? "עריכת משתמש" : "הוספת משתמש"}</h3>
        {!editId && <input name="id" placeholder="ת.ז / מספר עובד" value={form.id} onChange={handleChange} required />}
        <input name="name" placeholder="שם מלא" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="סיסמה" value={form.password} onChange={handleChange} required={!editId} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">סטודנט</option>
          <option value="lecturer">מרצה</option>
          <option value="admin">מנהל</option>
        </select>
        <input name="groupId" placeholder="מזהה קבוצה (לסטודנט)" value={form.groupId} onChange={handleChange} />
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit">{editId ? "עדכן" : "הוסף"}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm(emptyForm); }}>ביטול</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ת.ז</th><th>שם</th><th>אימייל</th><th>תפקיד</th><th>קבוצה</th><th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.groupId || "-"}</td>
              <td>
                <button onClick={() => handleEdit(u)}>עריכה</button>
                <button className="btn-danger" onClick={() => handleDelete(u.id)}>מחיקה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
