import { QUESTION_IDB, UNSOLVED_IDB_STORE } from "../constants/constants";
import { addToDB, getByIdFromDB, removeFromDB } from "./indexedDBModule";

const dbName = QUESTION_IDB;
const storeName = UNSOLVED_IDB_STORE;

export const addUnsolvedQuestion = async (topicId, unsolvedQuestions) =>
    unsolvedQuestions.length > 0 &&
    addToDB(dbName, storeName, [{ key: topicId, object: unsolvedQuestions }]);

export const removeTopicFromUnsolved = async (topicId) =>
    removeFromDB(dbName, storeName, topicId);

export const getUnsolvedQuestions = async (topicId) =>
    getByIdFromDB(dbName, storeName, topicId);
