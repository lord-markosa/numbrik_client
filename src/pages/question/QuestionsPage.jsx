import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Question from "./Question";
import LoadingScreen from "../../components/LoadingScreen";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import useNavigateBack from "../../hooks/useNavigateBack";
import { selectQuestionState } from "../../selectors/questionSelectors";

import "./QuestionsPage.scss";

export default function QuestionsPage({
    responses,
    setResponses,
    freezeResponses,
    lastQuestionButton,
    showBackButton,
}) {
    const [idx, setIdx] = React.useState(0);

    const { questions, loading } = useSelector(selectQuestionState);

    const handleNext = () => idx + 1 < questions?.length && setIdx(idx + 1);
    const handlePrev = () => setIdx(idx - 1);

    const navigateToHome = useNavigateBack("/");

    const onSelectAnswer = (answers) =>
        !freezeResponses &&
        setResponses((prev) => ({ ...prev, [questions[idx].id]: answers }));

    const buttonContainerClasses = classNames(
        "buttons-container",
        idx === 0 && "first"
    );

    const selectedAnswers = (responses && responses[questions[idx]?.id]) || [];

    const backButton = <Button onClick={navigateToHome} label="Back to home" />;

    return loading ? (
        <LoadingScreen />
    ) : questions.length === 0 ? (
        <EmptyState
            message="No questions found..."
            customElements={backButton}
        />
    ) : (
        <div className="question-page">
            <Question
                idx={idx}
                totalQuestions={questions.length}
                key={questions[idx].id}
                question={questions[idx]}
                selectedAnswers={selectedAnswers}
                onSelectAnswer={onSelectAnswer}
                showCorrectAnswers={freezeResponses}
                showBackButton={showBackButton}
            />
            <div className={buttonContainerClasses}>
                {idx > 0 && (
                    <Button
                        label="Previous"
                        onClick={handlePrev}
                        className="navigate-button"
                    />
                )}

                {idx + 1 < questions.length ? (
                    <Button
                        label="Next"
                        onClick={handleNext}
                        className="navigate-button"
                    />
                ) : (
                    lastQuestionButton
                )}
            </div>
        </div>
    );
}
