import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import React from "react";

interface ProtectedRouteProps {
    component: () => React.JSX.Element;
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Component /> : <Navigate to="/login" />; 
   
};

export default ProtectedRoute;
