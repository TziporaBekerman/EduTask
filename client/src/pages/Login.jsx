import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API/authApi";
import Errors from "../common/Errors";
import Input from "../common/Input";

export default function Login() {
  const [showError, setShowError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    if (!formData.email || !formData.password) {
      setShowError("אנא מלא את כל השדות");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setShowError("מייל לא תקין");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError("");
    if (!validateInput()) return;

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (!result.token) {
        setShowError(result.message || "שם משתמש או סיסמה שגויים");
        return;
      }
      localStorage.setItem("token", result.token);
      if (result.role === "admin") navigate("/admin");
      else if (result.role === "lecturer") navigate("/lecturer");
      else navigate("/student");
    } catch (err) {
      setShowError("שגיאה בהתחברות");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">EduTask - התחברות</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input name="email" data={formData} setData={setFormData} placeholder="אימייל" />
        <Input name="password" type="password" data={formData} setData={setFormData} placeholder="סיסמה" />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "מתחבר..." : "התחברות"}
        </button>
      </form>
      <Errors showError={showError} setShowError={setShowError} />
    </div>
  );
}
