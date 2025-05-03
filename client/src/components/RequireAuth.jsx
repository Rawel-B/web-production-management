import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const RequireAuth = () => {
  const { token, isLoading, isInitialized } = useAuth();
  const location = useLocation();

  console.log("Auth check:", { 
    tokenExists: !!token, 
    path: location.pathname, 
    isLoading,
    isInitialized,
    localStorageToken: localStorage.getItem('token')
  });

  if (isLoading || !isInitialized) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    console.log("Redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;