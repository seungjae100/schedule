import {isAuthenticated} from "../../utils/token";
import {Navigate} from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/users/login" />
};

export default PrivateRoute;