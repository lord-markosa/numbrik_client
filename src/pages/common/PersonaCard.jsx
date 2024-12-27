import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogOverlay from "../../components/DialogOverlay";
import Button from "../../components/Button";
import Persona from "../../components/Persona";
import logout from "../../utils/usersUtils/logout";
import ChangePasswordForm from "./ChangePasswordForm";
import { getAdminToken } from "../../utils/usersUtils/adminInfo";
import { clearUser } from "../../store/userSlice";

import "./PersonaCard.scss";

export default function PersonaCard({ closePersona, username }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        dispatch(clearUser());
        logout();
    };

    const goToAdminHome = () => navigate("/admin-home");

    return (
        <DialogOverlay className="persona-dialog" blurHandler={closePersona}>
            <Persona title={username} className="persona" />
            <ChangePasswordForm />
            {getAdminToken() && (
                <Button
                    className="action-button"
                    label="Admin's Home"
                    type="secondary"
                    onClick={goToAdminHome}
                />
            )}
            <div className="buttons-container">
                <Button
                    className="action-button"
                    onClick={handleLogout}
                    label="Log out"
                    type="transparent"
                />
                <Button
                    className="action-button"
                    onClick={closePersona}
                    type="secondary"
                    label="Close"
                />
            </div>
        </DialogOverlay>
    );
}
