import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./common/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageGroups from "./pages/admin/ManageGroups";
import ManageAssignments from "./pages/admin/ManageAssignments";
import ManageSubmissions from "./pages/admin/ManageSubmissions";
import Reports from "./pages/admin/Reports";
import AdminHome from "./pages/admin/AdminHome";
import AdminProfile from "./pages/admin/AdminProfile";
import StudentLayout from "./pages/student/StudentLayout";
import StudentHome from "./pages/student/StudentHome";
import StudentAssignments from "./pages/student/StudentAssignments";
import AssignmentDetails from "./pages/student/AssignmentDetails";
import StudentPending from "./pages/student/StudentPending";
import StudentGrades from "./pages/student/StudentGrades";
import StudentProfile from "./pages/student/StudentProfile";

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
  const [user, setUser] = useState(getUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} user={user} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="groups" element={<ManageGroups />} />
            <Route path="assignments" element={<ManageAssignments />} />
            <Route path="submissions" element={<ManageSubmissions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["student"]} user={user} />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<StudentHome />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="assignments/:id" element={<AssignmentDetails />} />
            <Route path="pending" element={<StudentPending />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
