import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionsPage from "./QuestionsPage";
import Results from "./Results";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import evaluateResponses from "../../utils/questionUtils/evaluateResponses";
import Button from "../../components/Button";
import { sendResponses } from "../../service/questionService";
import { useDialog } from "../../hooks/useDialog";
import { selectQuestionState } from "../../selectors/questionSelectors";

export default function SolveQuestions() {
    const params = useParams();
    const dispatch = useDispatch();

    const topicId = params?.topicId;

    const { questions } = useSelector(selectQuestionState);

    const { dialogProps, requestDialog } = useDialog();

    const [responses, setResponses] = React.useState({});
    const [shouldShowResults, setShouldShowResults] = React.useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(false);
    const [correctCount, setCorrectCount] = React.useState(0);

    const showResults = () => setShouldShowResults(true);
    const onReview = () => setShouldShowResults(false);

    const handleSubmit = async () => {
        const response = await requestDialog("Are you sure to submit?");

        if (response !== "primary") {
            return;
        }

        // count of correctly answered questions
        const score = evaluateResponses(questions, responses);

        // send responses to server
        dispatch(
            sendResponses({
                responses,
                topicId,
                correctCount: score,
                solvedCount: questions.length,
            })
        );

        // show results and correct answers
        setCorrectCount(score);
        setShowCorrectAnswers(true);
        showResults();
    };

    const lastQuestionButton = (
        <Button
            label={showCorrectAnswers ? "Show Results" : "Submit"}
            onClick={showCorrectAnswers ? showResults : handleSubmit}
            className="navigate-button"
        />
    );

    return shouldShowResults ? (
        <Results
            correctCount={correctCount}
            totalCount={questions.length}
            onReview={onReview}
        />
    ) : (
        <>
            <QuestionsPage
                responses={responses}
                setResponses={setResponses}
                freezeResponses={showCorrectAnswers}
                lastQuestionButton={lastQuestionButton}
            />
            <ConfirmationDialog {...dialogProps} />
        </>
    );
}
