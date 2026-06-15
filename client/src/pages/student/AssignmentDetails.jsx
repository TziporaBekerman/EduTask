import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "../../API/assignmentsApi";
import { getMySubmissions, createSubmission, updateSubmission } from "../../API/submissionsApi";
import Errors from "../../common/Errors";

const statusLabel = { unsubmitted: "לא הוגש", submitted: "הוגש", checked: "נבדק", late: "באיחור" };

function getTimeDiff(date) {
  const diff = Math.abs(new Date(date) - new Date());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${days > 0 ? `${days} ימים ` : ""}${hours > 0 ? `${hours} שעות ` : ""}${minutes} דקות`;
}

export default function AssignmentDetails() {
  const { id: assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [file, setFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [a, s] = await Promise.all([getAssignmentById(assignmentId), getMySubmissions()]);
        if (a.success) setAssignment(a.assignment);
        if (s.success) {
          const found = s.submissions.find((sub) => sub.assignmentId == assignmentId);
          if (found) { setSubmission(found); setComment(found.studentComment || ""); }
        }
      } catch (err) {
        setError("שגיאה בטעינת הנתונים");
      }
    };
    fetchData();
  }, []);

  const isLate = assignment && new Date() > new Date(assignment.closeDate);

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("assignmentId", assignmentId);
    if (file) fd.append("file", file);
    if (comment) fd.append("studentComment", comment);
    return fd;
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!file) { setError("יש לבחור קובץ"); return; }
    try {
      const fd = buildFormData();
      const res = submission
        ? await updateSubmission(submission.id, fd)
        : await createSubmission(fd);
      if (res.success || res.id) {
        setSuccess("ההגשה נשמרה בהצלחה");
        setShowUpload(false);
        setFile(null);
        const s = await getMySubmissions();
        if (s.success) setSubmission(s.submissions.find((sub) => sub.assignmentId == assignmentId));
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("שגיאה בשמירת ההגשה");
    }
  };

  const handleSaveComment = async () => {
    setError(""); setSuccess("");
    if (!submission) { setError("יש להגיש קובץ קודם"); return; }
    try {
      const fd = new FormData();
      fd.append("studentComment", comment);
      const res = await updateSubmission(submission.id, fd);
      if (res.success) { setSuccess("ההערה נשמרה"); setShowComment(false); }
      else setError(res.message);
    } catch (err) {
      setError("שגיאה בשמירת ההערה");
    }
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  if (!assignment) return <div className="page">טוען...</div>;

  return (
    <div className="page">
      <h2>{assignment.title}</h2>
      <p>{assignment.description}</p>
      <p>תאריך סגירה: {assignment.closeDate?.slice(0, 16).replace("T", " ")}</p>

      {submission && <p>סטטוס: {statusLabel[submission.status]}</p>}

      {isLate ? (
        <div className="form-error">
          <p>הינך באיחור של {getTimeDiff(assignment.closeDate)}</p>
          {lecturer && <p>אם יש לאיחורך סיבה מוצדקת פנה למרצה: <a href={`mailto:${assignment.lecturerEmail}`}>{assignment.lecturerEmail}</a></p>}
        </div>
      ) : (
        <p>זמן שנותר: {getTimeDiff(assignment.closeDate)}</p>
      )}

      {!isLate && (
        <button onClick={() => setShowUpload(!showUpload)}>
          {submission ? "עדכון הגשה" : "להוספת הגשה"}
        </button>
      )}

      {showUpload && (
        <form className="data-form" onSubmit={handleSubmitFile}>
          <div
            className={`drop-zone ${dragging ? "dragging" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current.click()}
          >
            {file ? file.name : "גרור קובץ לכאן או לחץ לבחירה"}
            <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="form-actions">
            <button type="submit">שמור שינויים</button>
            <button type="button" onClick={() => { setShowUpload(false); setFile(null); }}>ביטול</button>
          </div>
        </form>
      )}

      {submission && (
        <>
          {submission.filePath && (
            <a href={`http://localhost:5000/${submission.filePath}`} target="_blank" rel="noreferrer">צפה בקובץ שהוגש</a>
          )}
          <br />
          <button onClick={() => setShowComment(!showComment)}>הוסף הערה</button>
          {showComment && (
            <div className="data-form">
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="הערה למרצה" />
              <div className="form-actions">
                <button onClick={handleSaveComment}>שמור הערה</button>
                <button onClick={() => setShowComment(false)}>ביטול</button>
              </div>
            </div>
          )}
        </>
      )}

      {submission?.status === "checked" && (
        <div className="data-form">
          <h3>משוב מרצה</h3>
          <p>ציון: {submission.grade}</p>
          <p>הערה: {submission.lecturerComment || "-"}</p>
        </div>
      )}

      <Errors showError={error} setShowError={setError} />
      {success && <p className="form-success">{success}</p>}
    </div>
  );
}
