import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";

export default function StudentHome() {
  const [submissions, setSubmissions] = useState([]);

  const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

  useEffect(() => {
    const fetchData = async () => {
      const s = await getMySubmissions();
      if (s.success) setSubmissions(s.submissions);
    };
    fetchData();
  }, []);

  const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

  return (
    <div className="page">
      <h2>שלום, {user.name || user.email}</h2>

      <h3>סטטוס הגשות אחרונות</h3>
      <table className="data-table">
        <thead>
          <tr><th>מטלה</th><th>סטטוס</th><th>ציון</th></tr>
        </thead>
        <tbody>
          {submissions.slice(0, 5).map((s) => (
            <tr key={s.id}>
              <td>{s.assignmentTitle}</td>
              <td>{statusLabel[s.status]}</td>
              <td>{s.grade ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
