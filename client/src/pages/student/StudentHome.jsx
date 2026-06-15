import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";
import { getMyProfile } from "../../API/usersApi";
import Errors from "../../common/Errors";

export default function StudentHome() {
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, u] = await Promise.all([getMySubmissions(), getMyProfile()]);
        setSubmissions(s.submissions);
        setUser(u.user);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

  return (
    <div className="page">
      <Errors showError={error} setShowError={setError} />
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
