import { updateProgress } from "../browserDb/progress_Dao";
import { addResponses } from "../browserDb/responses_Dao";
import { addQuestionsToTopic } from "../browserDb/solvedQuestion_Dao";
import {
    getUnsolvedQuestions,
    removeTopicFromUnsolved,
} from "../browserDb/unsolvedQuestion_Dao";
import { incrementDiamonds } from "../utils/usersUtils/userInfo";

export default async function responseSubmissionCallback(
    topicId,
    responses,
    solvedCount,
    correctCount
) {
    // get from idb unsolved using the topicId
    const unsolvedQuestions = await getUnsolvedQuestions(topicId);

    Promise.all([
        // and remove the topic from unsolved
        removeTopicFromUnsolved(topicId),
        addQuestionsToTopic(topicId, unsolvedQuestions),
        addResponses(topicId, responses),
        updateProgress(topicId, solvedCount, correctCount),
    ]);

    incrementDiamonds(correctCount);
}
