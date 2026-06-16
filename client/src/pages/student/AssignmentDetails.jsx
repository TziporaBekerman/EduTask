import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "../../API/assignmentsApi";
import { getMySubmissions, createSubmission, updateSubmission } from "../../API/submissionsApi";
import Errors from "../../components/common/Errors";

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
        setAssignment(a.assignment);
        const found = s.submissions.find((sub) => sub.assignmentId == assignmentId);
        if (found) { setSubmission(found); setComment(found.studentComment || ""); }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const [isLate, setIsLate] = useState(false);

  useEffect(() => {
    if (!assignment) return;
    const check = () => setIsLate(new Date() > new Date(assignment.closeDate));
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [assignment]);

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
      submission
        ? await updateSubmission(submission.id, fd)
        : await createSubmission(fd);
      setSuccess("ההגשה נשמרה בהצלחה");
      setShowUpload(false);
      setFile(null);
      const s = await getMySubmissions();
      setSubmission(s.submissions.find((sub) => sub.assignmentId == assignmentId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveComment = async () => {
    setError(""); setSuccess("");
    if (!submission) { setError("יש להגיש קובץ קודם"); return; }
    try {
      const fd = new FormData();
      fd.append("studentComment", comment);
      await updateSubmission(submission.id, fd);
      setSuccess("ההערה נשמרה");
      setShowComment(false);
    } catch (err) {
      setError(err.message);
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
      <div className="assignment-header">
        <h2>{assignment.title}</h2>
        <p className="assignment-description">{assignment.description}</p>
      </div>

      <div className="assignment-meta">
        <div className="meta-item">
          <span className="meta-label">תאריך סגירה</span>
          <span className="meta-value">{assignment.closeDate?.slice(0, 16).replace("T", " ")}</span>
        </div>
        {submission && (
          <div className="meta-item">
            <span className="meta-label">סטטוס</span>
            <span className={`status-badge status-${submission.status}`}>{statusLabel[submission.status]}</span>
          </div>
        )}
        <div className="meta-item">
          {isLate ? (
            <>
              <span className="meta-label">איחור</span>
              <span className="meta-value late">{getTimeDiff(assignment.closeDate)}</span>
            </>
          ) : (
            <>
              <span className="meta-label">זמן שנותר</span>
              <span className="meta-value">{getTimeDiff(assignment.closeDate)}</span>
            </>
          )}
        </div>
      </div>

      {isLate && (
        <div className="late-notice">
          <p>הינך באיחור של {getTimeDiff(assignment.closeDate)}</p>
          <p>אם יש לאיחורך סיבה מוצדקת פנה למרצה: <a href={`mailto:${assignment.lecturerEmail}`}>{assignment.lecturerEmail}</a></p>
        </div>
      )}

      <div className="assignment-actions">
        {!isLate && (
          <button onClick={() => setShowUpload(!showUpload)}>
            {submission ? "עדכון הגשה" : "להוספת הגשה"}
          </button>
        )}
        {submission && (
          <button onClick={() => setShowComment(!showComment)}>הוסף הערה</button>
        )}
      </div>

      {showUpload && (
        <form className="data-form" onSubmit={handleSubmitFile}>
          <h3>{submission ? "עדכון קובץ" : "העלאת קובץ"}</h3>
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

      {showComment && (
        <div className="data-form">
          <h3>הערה למרצה</h3>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="כתוב הערה..." />
          <div className="form-actions">
            <button onClick={handleSaveComment}>שמור הערה</button>
            <button onClick={() => setShowComment(false)}>ביטול</button>
          </div>
        </div>
      )}

      {submission?.filePath && (
        <div className="submission-file">
          <span>קובץ שהוגש:</span>
          <a href={`http://localhost:5000/${submission.filePath}`} target="_blank" rel="noreferrer">צפה בקובץ</a>
        </div>
      )}

      {submission?.studentComment && (
        <div className="data-form">
          <span className="meta-label">הערתך:</span>
          <p>{submission.studentComment}</p>
        </div>
      )}

      {submission?.status === "checked" && (
        <div className="feedback-card">
          <h3>משוב מרצה</h3>
          <div className="feedback-grade">{submission.grade}</div>
          <p className="meta-label">הערה: {submission.lecturerComment || "-"}</p>
        </div>
      )}

      <Errors showError={error} setShowError={setError} />
      {success && <p className="form-success">{success}</p>}
    </div>
  );
}
