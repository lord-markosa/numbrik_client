export default function evaluateResponses(questions, responses) {
    // count of correctly answered questions
    let correctCount = 0;

    questions.forEach((question) => {
        const selectedAnswers = responses[question.id] || [];
        const correctAnswers = question.correctOption;

        // evaluation criteria: just return correctly answered questions
        switch (question.type) {
            case "multiCorrect": {
                if (
                    selectedAnswers.length === correctAnswers.length &&
                    selectedAnswers.every((val) => correctAnswers.includes(val))
                ) {
                    correctCount++;
                }
                break;
            }
            default: {
                if (
                    selectedAnswers.length === 1 &&
                    correctAnswers.includes(selectedAnswers[0])
                ) {
                    correctCount++;
                }
                break;
            }
        }
    });

    console.log(`${correctCount} out of ${questions.length} questions correct`);

    return correctCount;
}
