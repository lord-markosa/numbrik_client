import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackOutline } from "react-icons/io5";
import QuestionForm from "./QuestionForm";
import Question from "./Question";
import Button from "../../components/Button";
import useNavigateBack from "../../hooks/useNavigateBack";
import topicsData from "../../constants/topics.json";
import SearchBar from "../../components/SearchBar";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import Spinner from "../../components/Spinner";
import { useSearch } from "../../hooks/useSearch";
import { useDialog } from "../../hooks/useDialog";
import { questionCreationStatus } from "../../selectors/adminSelectors";
import { createQuestion, generateQuestion } from "../../service/adminServices";

import "./CreateQuestion.scss";
import TextArea from "../../components/TextArea";

const CreateQuestion = () => {
    const navigateBack = useNavigateBack("/");
    const dispatch = useDispatch();

    const [prompt, setPrompt] = React.useState("");
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [questions, setQuestions] = React.useState([defaultInputs]);
    const [idx, setIdx] = React.useState(0);
    const [error, setError] = React.useState("");

    const { dialogProps, requestDialog } = useDialog();

    const { creating, creationFailed } = useSelector(questionCreationStatus);

    const inputs = questions[idx];

    const setInputs = (callback) => {
        setQuestions(questions.map((q, i) => (i === idx ? callback(q) : q)));
    };

    const { searchBarProps } = useSearch(topicsData, {
        onSelectCallback: (item) => {
            setQuestions(questions.map((q) => ({ ...q, topicId: item.id })));
        },
    });

    const validateInputs = () => {
        if (!inputs.topicId) {
            setError("Topic is required.");
            return 0;
        }

        if (!inputs.problemStatement.trim()) {
            setError("Problem statement is required.");
            return 0;
        }

        if (inputs.options.length < 2) {
            setError("At least two options are required.");
            return 0;
        }

        if (inputs.correctOption.length === 0) {
            setError("At least one correct option is required.");
            return 0;
        }

        return 1;
    };

    const handleSubmit = async (e) => {
        // this error has to be logged while clicking on next button
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        setError(""); // Clear any previous errors
        console.log(questions);

        const response = await requestDialog(
            "Are you sure to create these questions?"
        );

        if (response !== "primary") {
            return;
        }

        await dispatch(createQuestion(questions));

        if (!creationFailed) {
            navigateBack();
        }
    };

    const handleNext = () => {
        if (!validateInputs()) {
            return;
        }

        setError(""); // Clear any previous errors
        setIdx(idx + 1);
    };

    const addQuestion = () => {
        if (!validateInputs()) {
            return;
        }
        setQuestions([
            ...questions,
            { ...defaultInputs, topicId: questions[0].topicId },
        ]);
        setIdx(idx + 1);
    };

    const removeQuestion = async () => {
        const response = await requestDialog(
            "Are you sure to delete this question?"
        );
        if (response !== "primary" || questions.length === 1) {
            return;
        }
        if (idx === questions.length - 1) {
            setIdx(idx - 1);
        }
        setQuestions((q) => q.filter((_, i) => i !== idx));
    };

    const onGenerateQuestion = async () => {
        if (!prompt.trim()) {
            return;
        }

        const confirmationRes = await requestDialog(
            "Are you sure to generate questions?"
        );

        if (confirmationRes !== "primary") {
            return;
        }

        setIsGenerating(true);

        const response = await dispatch(generateQuestion(prompt));

        if (response.payload.questions) {
            setQuestions(
                response.payload.questions.map((q) => ({
                    ...defaultInputs,
                    ...q,
                }))
            );
        }

        setIsGenerating(false);
    };

    const handlePrev = () => setIdx(idx - 1);

    const buttonContainerClasses = classNames(
        "buttons-container",
        idx === 0 && "first"
    );

    return (
        <div className="create-question-page">
            <div className="header">
                <Button
                    onClick={navigateBack}
                    type="transparent"
                    className={"back-button"}
                >
                    <IoArrowBackOutline />
                </Button>
                <div className="title">New Question</div>
            </div>

            {/* Topic Selection Bar */}
            <div className="label">Select Topic</div>
            <SearchBar {...searchBarProps} className="search-bar" />

            <QuestionForm inputs={inputs} setInputs={setInputs} />
            {error && <div className="error">{error}</div>}

            {inputs.problemStatement && (
                <Question
                    idx={idx}
                    totalQuestions={questions.length}
                    key={idx}
                    question={inputs}
                    selectedAnswers={[]}
                    onSelectAnswer={() => {}}
                    showCorrectAnswers={true}
                    showBackToHome={false}
                    navigateToHome={() => {}}
                />
            )}

            {/* Add new question and remove buttons */}
            <div className={"buttons-container"}>
                <Button
                    onClick={removeQuestion}
                    className="action-button"
                    type="transparent"
                    disabled={questions.length === 1}
                >
                    Remove
                </Button>
                <Button
                    onClick={addQuestion}
                    className="action-button"
                    type="transparent"
                    disabled={idx !== questions.length - 1}
                >
                    Add
                </Button>
            </div>

            {/* Navigation Buttons */}
            <div className={buttonContainerClasses}>
                {idx > 0 && (
                    <Button onClick={handlePrev} className="action-button">
                        Prev
                    </Button>
                )}
                {idx < questions.length - 1 ? (
                    <Button onClick={handleNext} className="action-button">
                        Next
                    </Button>
                ) : !creating ? (
                    <Button onClick={handleSubmit} className="action-button">
                        Create
                    </Button>
                ) : (
                    <Spinner small={true} className="spinner" />
                )}
            </div>

            <div className="prompt-section">
                <div className="label">Generate questions</div>
                <TextArea
                    placeholder="Prompt"
                    className="input-area"
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    minRows={4}
                />
                <div className="buttons-container">
                    {isGenerating ? (
                        <Spinner small={true} className="spinner" />
                    ) : (
                        <Button
                            onClick={onGenerateQuestion}
                            className="action-button"
                        >
                            Generate
                        </Button>
                    )}
                </div>
            </div>

            <ConfirmationDialog {...dialogProps} />
        </div>
    );
};

const defaultInputs = {
    topicId: "",
    tags: [],
    lod: 1,
    type: "singleCorrect",
    problemStatement: "",
    options: ["", ""],
    correctOption: [],
    hint: "",
    solution: "",
    answer: "",
};

export default CreateQuestion;
