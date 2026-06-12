import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "../../API/assignmentsApi";
import { getMySubmissions, createSubmission } from "../../API/submissionsApi";

export default function AssignmentDetails() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));

  useEffect(() => {
    const fetchData = async () => {
      const [a, s] = await Promise.all([
        getAssignmentById(id),
        getMySubmissions()
      ]);
      if (a.success) setAssignment(a.assignment);
      if (s.success) {
        const found = s.submissions.find((sub) => sub.assignmentId == id);
        if (found) setSubmission(found);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await createSubmission({ assignmentId: id, content });
    if (res.success) {
      setSubmission(res.submission);
    } else {
      setError(res.message);
    }
  };

  const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

  if (!assignment) return <div className="page">טוען...</div>;

  return (
    <div className="page">
      <h2>{assignment.title}</h2>
      <p>{assignment.description}</p>
      <p>תאריך סגירה: {assignment.closeDate?.slice(0, 16).replace("T", " ")}</p>

      {submission ? (
        <div>
          <h3>ההגשה שלך</h3>
          <p>סטטוס: {statusLabel[submission.status]}</p>
          <p>ציון: {submission.grade ?? "-"}</p>
          <p>הערת מרצה: {submission.lecturerComment || "-"}</p>
        </div>
      ) : (
        <form className="data-form" onSubmit={handleSubmit}>
          <h3>הגשת מטלה</h3>
          <textarea placeholder="תוכן ההגשה" value={content} onChange={(e) => setContent(e.target.value)} required />
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button type="submit">הגש</button>
          </div>
        </form>
      )}
    </div>
  );
}
