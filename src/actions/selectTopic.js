import { setQuestions, setResponses } from "../store/questionSlice";

export default async function selectTopic(
    topicId,
    dispatch,
    navigate,
    props,
    intent
) {
    // Warm up questions page
    await Promise.all([
        dispatch(setQuestions([])),
        dispatch(setResponses(null)),
    ]);

    // check the intent
    if (intent === "user-response") {
        const { progressInfo } = props;

        navigate(`/user-progress/${topicId}`, { state: progressInfo[topicId] });
    } else {
        // default intent is to solve or review questions
        const { requestTopicNavDialog } = props;

        const response = await requestTopicNavDialog();

        switch (response) {
            case "primary":
                navigate(`/solve/${topicId}`);
                break;
            case "secondary":
                navigate(`/review/${topicId}`);
            default:
            /* do nothing */
        }
    }
}
