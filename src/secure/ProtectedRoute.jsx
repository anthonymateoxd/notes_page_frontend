import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated)
    return (
      <Navigate
        to='/login-page'
        replace
      />
    );
  return <Outlet />;
}

export default ProtectedRoute;
