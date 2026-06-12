import { useState } from "react";
import { updateUser } from "../../API/usersApi";

export default function StudentProfile() {
  const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
  const [form, setForm] = useState({ name: user.name || "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await updateUser(user.id, form);
    if (res.success) {
      setSuccess("הפרטים עודכנו בהצלחה");
      setForm((p) => ({ ...p, password: "" }));
    } else {
      setError(res.message);
    }
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="page">
      <h2>פרופיל</h2>
      <form className="data-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="שם מלא" value={form.name} onChange={handleChange} required />
        <input name="password" type="password" placeholder="סיסמה חדשה" value={form.password} onChange={handleChange} />
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <div className="form-actions">
          <button type="submit">עדכן</button>
        </div>
      </form>
    </div>
  );
}
