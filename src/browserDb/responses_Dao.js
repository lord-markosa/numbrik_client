import { QUESTION_IDB, RESPONSES_IDB_STORE } from "../constants/constants";
import { addToDB, getFromDBWithCursor } from "./indexedDBModule";

const dbName = QUESTION_IDB;
const storeName = RESPONSES_IDB_STORE;

export const getResponses = async (topicId) =>
    getFromDBWithCursor(
        dbName,
        storeName,
        IDBKeyRange.bound(`${topicId}_`, `${topicId}_\uffff`, false, true)
    );

export const addResponses = async (topicId, responses) =>
    addToDB(
        dbName,
        storeName,
        Object.entries(responses).map(([questionId, response]) => ({
            key: `${topicId}_${questionId}`,
            object: { response, questionId },
        }))
    );
