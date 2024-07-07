import { Navigate } from "react-router-dom";

const PrivateRoute = ({ admin, Component }) => {  
    return admin ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;