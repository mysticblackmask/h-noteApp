import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  Component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated]: any = React.useState(
    localStorage.getItem('token') ? true : false
  );
  React.useEffect(() => {
    setIsAuthenticated(localStorage.getItem('token') ? true : false);
    console.log('OK');
  }, [isAuthenticated]);
  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
};

export default PrivateRoute;
