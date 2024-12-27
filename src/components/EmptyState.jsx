import React from "react";
import { GiEmptyMetalBucket } from "react-icons/gi";
import "./EmptyState.scss";

export default function EmptyState({ message, customElements }) {
    return (
        <div className="empty-screen-overlay">
            <GiEmptyMetalBucket className="icon" />
            <div className="message">{message}</div>
            {customElements}
        </div>
    );
}
