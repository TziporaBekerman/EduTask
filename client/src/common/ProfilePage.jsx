import { useState } from "react";
import { updateUser } from "../API/usersApi";
import Errors from "./Errors";

// fields — מערך של שדות שכל תפקיד מגדיר בעצמו
// דוגמה: [{ name: "name", label: "שם מלא", type: "text" }, ...]
export default function ProfilePage({ fields }) {
  const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(
    Object.fromEntries(fields.map((f) => [f.name, user[f.name] || ""]))
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    for (const f of fields) {
      if (f.required && !form[f.name]) {
        setError(`שדה "${f.label}" הוא חובה`);
        return false;
      }
      if (f.name === "email" && form.email && !/\S+@\S+\.\S+/.test(form.email)) {
        setError("כתובת מייל לא תקינה");
        return false;
      }
      if (f.name === "password" && form.password && form.password.length < 6) {
        setError("סיסמה חייבת להכיל לפחות 6 תווים");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;

    const res = await updateUser(user.id, form);
    if (res.success) {
      setSuccess("הפרטים עודכנו בהצלחה");
      setEditing(false);
      // מנקה סיסמה אחרי עדכון
      setForm((p) => ({ ...p, password: "" }));
    } else {
      setError(res.message);
    }
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="page">
      <h2>פרופיל</h2>

      {/* תצוגת פרטים נוכחיים */}
      {!editing && (
        <div className="data-form">
          {fields.filter((f) => f.name !== "password").map((f) => (
            <div key={f.name}>
              <strong>{f.label}:</strong> {user[f.name] || "-"}
            </div>
          ))}
          <div className="form-actions">
            <button type="button" onClick={() => setEditing(true)}>ערוך</button>
          </div>
        </div>
      )}

      {/* טופס עריכה */}
      {editing && (
        <form className="data-form" onSubmit={handleSubmit}>
          {fields.map((f) => (
            <label key={f.name}>
              {f.label}
              <input
                name={f.name}
                type={f.type || "text"}
                placeholder={f.label}
                value={form[f.name]}
                onChange={handleChange}
                required={f.required}
              />
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

      {/* הודעת הצלחה מחוץ לטופס (אחרי סגירת העריכה) */}
      {!editing && success && <p className="form-success">{success}</p>}
    </div>
  );
}
