import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";
import { useNavigate } from "react-router-dom";
import Table from "../../components/common/Table";
import Errors from "../../components/common/Errors";

export default function StudentPending() {
  const [pending, setPending] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getMySubmissions();
        setPending(s.submissions.filter((sub) => sub.status === "unsubmitted"));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { label: "כותרת", render: (s) => s.assignmentTitle },
    { label: "תאריך סגירה", render: (s) => s.closeDate?.slice(0, 16).replace("T", " ") || "-" },
    { label: "פעולות", render: (s) => <button onClick={() => navigate(`/student/assignments/${s.assignmentId}`)}>הגש</button> },
  ];

  return (
    <div className="page">
      <h2>ממתין להגשה</h2>
      <Errors showError={error} setShowError={setError} />
      <Table columns={columns} data={pending} />
    </div>
  );
}
