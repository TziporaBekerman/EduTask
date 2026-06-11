import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./common/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageGroups from "./pages/admin/ManageGroups";
import ManageAssignments from "./pages/admin/ManageAssignments";
import ManageSubmissions from "./pages/admin/ManageSubmissions";
import Reports from "./pages/admin/Reports";

function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function App() {
  const user = getUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} user={user} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="groups" element={<ManageGroups />} />
            <Route path="assignments" element={<ManageAssignments />} />
            <Route path="submissions" element={<ManageSubmissions />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
