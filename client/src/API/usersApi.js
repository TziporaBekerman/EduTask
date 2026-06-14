import { get, post, put, del } from "./apiClient";

export const getAllUsers = () => get("/users");
export const getUserById = (id) => get(`/users/${id}`);
export const createUser = (user) => post("/users", user);
export const updateUser = (id, user) => put(`/users/${id}`, user);
export const deleteUser = (id) => del(`/users/${id}`);
export const updateMyProfile = (user) => put("/users/me", user);
export const getMyProfile = () => get("/users/me");
