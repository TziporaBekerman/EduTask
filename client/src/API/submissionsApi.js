import { get, put, del } from "./apiClient";

export const getAllSubmissions = () => get("/submissions");
export const getSubmissionById = (id) => get(`/submissions/${id}`);
export const getSubmissionsByStudent = (studentId) => get(`/submissions/student/${studentId}`);
export const gradeSubmission = (id, data) => put(`/submissions/${id}/grade`, data);
export const deleteSubmission = (id) => del(`/submissions/${id}`);
