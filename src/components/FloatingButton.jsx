import React from "react";
import "./FloatingButton.scss";
import { IoMdAdd } from "react-icons/io";

const FloatingButton = ({ onClick }) => {
    return (
        <button className="floating-add-button" onClick={onClick}>
            <IoMdAdd />
        </button>
    );
};

export default FloatingButton;
