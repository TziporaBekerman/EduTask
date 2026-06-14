import { useState, useEffect } from "react";
import { getAllUsers, updateUser, deleteUser } from "../../API/usersApi";
import { getAllGroups, createGroup, updateGroup, deleteGroup } from "../../API/groupsApi";
import Modal from "../../common/Modal";

export default function ManageGroups() {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState(null); // { groupId, students }
  const [studentActions, setStudentActions] = useState({}); // { userId: { action: 'move'|'delete', groupId } }

  useEffect(() => { fetchGroups(); fetchUsers(); }, []);

  const fetchGroups = async () => {
    const res = await getAllGroups();
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
      ? await updateGroup(editId, { name: groupName })
      : await createGroup({ name: groupName });

    if (res.success) {
      setGroupName("");
      setEditId(null);
      setShowForm(false);
      fetchGroups();
    } else {
      setError(res.message);
    }
  };

  const handleDeleteClick = (groupId) => {
    const students = users.filter((u) => u.groupId === groupId);
    if (students.length === 0) {
      confirmDelete(groupId, []);
    } else {
      const actions = {};
      students.forEach((s) => { actions[s.id] = { action: "move", groupId: "" }; });
      setStudentActions(actions);
      setDeleteModal({ groupId, students });
    }
  };

  const confirmDelete = async (groupId, students) => {
    for (const student of students) {
      const action = studentActions[student.id];
      if (action?.action === "delete") {
        await deleteUser(student.id);
      } else if (action?.action === "move" && action.groupId) {
        await updateUser(student.id, { groupId: action.groupId });
      }
    }
    await deleteGroup(groupId);
    setDeleteModal(null);
    fetchGroups();
    fetchUsers();
  };

  const handleCancel = () => { setEditId(null); setGroupName(""); setShowForm(false); };

  return (
    <div className="page">
      <div className="page-header">
        <h2>ניהול קבוצות</h2>
        {!showForm && <button onClick={() => setShowForm(true)}>+ הוסף קבוצה</button>}
      </div>

      {showForm && <form className="data-form" onSubmit={handleSubmit}>
        <h3>{editId ? "עריכת קבוצה" : "הוספת קבוצה"}</h3>
        <input placeholder="שם קבוצה" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit">{editId ? "עדכן" : "הוסף"}</button>
          <button type="button" onClick={handleCancel}>ביטול</button>
        </div>
      </form>}

      <table className="data-table">
        <thead>
          <tr><th>מזהה</th><th>שם קבוצה</th><th>פעולות</th></tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.name}</td>
              <td>
                <button onClick={() => { setEditId(g.id); setGroupName(g.name); setShowForm(true); }}>עריכה</button>
                <button className="btn-danger" onClick={() => handleDeleteClick(g.id)}>מחיקה</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>שיוך סטודנטים לקבוצות</h3>
      <table className="data-table">
        <thead>
          <tr><th>שם</th><th>אימייל</th><th>קבוצה נוכחית</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{groups.find((g) => g.id === u.groupId)?.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteModal && (
        <Modal title="מחיקת קבוצה" onClose={() => setDeleteModal(null)}>
          <p>לקבוצה זו יש {deleteModal.students.length} תלמידים. מה לעשות עם כל אחד?</p>
          <table className="data-table">
            <thead>
              <tr><th>שם</th><th>פעולה</th><th>קבוצה חדשה</th></tr>
            </thead>
            <tbody>
              {deleteModal.students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <select
                      value={studentActions[s.id]?.action}
                      onChange={(e) => setStudentActions((prev) => ({
                        ...prev,
                        [s.id]: { ...prev[s.id], action: e.target.value }
                      }))}
                    >
                      <option value="move">העבר לקבוצה</option>
                      <option value="delete">מחק תלמיד</option>
                    </select>
                  </td>
                  <td>
                    {studentActions[s.id]?.action === "move" && (
                      <select
                        value={studentActions[s.id]?.groupId}
                        onChange={(e) => setStudentActions((prev) => ({
                          ...prev,
                          [s.id]: { ...prev[s.id], groupId: e.target.value }
                        }))}
                      >
                        <option value="">בחר קבוצה</option>
                        {groups.filter((g) => g.id !== deleteModal.groupId).map((g) => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-actions" style={{ marginTop: "16px" }}>
            <button className="btn-danger" onClick={() => confirmDelete(deleteModal.groupId, deleteModal.students)}>אשר מחיקה</button>
            <button onClick={() => setDeleteModal(null)}>ביטול</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
