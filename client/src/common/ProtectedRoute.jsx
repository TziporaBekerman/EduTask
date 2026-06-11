import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, user }) => {
  // אם אין משתמש מחובר בכלל -> העברה ל-Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // אם התפקיד של המשתמש לא מורשה לדף הזה -> העברה לדף חסום (או חזרה ללוגין)
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />; 
  }

  // אם הכל תקין -> מציג את רכיבי הבן (הדפים הפנימיים)
  return <Outlet />;
};

export default ProtectedRoute;