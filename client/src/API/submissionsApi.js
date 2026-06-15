import { get, postForm, putForm, del } from "./apiClient";

export const getAllSubmissions = () => get("/submissions");
export const getSubmissionById = (id) => get(`/submissions/${id}`);
export const gradeSubmission = (id, data) => putForm(`/submissions/${id}/grade`, data);
export const deleteSubmission = (id) => del(`/submissions/${id}`);
export const createSubmission = (formData) => postForm("/submissions", formData);
export const getMySubmissions = () => get("/submissions/my");
export const updateSubmission = (id, formData) => putForm(`/submissions/${id}`, formData);
