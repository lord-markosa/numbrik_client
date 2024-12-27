import React, { use } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdminToken } from "../utils/usersUtils/adminInfo";
import { selectUserToken } from "../selectors/userSelectors";

export default function AdminRoutes() {
    const adminToken = getAdminToken();
    const token = useSelector(selectUserToken);

    return adminToken && token ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace={true} />
    );
}
