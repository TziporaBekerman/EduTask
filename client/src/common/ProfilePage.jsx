import { useState, useEffect } from "react";
import { updateMyProfile, getMyProfile } from "../API/usersApi";
import Errors from "./Errors";
import Input from "./Input";

const fields = [
  { name: "name",     label: "שם מלא",     type: "text",     required: true },
  { name: "email",    label: "אימייל",       type: "email",    required: true },
  { name: "password", label: "סיסמה חדשה",  type: "password", required: false },
];

const emptyForm = { name: "", email: "", password: "", currentPassword: "" };

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setUser(data.user);
        setForm({ name: data.user.name || "", email: data.user.email || "", password: "", currentPassword: "" });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return null;

  const validate = () => {
    if (!form.currentPassword) { setError("נדרשת סיסמה נוכחית"); return false; }
    if (!form.name) { setError("שם מלא הוא חובה"); return false; }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) { setError("כתובת מייל לא תקינה"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!validate()) return;
    try {
      await updateMyProfile(form);
      setSuccess("הפרטים עודכנו בהצלחה");
      setEditing(false);
      setForm((p) => ({ ...p, password: "", currentPassword: "" }));
      const data = await getMyProfile();
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h2>פרופיל</h2>

      {!editing && (
        <div className="data-form">
          {fields.filter((f) => f.name !== "password").map((f) => (
            <div key={f.name}><strong>{f.label}:</strong> {user[f.name] || "-"}</div>
          ))}
          <div className="form-actions">
            <button type="button" onClick={() => setEditing(true)}>ערוך</button>
          </div>
        </div>
      )}

      {editing && (
        <form className="data-form" onSubmit={handleSubmit}>
          <label>סיסמה נוכחית
            <Input name="currentPassword" type="password" placeholder="סיסמה נוכחית" data={form} setData={setForm} />
          </label>
          {fields.map((f) => (
            <label key={f.name}>{f.label}
              <Input name={f.name} type={f.type} placeholder={f.label} data={form} setData={setForm} />
            </label>
          ))}
          <div className="form-actions">
            <button type="submit">שמור</button>
            <button type="button" onClick={() => { setEditing(false); setError(""); }}>ביטול</button>
          </div>
          <Errors showError={error} setShowError={setError} />
          {success && <p className="form-success">{success}</p>}
        </form>
      )}
      {!editing && success && <p className="form-success">{success}</p>}
    </div>
  );
}
