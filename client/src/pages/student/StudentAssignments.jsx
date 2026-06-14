import { useState, useEffect } from "react";
import { getAllAssignments } from "../../API/assignmentsApi";
import { useNavigate } from "react-router-dom";
import Table from "../../common/Table";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAssignments();
      if (res.success) setAssignments(res.assignments);
    };
    fetchData();
  }, []);

  const columns = [
    { label: "כותרת", render: (a) => a.title },
    { label: "תיאור", render: (a) => a.description || "-" },
    { label: "פתיחה", render: (a) => a.openDate?.slice(0, 16).replace("T", " ") },
    { label: "סגירה", render: (a) => a.closeDate?.slice(0, 16).replace("T", " ") },
    { label: "פעולות", render: (a) => <button onClick={() => navigate(`/student/assignments/${a.id}`)}>פרטים</button> },
  ];

  return (
    <div className="page">
      <h2>מטלות</h2>
      <Table columns={columns} data={assignments} />
    </div>
  );
}
