import { PROGRESS_IDB_STORE, QUESTION_IDB } from "../constants/constants";
import { addToDB, getByIdFromDB } from "./indexedDBModule";

const dbName = QUESTION_IDB;
const storeName = PROGRESS_IDB_STORE;

export const updateProgressInBulk = async (
    progressInfo /* {topicId: {correctCount, solvedCount}} */
) =>
    addToDB(
        dbName,
        storeName,
        Object.entries(progressInfo).map(([topicId, progress]) => ({
            key: topicId,
            object: progress,
        }))
    );

export const updateProgress = async (topicId, solvedCount, correctCount) =>
    addToDB(dbName, storeName, [
        { key: topicId, object: { solvedCount, correctCount } },
    ]);

export const getProgress = async (topicId) =>
    getByIdFromDB(dbName, storeName, topicId);
