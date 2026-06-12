import { useState, useEffect } from "react";
import { getAllAssignments } from "../../API/assignmentsApi";
import { useNavigate } from "react-router-dom";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAssignments();
      if (res.success) setAssignments(res.assignments.filter((a) => a.groupId === user.groupId));
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <h2>מטלות</h2>
      <table className="data-table">
        <thead>
          <tr><th>כותרת</th><th>תיאור</th><th>פתיחה</th><th>סגירה</th><th>פעולות</th></tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.description || "-"}</td>
              <td>{a.openDate?.slice(0, 16).replace("T", " ")}</td>
              <td>{a.closeDate?.slice(0, 16).replace("T", " ")}</td>
              <td>
                <button onClick={() => navigate(`/student/assignments/${a.id}`)}>פרטים</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
