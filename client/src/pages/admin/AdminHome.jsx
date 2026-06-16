import { useState, useEffect } from "react";
import { getDashboard } from "../../API/reportsApi";
import Errors from "../../components/common/Errors";

export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setStats(res.dashboard);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();

  }, []);

  if (!stats) return <div className="page"><Errors showError={error} setShowError={setError} />טוען...</div>;

  return (
    <div className="page">
      <h2>סקירה כללית</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.totalStudents}</span>
          <span className="dashboard-card-label">סטודנטים</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.totalLecturers}</span>
          <span className="dashboard-card-label">מרצים</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.totalAssignments}</span>
          <span className="dashboard-card-label">מטלות</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.totalSubmissions}</span>
          <span className="dashboard-card-label">הגשות</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.checked}</span>
          <span className="dashboard-card-label">נבדקו</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.pending}</span>
          <span className="dashboard-card-label">ממתינות לבדיקה</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.unsubmitted}</span>
          <span className="dashboard-card-label">לא הוגשו</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.late}</span>
          <span className="dashboard-card-label">באיחור</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-value">{stats.avgGrade ?? "-"}</span>
          <span className="dashboard-card-label">ממוצע ציונים</span>
        </div>
      </div>
    </div>
  );
}
