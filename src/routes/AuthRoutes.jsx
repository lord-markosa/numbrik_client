import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserToken } from "../selectors/userSelectors";

export default function AuthRoutes() {
    const token = useSelector(selectUserToken);

    return token ? <Navigate to="/home" replace={true} /> : <Outlet />;
}
