import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuestionsPage from "../question/QuestionsPage";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import useNavigateBack from "../../hooks/useNavigateBack";
import { fetchQuestionsForAdmin } from "../../service/adminServices";
import { selectQuestionState } from "../../selectors/questionSelectors";

export default function UserResponses() {
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();

    const [loadedMore, setLoadedMore] = React.useState(false);

    const navigateToAdminHome = useNavigateBack("/admin-home");

    const backButton = (
        <Button label="Back to home" onClick={navigateToAdminHome} />
    );

    if (!location?.state) {
        return (
            <EmptyState
                message={"Responses not found"}
                customElements={backButton}
            />
        );
    }

    const { responses } = location?.state;
    const topicId = params?.topicId;

    const { questions } = useSelector(selectQuestionState);

    const loadMoreQuestions = async () => {
        setLoadedMore(true);
        dispatch(
            fetchQuestionsForAdmin({ topicId, startIdx: questions.length })
        );
    };

    const lastQuestionButton = !loadedMore && (
        <Button label="Load More" onClick={loadMoreQuestions} />
    );

    return (
        <QuestionsPage
            responses={responses}
            freezeResponses={true}
            showBackButton={true}
            lastQuestionButton={lastQuestionButton}
        />
    );
}
