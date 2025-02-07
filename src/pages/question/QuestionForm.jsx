import React from "react";
import {
    IoAddOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoCheckmarkCircle,
    IoRemove,
} from "react-icons/io5";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

import "./QuestionForm.scss";

export default function QuestionForm({ inputs, setInputs }) {
    const [tagInput, setTagInput] = React.useState("");

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

    // most general
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputs((currentInputs) => ({
            ...currentInputs,
            [name]: value,
        }));
    };

    return (
        <>
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
                        value={option}
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
                minRows={8}
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
        </>
    );
}
