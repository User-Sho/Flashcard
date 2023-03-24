import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CgClose } from "react-icons/cg";

import { closeForm } from "../../features/modal/modalSlice";
import { createCard, updateCard } from "../../features/cards/cardSlice";
import { getAllCards } from "../../features/cards/cardSlice";
import "./CardForm.css";

const CardForm = ({
  isAdd,
  setIsAdd,
  currentCard,
  setSelectedDropdown,
  showMessage,
  setShowMessage,
}) => {
  const [formData, setFormData] = useState({
    question: isAdd ? "" : currentCard.question,
    answer: isAdd ? "" : currentCard.answer,
    category: isAdd ? "" : currentCard.category,
    tags: isAdd ? [] : currentCard.tags,
  });

  const dispatch = useDispatch();

  const { question, answer, category, tags } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeArray = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: e.target.value.split(","),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Remove whitespaces and blank data
    const tagArray = formData.tags
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    // Replace the user-entered tags with the tagArray validated above
    const validatedFormData = { ...formData, tags: tagArray };

    if (isAdd) {
      await dispatch(createCard(validatedFormData));
      await dispatch(getAllCards()); // this is needed to refresh the dropdown list options
      setSelectedDropdown({ main: "All", sub: "All" });
      setShowMessage(true);
    }

    if (!isAdd) {
      // The await below works as dispatch returns a promise
      await dispatch(
        updateCard({ cardID: currentCard._id, cardData: validatedFormData })
      );
      await dispatch(getAllCards()); // this is needed to refresh the dropdown list options
      setSelectedDropdown({ main: "All", sub: "All" });
      setShowMessage(true);
    }

    setFormData({
      question: "",
      answer: "",
      category: "",
      tags: [],
    });
  };

  return (
    <>
      <section className="cardForm-container">
        <form
          onSubmit={onSubmit}
          className={`cardForm-form ${showMessage ? "completed" : ""}`}
        >
          <h2>
            {isAdd ? (
              <>
                <span style={{ color: "orange" }}>Create</span> A New Card
              </>
            ) : (
              <>
                <span style={{ color: "orange" }}>Edit</span> This Card
              </>
            )}
          </h2>
          {showMessage ? (
            <h2 className="task-completed">Completed!</h2>
          ) : (
            <>
              <fieldset className="cardForm-fieldset">
                <legend htmlFor="question">Question</legend>
                <textarea
                  onChange={onChange}
                  id="question"
                  type="text"
                  name="question"
                  value={question}
                  required
                  autoFocus
                />
              </fieldset>
              <fieldset className="cardForm-fieldset">
                <legend htmlFor="answer">Answer</legend>
                <textarea
                  onChange={onChange}
                  id="answer"
                  type="text"
                  name="answer"
                  value={answer}
                  required
                />
              </fieldset>
              <fieldset className="cardForm-fieldset">
                <legend htmlFor="mainCategory">Main Category</legend>
                <input
                  onChange={onChange}
                  id="mainCategory"
                  type="text"
                  name="category"
                  value={category}
                  required
                />
              </fieldset>
              <fieldset className="cardForm-fieldset">
                <legend htmlFor="subCategory">Sub Category Tags</legend>
                <input
                  onChange={onChangeArray}
                  id="subCategory"
                  type="text"
                  name="tags"
                  value={tags}
                  placeholder=""
                  required
                />
              </fieldset>
              <div className="cardForm__submit">
                <button type="submit">Submit</button>
              </div>
            </>
          )}

          <div
            onClick={() => {
              dispatch(closeForm());
              setShowMessage(false);
              setIsAdd(true);
            }}
            className="cardForm-close"
          >
            <CgClose />
          </div>
        </form>
      </section>
    </>
  );
};

export default CardForm;
