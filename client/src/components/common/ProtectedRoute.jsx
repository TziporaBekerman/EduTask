import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />; 
  
  }

  return <Outlet />;
};

export default ProtectedRoute;