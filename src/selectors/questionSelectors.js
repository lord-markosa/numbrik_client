import { createSelector } from "@reduxjs/toolkit";

export const selectQuestionState = createSelector(
    (state) => state.question,
    (question) => ({ questions: question.questions, loading: question.loading })
);

export const selectResponses = createSelector(
    (state) => state.question,
    (question) => question.responses
);
