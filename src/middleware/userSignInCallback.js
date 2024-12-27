import { updateProgressInBulk } from "../browserDb/progress_Dao";
import { addResponses } from "../browserDb/responses_Dao";
import { setAdminToken } from "../utils/usersUtils/adminInfo";
import { setUserInfo } from "../utils/usersUtils/userInfo";

export default function userSignInCallback({
    adminToken,
    username,
    token,
    diamonds,
    progressInfo,
}) {
    setUserInfo({ username, token, diamonds });
    if (adminToken) {
        setAdminToken(adminToken);
    }

    Object.entries(progressInfo).forEach(([topicId, progress]) => {
        // update progress in indexedDB
        addResponses(topicId, progress.responses);
    });
    updateProgressInBulk(progressInfo);
}
