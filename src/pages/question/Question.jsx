import React from "react";
import Button from "../../components/Button";
import classNames from "classnames";
import useNavigateBack from "../../hooks/useNavigateBack";

import "./Question.scss";

export default function Question({
    idx,
    question,
    totalQuestions,
    selectedAnswers,
    onSelectAnswer,
    showCorrectAnswers,
    showBackButton,
}) {
    const navigateToHome = useNavigateBack("/");

    React.useEffect(() => {
        window.MathJax.typeset();
    }, [
        question.problemStatement,
        question.options?.join(""),
        question.solution,
    ]);

    const handleOptionSelect = (optionIdx) => {
        if (!onSelectAnswer) {
            return;
        }

        switch (question.type) {
            case "multiCorrect":
                onSelectAnswer(
                    selectedAnswers.includes(optionIdx)
                        ? selectedAnswers.filter((res) => res !== optionIdx)
                        : [...selectedAnswers, optionIdx]
                );
                break;
            case "text":
                /* to be enabled later */
                break;
            default:
                selectedAnswers.includes(optionIdx)
                    ? onSelectAnswer([])
                    : onSelectAnswer([optionIdx]);
        }
    };

    return (
        <div className="question-container">
            <div className="question-top-header">
                {`Question: ${idx + 1}/${totalQuestions}`}
                {showBackButton && (
                    <Button
                        label="Back"
                        onClick={navigateToHome}
                        className="exit-button"
                        type="transparent"
                    />
                )}
            </div>
            <div className="problem-statement">{question.problemStatement}</div>
            {question.options.map((option, idx) => (
                <div
                    key={`${question.id}-${idx}`}
                    className={classNames(
                        "option",
                        selectedAnswers.includes(idx) && "selected",
                        showCorrectAnswers &&
                            (question.correctOption?.includes(idx)
                                ? "correct"
                                : "incorrect")
                    )}
                    onClick={() => handleOptionSelect(idx)}
                >
                    {option}
                </div>
            ))}

            {showCorrectAnswers && (
                <div className="solution">
                    {question.solution || "No Solution available"}
                </div>
            )}
        </div>
    );
}
