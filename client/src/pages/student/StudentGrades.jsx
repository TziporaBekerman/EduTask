import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";

export default function StudentGrades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const s = await getMySubmissions();
      if (s.success) {
        setGrades(s.submissions.filter((sub) => sub.status === "checked"));
      }
    };
    fetchData();
  }, []);

  const avg = grades.length
    ? (grades.reduce((sum, g) => sum + (g.grade || 0), 0) / grades.length).toFixed(1)
    : "-";

  return (
    <div className="page">
      <h2>ציונים</h2>
      <p>ממוצע: {avg}</p>
      <table className="data-table">
        <thead>
          <tr><th>מטלה</th><th>ציון</th><th>הערת מרצה</th></tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g.id}>
              <td>{g.assignmentTitle}</td>
              <td>{g.grade ?? "-"}</td>
              <td>{g.lecturerComment || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
