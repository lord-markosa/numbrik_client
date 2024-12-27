import React from "react";
import Persona from "../../components/Persona";
import "./Users.scss";
import { useNavigate } from "react-router-dom";
import getRandomNumber from "../../utils/getRandomNumber";

export default function Users({ users }) {
    const navigate = useNavigate();
    const goToUserProgress = (user) => {
        navigate("/user-progress", { state: user });
    };

    return (
        <>
            {users.map((user) => {
                return (
                    <div
                        className="user-list-item"
                        onClick={() => goToUserProgress(user)}
                        key={getRandomNumber()}
                    >
                        <Persona title={user.username} />
                    </div>
                );
            })}{" "}
        </>
    );
}
