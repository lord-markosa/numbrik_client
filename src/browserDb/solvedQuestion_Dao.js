import { QUESTION_IDB, SOLVED_IDB_STORE } from "../constants/constants";
import { addToDB, getFromDBWithCursor, removeFromDB } from "./indexedDBModule";

const dbName = QUESTION_IDB;
const storeName = SOLVED_IDB_STORE;

export const getQuestions = async (topicId) =>
    getFromDBWithCursor(
        dbName,
        storeName,
        IDBKeyRange.bound(`${topicId}_`, `${topicId}_\uffff`, false, true)
    );

export const addQuestionsToTopic = async (topicId, questions) =>
    addToDB(
        dbName,
        storeName,
        questions.map((q) => ({ key: `${topicId}_${q.id}`, object: q }))
    );

export const removeTopic = async (topicId) =>
    removeFromDB(dbName, storeName, topicId);
