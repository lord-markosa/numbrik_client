import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserToken } from "../selectors/userSelectors";

export default function ProtectedRoutes() {
    const token = useSelector(selectUserToken);

    return token ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
