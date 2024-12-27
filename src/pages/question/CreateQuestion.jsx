import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAddOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircle, IoRemove } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import Question from "./Question";
import LoadingScreen from "../../components/LoadingScreen";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import topicsData from "../../constants/topics.json";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../components/Spinner";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useSearch } from "../../hooks/useSearch";
import { createQuestion } from "../../service/adminServices";
import { questionCreationStatus } from "../../selectors/adminSelectors";

import "./CreateQuestion.scss";

const CreateQuestion = () => {
    const dispatch = useDispatch();
    const navigateBack = useNavigateBack("/");

    const [inputs, setInputs] = React.useState(defaultInputs);
    const [tagInput, setTagInput] = React.useState("");
    const [error, setError] = React.useState("");

    const { creating, creationFailed } = useSelector(questionCreationStatus);

    const { items, searchQuery, reset, searchBarProps } = useSearch(topicsData);

    // most general
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputs((currentInputs) => ({
            ...currentInputs,
            [name]: value,
        }));
    };

    // topic handler
    React.useEffect(() => {
        if (items[0]?.id) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                topicId: items[0]?.id,
            }));
        }
    }, [searchQuery, items[0]?.id]);

    // options handler
    const optionChangeHandler = (index, value) => {
        setInputs((currentInputs) => {
            const newOptions = [...currentInputs.options];
            newOptions[index] = value;
            return { ...currentInputs, options: newOptions };
        });
    };

    const addOptionHandler = () => {
        setInputs((currentInputs) => ({
            ...currentInputs,
            options: [...currentInputs.options, ""],
        }));
    };

    const removeOptionHandler = () => {
        setInputs((currentInputs) => {
            const newOptions = [...currentInputs.options];
            newOptions.pop();
            return { ...currentInputs, options: newOptions };
        });
    };

    const correctOptionChangeHandler = (index) => {
        setInputs((currentInputs) => {
            const newCorrectOption = currentInputs.correctOption.includes(index)
                ? currentInputs.correctOption.filter((i) => i !== index)
                : [...currentInputs.correctOption, index];
            return {
                ...currentInputs,
                correctOption: newCorrectOption,
                type:
                    newCorrectOption.length > 1
                        ? "multiCorrect"
                        : "singleCorrect",
            };
        });
    };

    // tags handler
    const addTag = () => {
        if (tagInput.trim()) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                tags: [...currentInputs.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setInputs((currentInputs) => ({
            ...currentInputs,
            tags: currentInputs.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputs.topicId) {
            setError("Topic is required.");
            return;
        }

        if (!inputs.problemStatement.trim()) {
            setError("Problem statement is required.");
            return;
        }

        if (inputs.options.length < 2) {
            setError("At least two options are required.");
            return;
        }

        if (inputs.correctOption.length === 0) {
            setError("At least one correct option is required.");
            return;
        }

        if (inputs.lod < 1 || inputs.lod > 5) {
            setError("Level of difficulty must be between 1 and 5.");
            return;
        }

        setError(""); // Clear any previous errors
        console.log(inputs);
        await dispatch(createQuestion(inputs));

        if (!creationFailed) {
            setInputs(defaultInputs);
            reset();
        }
    };

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

            {/* Tags */}
            <div className="label">Tags</div>
            <div className="tags-container">
                {inputs.tags.map((tag, index) => (
                    <div key={index} className="tag">
                        {tag}
                        <Button
                            onClick={() => removeTag(tag)}
                            type="transparent"
                            className="tag-button"
                        >
                            <IoCloseCircleOutline />
                        </Button>
                    </div>
                ))}
                <Input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Tag Name"
                    className="tag-input"
                />
                <Button onClick={addTag} className={"add-tag-button"}>
                    <IoAddOutline />
                </Button>
            </div>
            <div className="label">Level of Difficulty (1-5)</div>

            {/* Level of Difficulty */}
            <Input
                type="number"
                name="lod"
                value={inputs.lod}
                onChange={inputChangeHandler}
                min="1"
                max="5"
            />
            <div className="label">Problem Statement</div>

            {/* Problem Statement */}
            <TextArea
                className="input-area"
                name="problemStatement"
                placeholder="Enter the problem statement here"
                value={inputs.problemStatement}
                onChange={inputChangeHandler}
                minRows={5}
            />

            {/* Options */}
            <div className="label">Options</div>
            {inputs.options.map((option, index) => (
                <div key={index} className="option-input">
                    <TextArea
                        placeholder={`Option ${index + 1}`}
                        className="input-area"
                        value={option.value}
                        onChange={(e) =>
                            optionChangeHandler(index, e.target.value)
                        }
                    />
                    <Button
                        onClick={() => correctOptionChangeHandler(index)}
                        type="transparent"
                        className="correct-button"
                    >
                        {inputs.correctOption?.includes(index) ? (
                            <IoCheckmarkCircle />
                        ) : (
                            <IoCheckmarkCircleOutline />
                        )}
                    </Button>
                </div>
            ))}

            <div className="buttons-container">
                <Button
                    className={"add-options-button"}
                    onClick={addOptionHandler}
                >
                    <IoAddOutline />
                </Button>
                {inputs.options.length > 0 && (
                    <Button
                        className={"add-options-button"}
                        onClick={removeOptionHandler}
                    >
                        <IoRemove />
                    </Button>
                )}
            </div>

            {/* Hint */}
            <div className="label">Hint</div>
            <TextArea
                placeholder="Enter the hint here"
                className="input-area"
                name="hint"
                value={inputs.hint}
                onChange={inputChangeHandler}
            />

            {/* Solution */}
            <div className="label">Solution</div>
            <TextArea
                placeholder="Enter the solution here"
                className="input-area"
                name="solution"
                value={inputs.solution}
                onChange={inputChangeHandler}
                minRows={2}
            />

            {/* Answer */}
            <div className="label">Answer</div>
            <TextArea
                placeholder="Enter the answer here (if applicable)"
                className="input-area"
                name="answer"
                value={inputs.answer}
                onChange={inputChangeHandler}
            />

            {error && <div className="error">{error}</div>}
            {inputs.problemStatement && (
                <Question
                    idx={0}
                    totalQuestions={1}
                    key={"0"}
                    question={inputs}
                    selectedAnswers={[]}
                    onSelectAnswer={() => {}}
                    showCorrectAnswers={true}
                    showBackToHome={false}
                    navigateToHome={() => {}}
                />
            )}

            {/* Submit Button */}
            <div className="buttons-container">
                {!creating ? (
                    <Button onClick={handleSubmit} className="action-button">
                        Create
                    </Button>
                ) : (
                    <Spinner small={true} className="spinner" />
                )}
            </div>
        </div>
    );
};

const defaultInputs = {
    topicId: "",
    tags: [],
    lod: 1,
    type: "singleCorrect",
    problemStatement: "",
    options: [],
    correctOption: [],
    hint: "",
    solution: "",
    answer: "",
};

export default CreateQuestion;
