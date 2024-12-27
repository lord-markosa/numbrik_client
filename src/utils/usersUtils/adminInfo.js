import { ADMIN_TOKEN_EXPIRY_TIME } from "../../constants/constants";
import logout from "./logout";

export const getAdminToken = () => {
    const tokenDetails = localStorage.getItem("adminToken");

    if (!tokenDetails) {
        return null;
    }

    const { adminToken, expiryTime } = JSON.parse(tokenDetails);

    if (expiryTime && Date.now() > expiryTime) {
        logout();
        return null;
    }

    return adminToken;
};

export const setAdminToken = (adminToken) => {
    if (!adminToken) {
        return;
    }

    const expiryTime = Date.now() + ADMIN_TOKEN_EXPIRY_TIME;
    localStorage.setItem(
        "adminToken",
        JSON.stringify({ adminToken, expiryTime })
    );
};
