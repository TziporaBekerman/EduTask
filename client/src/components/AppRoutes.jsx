    import { Routes, Route } from 'react-router-dom';

function AppRoutes({ user }) {
  return (
    <Routes>
      {/* נתיבים ציבוריים - פתוחים לכולם */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* נתיבים המיועדים לסטודנטים בלבד */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} user={user} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
      </Route>

      {/* נתיבים המיועדים למרצים בלבד */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.LECTURER]} user={user} />}>
        <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
        <Route path="/lecturer/submissions" element={<ReviewSubmissions />} />
      </Route>

      {/* נתיבים המיועדים למנהלים בלבד */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} user={user} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-groups" element={<ManageGroups />} />
      </Route>

      {/* נתיב ברירת מחדל לשגיאות 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}