import React from "react";

import "./ToggleSlider.scss";

const ToggleSlider = ({ tab1, tab2, tabIndex, handleTabChange }) => (
    <div className="toggle-slider">
        <div className={`slider ${tabIndex === 0 ? "left" : "right"}`} />
        <div className="tabs">
            <div
                className={`tab ${tabIndex === 0 ? "active" : ""}`}
                onClick={handleTabChange}
            >
                {tab1}
            </div>
            <div
                className={`tab ${tabIndex === 1 ? "active" : ""}`}
                onClick={handleTabChange}
            >
                {tab2}
            </div>
        </div>
    </div>
);

export default ToggleSlider;
