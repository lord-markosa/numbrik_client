import React from "react";
import Button from "../../components/Button";
import useNavigateBack from "../../hooks/useNavigateBack";

import "./Results.scss";

export default function Results({ correctCount, totalCount, onReview }) {
    const navigateToHome = useNavigateBack("/");

    return (
        <div className="results-container">
            <div className="score-box">
                <div className="label">Your Score</div>
                <div className="score">{`${correctCount}/${totalCount}`}</div>
            </div>
            <div className="congratulation">
                <div className="label">Congratulations!</div>
                <div className="message">You won {correctCount} diamonds</div>
            </div>
            <div className="action-buttons">
                <Button
                    className="action-button"
                    label="Review"
                    onClick={onReview}
                />
                <Button
                    className="action-button"
                    type="secondary"
                    label="Back to Home"
                    onClick={navigateToHome}
                />
            </div>
        </div>
    );
}
