import { getResponses } from "../../browserDb/responses_Dao";
import { getQuestions } from "../../browserDb/solvedQuestion_Dao";
import { getProgress } from "../../browserDb/progress_Dao";
import { getUnsolvedQuestions } from "../../browserDb/unsolvedQuestion_Dao";
import {
    fetchSolvedQuestions,
    fetchQuestions,
} from "../../service/questionService";
import {
    setLoading,
    setQuestions,
    setResponses,
} from "../../store/questionSlice";
import { fetchQuestionsForAdmin } from "../../service/adminServices";
import { getQuestionsForAdmin } from "../../browserDb/adminQuestion_Dao";

// NEW QUESTIONS TO SOLVE
async function getNewQuestions(topicId, dispatch) {
    // fetch questions from indexedDB if previously fetched and unsolved exists
    dispatch(setLoading(true));
    const questions = await getUnsolvedQuestions(topicId);

    if (questions && questions.length > 0) {
        dispatch(setQuestions(questions));
        dispatch(setLoading(false));
        return;
    }

    // fetch questions from server
    dispatch(fetchQuestions(topicId));
}

// REVIEW PREVIOUSLY SOLVED QUESTIONS
async function reviewSolvedQuestions(topicId, dispatch) {
    // fetch questions from indexedDB if previously fetched and solved exists
    dispatch(setLoading(true));

    const [questions, progress, responsesRaw] = await Promise.all([
        getQuestions(topicId),
        getProgress(topicId),
        getResponses(topicId),
    ]);

    const solvedCount = progress?.solvedCount;

    const responses = {};
    responsesRaw.forEach(({ response, questionId }) => {
        responses[questionId] = response;
    });

    if (solvedCount === undefined || questions.length < solvedCount) {
        // API to get previously solved questions
        dispatch(fetchSolvedQuestions(topicId));
        return;
    }

    dispatch(setQuestions(questions));
    dispatch(setResponses(responses));
    dispatch(setLoading(false));
}

// LOAD QUESTIONS FOR ADMIN
async function loadQuestionsForAdmin(topicId, dispatch) {
    dispatch(setLoading(true));
    const questions = await getQuestionsForAdmin(topicId);

    if (questions && questions.length > 0) {
        dispatch(setQuestions(questions));
        dispatch(setLoading(false));
        return;
    }

    // fetch questions from server
    dispatch(fetchQuestionsForAdmin({ topicId, startIdx: 0 }));
}

const loadQuestions = (topicId, dispatch, type) => {
    switch (type) {
        case "review":
            reviewSolvedQuestions(topicId, dispatch);
            break;
        case "solve":
            getNewQuestions(topicId, dispatch);
            break;
        case "for-admin":
            loadQuestionsForAdmin(topicId, dispatch);
            break;
    }
};

export default loadQuestions;
