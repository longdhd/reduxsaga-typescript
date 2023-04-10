import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isLoggedIn = Boolean(localStorage.getItem('access_Token'));
    if (isLoggedIn) return children;
    return <Navigate to="/login" />;
}