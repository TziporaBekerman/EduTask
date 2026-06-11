import { useState, useEffect } from "react";
import { get, post, put, del } from "../../API/apiClient";
import { getAllUsers, updateUser } from "../../API/usersApi";

export default function ManageGroups() {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { fetchGroups(); fetchUsers(); }, []);

  const fetchGroups = async () => {
    const res = await get("/groups");
    if (res.success) setGroups(res.groups);
  };

  const fetchUsers = async () => {
    const res = await getAllUsers();
    if (res.success) setUsers(res.users.filter((u) => u.role === "student"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = editId
      ? await put(`/groups/${editId}`, { name: groupName })
      : await post("/groups", { name: groupName });

    if (res.success) {
      setGroupName("");
      setEditId(null);
      fetchGroups();
    } else {
      setError(res.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("האם למחוק קבוצה זו?")) return;
    const res = await del(`/groups/${id}`);
    if (res.success) fetchGroups();
  };

  const handleAssignGroup = async (userId, groupId) => {
    await updateUser(userId, { groupId: groupId || null });
    fetchUsers();
  };

  return (
    <div className="admin-page">
      <h2>ניהול קבוצות</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editId ? "עריכת קבוצה" : "הוספת קבוצה"}</h3>
        <input placeholder="שם קבוצה" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit">{editId ? "עדכן" : "הוסף"}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setGroupName(""); }}>ביטול</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr><th>מזהה</th><th>שם קבוצה</th><th>פעולות</th></tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.name}</td>
              <td>
                <button onClick={() => { setEditId(g.id); setGroupName(g.name); }}>עריכה</button>
                <button className="btn-danger" onClick={() => handleDelete(g.id)}>מחיקה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>שיוך סטודנטים לקבוצות</h3>
      <table className="admin-table">
        <thead>
          <tr><th>שם</th><th>אימייל</th><th>קבוצה נוכחית</th><th>שנה קבוצה</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{groups.find((g) => g.id === u.groupId)?.name || "-"}</td>
              <td>
                <select value={u.groupId || ""} onChange={(e) => handleAssignGroup(u.id, e.target.value)}>
                  <option value="">ללא קבוצה</option>
                  {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
