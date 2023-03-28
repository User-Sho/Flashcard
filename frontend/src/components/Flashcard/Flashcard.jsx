import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiAddToQueue } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import { RiErrorWarningLine } from "react-icons/ri";
import { CgClose } from "react-icons/cg";

import { showForm } from "../../features/modal/modalSlice";

import {
  getAllCards,
  getFilteredCards,
  deleteCard,
  reset,
} from "../../features/cards/cardSlice";
import { Spinner, CardForm } from "../../components/";
import "./Flashcard.css";

const Flashcard = ({ name }) => {
  const dispatch = useDispatch();

  const { cards, filters, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );

  const { modal } = useSelector((state) => state.form);

  const [cardNumber, setCardNumber] = useState(0);

  const [isAdd, setIsAdd] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [flip, setFlip] = useState(false);

  // values in selectedDropdown are used to perform queries in the backend
  const [selectedDropdown, setSelectedDropdown] = useState({
    main: "",
    sub: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  // mainCategory and subCategory are used in the dropdown lists.
  // these are populated based on all cards fetched by
  // dispatch(getAllCards) and won't be affected by
  // dispatch(getFilteredCards).
  const mainCategory = [
    ...new Set(filters.map((filter) => filter.category)),
  ].sort();
  const subCategory = [
    ...new Set(
      [
        ...new Set(
          filters.filter((filter) => filter.category === selectedDropdown.main)
        ),
      ]
        .map((filter) => filter.tags)
        .flat()
    ),
  ].sort();

  const nextCard = (e) => {
    e.stopPropagation();
    setCardNumber(Math.floor(Math.random() * cards.length));
  };

  const nextCardAndFlip = () => {
    setCardNumber(Math.floor(Math.random() * cards.length));
  };

  const onDelete = async () => {
    await dispatch(deleteCard(cards[cardNumber]._id));
    await dispatch(getAllCards()); // This updates items in the dropdown list after deleting a card.
    setSelectedDropdown({ main: "All", sub: "All" });
    setCardNumber(0);
    setShowMessage(true);
  };

  const onCloseDeleteMessage = () => {
    setShowMessage(false);
    setConfirmDelete(false);
  };
  // getAllCards useEffect
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllCards());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  // Handle dropdown onChange
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (selectedDropdown.main === "" || selectedDropdown.main === "All") {
      dispatch(getAllCards());
      return;
    }

    if (selectedDropdown.main !== "" || selectedDropdown.main !== "All") {
      dispatch(getFilteredCards(selectedDropdown));
    }
  }, [selectedDropdown, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {cards.length > 0 ? (
        <>
          <div className="flashcard__container">
            <form action="" className="flashcard__dropdown">
              <fieldset className="flashcard__filedset">
                <legend>Main Category</legend>
                <select
                  onChange={(e) => {
                    setSelectedDropdown({ main: e.target.value, sub: "All" });
                    setCardNumber(0);
                  }}
                  defaultValue={selectedDropdown.main}
                >
                  <option value="" disabled>
                    Select Main Category
                  </option>
                  <option value="All">All</option>
                  {mainCategory.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </fieldset>
              <fieldset className="flashcard__filedset">
                <legend>Sub Category</legend>
                <select
                  onChange={(e) => {
                    setSelectedDropdown({
                      main: selectedDropdown.main,
                      sub: e.target.value,
                    });
                    setCardNumber(0);
                  }}
                  defaultValue={selectedDropdown.sub}
                >
                  <option value="" disabled>
                    Select Sub Category
                  </option>
                  <option value="All">All</option>
                  {subCategory.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </fieldset>
            </form>

            {/* Flashcard - two sides: question side and answer side. */}
            <div
              onClick={() => setFlip(!flip)}
              className={`flashcard__card-wrapper ${flip ? "back" : ""}`}
            >
              {/* Question Side */}
              <div
                className={`flashcard__card question ${
                  flip ? "" : "text-scroll"
                } `}
              >
                <div className="flashcard__card-tags">
                  <p>{`${
                    selectedDropdown.main === "" ? "All" : selectedDropdown.main
                  } > ${
                    selectedDropdown.sub === "" ? "All" : selectedDropdown.sub
                  }`}</p>
                </div>

                <div className="flashcard__card-body">
                  <h3 className="question-title">Question:</h3>

                  <p className="flashcard__card-text">
                    {cards[cardNumber].question}
                  </p>
                  <div onClick={nextCard} className="flashcard__card-next">
                    Next &gt;
                  </div>
                </div>
              </div>

              {/*Answer Side */}
              <div
                className={`flashcard__card answer ${
                  flip ? "text-scroll" : ""
                }`}
              >
                <div className="flashcard__card-tags">
                  <p>{`${
                    selectedDropdown.main === "" ? "All" : selectedDropdown.main
                  } > ${
                    selectedDropdown.sub === "" ? "All" : selectedDropdown.sub
                  }`}</p>
                </div>
                <div className="flashcard__card-body">
                  <h3 className="answer-title">Answer:</h3>
                  <p className="flashcard__card-text">
                    {cards[cardNumber].answer}
                  </p>
                  <div
                    onClick={nextCardAndFlip}
                    className="flashcard__card-next"
                  >
                    Next &gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flashcard__no-cards">
            <h3>
              {`Welcome ${name}! Looks like you haven't created any flashcards yet. Go
              ahead and start making one now!`}
            </h3>
          </div>
        </>
      )}

      {/* CRUD buttons below */}
      <div className="home__button-container">
        {/* Create, Edit, and Delete buttons */}
        <div className="flashcard__card-crud">
          <button
            type="button"
            onClick={() => dispatch(showForm())}
            className="crud-btn create"
          >
            Create
            <div className="crud-btn-icon create-icon">
              <BiAddToQueue />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              dispatch(showForm());
              setIsAdd(false);
            }}
            className={`crud-btn edit ${cards.length <= 0 && "disabled"}`}
            disabled={cards.length > 0 ? false : true}
          >
            Edit
            <div className="crud-btn-icon edit-icon">
              <FiEdit />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className={`crud-btn delete ${cards.length <= 0 && "disabled"}`}
            disabled={cards.length > 0 ? false : true}
          >
            Delete
            <div className="crud-btn-icon delete-icon">
              <FiTrash />
            </div>
          </button>
        </div>
      </div>

      {/*Modal forms*/}
      {modal ? (
        <CardForm
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          currentCard={cards[cardNumber]}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          setSelectedDropdown={setSelectedDropdown}
        />
      ) : (
        ""
      )}

      {confirmDelete ? (
        <section className="home__delete-container">
          <div className="home__delete-box">
            {showMessage ? (
              <div className="message-box">
                <h3>Deleted 😉</h3>
              </div>
            ) : (
              <>
                <div className="crud-btn-icon delete-icon">
                  <RiErrorWarningLine />
                </div>
                <h3>
                  Stop! Once you delete this card, it will not be recoverable.
                  Are you sure you want to proceed?
                </h3>
                <button
                  type="button"
                  onClick={onDelete}
                  className="crud-btn delete"
                >
                  Delete
                </button>
              </>
            )}

            <div onClick={onCloseDeleteMessage} className="close-delete">
              <CgClose />
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Flashcard;
