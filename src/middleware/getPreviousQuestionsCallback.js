import { updateProgress } from "../browserDb/progress_Dao";
import { addResponses } from "../browserDb/responses_Dao";
import { addQuestionsToTopic } from "../browserDb/solvedQuestion_Dao";

export default function getPreviousQuestionsCallback({
    topicId,
    questions,
    responses,
    correctCount,
    solvedCount,
}) {
    Promise.all([
        addQuestionsToTopic(topicId, questions),
        addResponses(topicId, responses),
        updateProgress(topicId, solvedCount, correctCount),
    ]);
}
