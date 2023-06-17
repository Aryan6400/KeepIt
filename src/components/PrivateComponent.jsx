import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


function PrivateComponent() {
    const auth = localStorage.getItem("user");
    return auth ? <Outlet /> : <Navigate to="/SignUp" />;
}

export default PrivateComponent;