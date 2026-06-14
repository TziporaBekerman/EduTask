import { useState, useEffect } from "react";
import { updateMyProfile, getMyProfile } from "../API/usersApi";
import Errors from "./Errors";
import Input from "./Input";

export default function ProfilePage({ fields }) {
  const tokenUser = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  // הודעת שגיאה להצגה למשתמש
  const [error, setError] = useState("");
  // הודעת הצלחה להצגה למשתמש
  const [success, setSuccess] = useState("");

  // טעינת פרטי המשתמש מהשרת בטעינה ראשונית
  useEffect(() => {
    getMyProfile().then((data) => {
      setUser(data.user);
      setForm(Object.fromEntries(fields.map((f) => [f.name, data.user[f.name] || ""])));
    });
  }, []);

  if (!user) return null;

  // פונקציית ולידציה — בודקת את ערכי הטופס לפני שליחה
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
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;
    const res = await updateMyProfile(form);
    if (res.success) {
      setSuccess("הפרטים עודכנו בהצלחה");
      setEditing(false);
      setForm((p) => ({ ...p, password: "" }));
      // טעינה מחדש של הפרטים העדכניים מהשרת
      getMyProfile().then((data) => setUser(data.user));
    } else {
      setError(res.message);
    }
  };


  return (
    <div className="page">
      <h2>פרופיל</h2>

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

      {editing && (
        <form className="data-form" onSubmit={handleSubmit}>
          {fields.map((f) => (
            <label key={f.name}>
              {f.label}
              <Input
                name={f.name}
                type={f.type || "text"}
                placeholder={f.label}
                data={form}
                setData={setForm}
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
      {!editing && success && <p className="form-success">{success}</p>}
    </div>
  );
}
