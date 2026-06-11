import { get, post, put, del } from "./apiClient";

export const getAllAssignments = () => get("/assignments");
export const getAssignmentById = (id) => get(`/assignments/${id}`);
export const createAssignment = (data) => post("/assignments", data);
export const updateAssignment = (id, data) => put(`/assignments/${id}`, data);
export const deleteAssignment = (id) => del(`/assignments/${id}`);
export const getAssignmentSubmissions = (id) => get(`/assignments/${id}/submissions`);
