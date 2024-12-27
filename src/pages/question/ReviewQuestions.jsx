import React from "react";
import { useSelector } from "react-redux";
import QuestionsPage from "./QuestionsPage";
import { selectResponses } from "../../selectors/questionSelectors";

export default function ReviewQuestion() {
    const responses = useSelector(selectResponses);

    return (
        <QuestionsPage
            responses={responses}
            freezeResponses={true}
            showBackButton={true}
        />
    );
}
