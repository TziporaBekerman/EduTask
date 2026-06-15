import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";
import Table from "../../common/Table";
import Errors from "../../common/Errors";

export default function StudentGrades() {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getMySubmissions();
        setGrades(s.submissions.filter((sub) => sub.status === "checked"));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const avg = grades.length
    ? (grades.reduce((sum, g) => sum + (g.grade || 0), 0) / grades.length).toFixed(1)
    : "-";

  const columns = [
    { label: "מטלה", render: (g) => g.assignmentTitle },
    { label: "ציון", render: (g) => g.grade ?? "-" },
    { label: "הערת מרצה", render: (g) => g.lecturerComment || "-" },
  ];

  return (
    <div className="page">
      <h2>ציונים</h2>
      <Errors showError={error} setShowError={setError} />
      <p>ממוצע: {avg}</p>
      <Table columns={columns} data={grades} />
    </div>
  );
}
