import { clearIndexedDB } from "../../browserDb/indexedDBModule";
import { QUESTION_IDB } from "../../constants/constants";

export default function logout() {
    localStorage.clear();
    clearIndexedDB(QUESTION_IDB);
}
