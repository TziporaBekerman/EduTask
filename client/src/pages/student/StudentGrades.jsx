import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";
import Table from "../../common/Table";

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

  const columns = [
    { label: "מטלה", render: (g) => g.assignmentTitle },
    { label: "ציון", render: (g) => g.grade ?? "-" },
    { label: "הערת מרצה", render: (g) => g.lecturerComment || "-" },
  ];

  return (
    <div className="page">
      <h2>ציונים</h2>
      <p>ממוצע: {avg}</p>
      <Table columns={columns} data={grades} />
    </div>
  );
}
