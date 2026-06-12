import { useState, useEffect } from "react";
import { getDashboard } from "../../API/reportsApi";

export default function AdminHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboard();
      if (res.success) setStats(res.dashboard);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // כל 30 שניות

    return () => clearInterval(interval); // ניקוי כשהקומפוננטה נסגרת
  }, []);

  if (!stats) return <div className="page">טוען...</div>;

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
