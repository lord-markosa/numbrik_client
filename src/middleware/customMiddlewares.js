import { addQuestionsForAdmin } from "../browserDb/adminQuestion_Dao";
import { addUnsolvedQuestion } from "../browserDb/unsolvedQuestion_Dao";
import { fetchQuestionsForAdmin } from "../service/adminServices";
import {
    fetchSolvedQuestions,
    fetchQuestions,
    sendResponses,
} from "../service/questionService";
import { loginUser, registerUser } from "../service/userService";
import getPreviousQuestionsCallback from "./getPreviousQuestionsCallback";
import responseSubmissionCallback from "./responseSubmissionCallback";
import userSignInCallback from "./userSignInCallback";

const customMiddlewares = (_) => (next) => (action) => {
    switch (true) {
        case loginUser.fulfilled.match(action):
        case registerUser.fulfilled.match(action):
            userSignInCallback(action.payload);
            break;

        case fetchQuestions.fulfilled.match(action):
            addUnsolvedQuestion(action.meta.arg, action.payload);
            break;

        case sendResponses.fulfilled.match(action):
            responseSubmissionCallback(
                action.meta.arg.topicId,
                action.meta.arg.responses,
                action.meta.arg.solvedCount,
                action.meta.arg.correctCount
            );
            break;

        case fetchSolvedQuestions.fulfilled.match(action):
            getPreviousQuestionsCallback({
                topicId: action.meta.arg,
                ...action.payload,
            });
            break;

        case fetchQuestionsForAdmin.fulfilled.match(action):
            addQuestionsForAdmin(action.meta.arg.topicId, action.payload);

        default:
            break;
    }

    return next(action);
};

export default customMiddlewares;
