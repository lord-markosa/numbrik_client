import { ADMIN_QUESTION_IDB_STORE, QUESTION_IDB } from "../constants/constants";
import { addToDB, getFromDBWithCursor } from "./indexedDBModule";

const dbName = QUESTION_IDB;
const storeName = ADMIN_QUESTION_IDB_STORE;

export const getQuestionsForAdmin = async (topicId) =>
    getFromDBWithCursor(
        dbName,
        storeName,
        IDBKeyRange.bound(`${topicId}_`, `${topicId}_\uffff`, false, true)
    );

export const addQuestionsForAdmin = async (topicId, questions) =>
    addToDB(
        dbName,
        storeName,
        questions.map((q) => ({ key: `${topicId}_${q.id}`, object: q }))
    );
