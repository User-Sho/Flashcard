import axios from "axios";

const API_URL = "/api/flashcards/";

// Create new flashcard
const createCard = async (cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, cardData, config);
  return response.data;
};

// Get all flashcards for the specified user
const getAllCards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get FILTERED flashcards for the specified user (The R of CRUD)
const getFilteredCards = async ({ main, sub }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      category: main,
      tags: sub,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update a flashcard
const updateCard = async ({ cardID, cardData }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL + cardID, cardData, config);
  return response.data;
};

// Delete a flashcard
const deleteCard = async (cardID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + cardID, config);
  return response.data;
};

// Export services
const cardService = {
  createCard,
  getAllCards,
  getFilteredCards,
  updateCard,
  deleteCard,
};

export default cardService;
