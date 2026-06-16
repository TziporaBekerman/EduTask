import { useState, useEffect } from "react";
import { getMySubmissions } from "../../API/submissionsApi";
import { getMyProfile } from "../../API/usersApi";
import Errors from "../../components/common/Errors";
import Table from "../../components/common/Table";

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

  const columns = [
    { label: "מטלה", render: (s) => s.assignmentTitle },
    { label: "סטטוס", render: (s) => statusLabel[s.status] },
    { label: "ציון", render: (s) => s.grade ?? "-" },
  ];

  return (
    <div className="page">
      <Errors showError={error} setShowError={setError} />
      <h2>שלום, {user?.name || user?.email}</h2>
      <h3>סטטוס הגשות אחרונות</h3>
      <Table columns={columns} data={submissions.slice(0, 5)} />
    </div>
  );
}
