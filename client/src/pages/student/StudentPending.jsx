import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";
import { useNavigate } from "react-router-dom";

export default function StudentPending() {
  const [pending, setPending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const s = await getMySubmissions();
      if (s.success) {
        setPending(s.submissions.filter((sub) => sub.status === "unsubmitted"));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <h2>ממתין להגשה</h2>
      <table className="data-table">
        <thead>
          <tr><th>כותרת</th><th>תאריך סגירה</th><th>פעולות</th></tr>
        </thead>
        <tbody>
          {pending.map((s) => (
            <tr key={s.id}>
              <td>{s.assignmentTitle}</td>
              <td>{s.closeDate?.slice(0, 16).replace("T", " ") || "-"}</td>
              <td>
                <button onClick={() => navigate(`/student/assignments/${s.assignmentId}`)}>הגש</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
