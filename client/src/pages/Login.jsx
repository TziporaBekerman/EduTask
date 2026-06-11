import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Errors from '../common/Errors';
import Input from '../common/Input';

function Login() {
  const [showError, setShowError] = useState('');
  const [formData, setFormData] = useState({
    userMail: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateInput()) {
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.userMail, formData.password);

      localStorage.setItem("token", result.token);

      // כאן אפשר לבצע navigate
      // navigate("/dashboard");

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const validateInput = () => {
    if (!formData.userMail || !formData.password) {
      setShowError('אנא מלא את כל השדות');
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.userMail)) {
      setShowError('מייל לא תקין');
      return false;
    }
    return true
  }

  return (
    <div className="login-container">
      <h1 className="login-title">התחברות</h1>
      <form className="login-form">
        <Input name='username' data={formData} setData={setFormData} placeholder='שם משתמש' />
        <Input name='password' type='password' data={formData} setData={setFormData} placeholder='סיסמה' />
        <button type="button" className="login-button" onClick={handleSubmit}>התחברות</button>
      </form>
      <Errors showError={showError} setShowError={setShowError} />
    </div>
  );
}

export default Login;

