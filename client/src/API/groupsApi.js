import { get, post, put, del } from "./apiClient";

export const getGroups = () => get("/groups");
export const createGroup = (data) => post("/groups", data);
export const updateGroup = (id, data) => put(`/groups/${id}`, data);
export const deleteGroup = (id) => del(`/groups/${id}`);
