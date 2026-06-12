import { get } from "./apiClient";

export const getDashboard = () => get("/reports/dashboard");
