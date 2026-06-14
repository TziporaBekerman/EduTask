import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";
import { getMyProfile } from "../../API/usersApi";

export default function StudentHome() {
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const s = await getMySubmissions();
      if (s.success) setSubmissions(s.submissions);
      const u = await getMyProfile();
      if (u) setUser(u);
    };
    fetchData();
  }, []);

  const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

  return (
    <div className="page">
      <h2>שלום, {user?.name || user?.email}</h2>

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
