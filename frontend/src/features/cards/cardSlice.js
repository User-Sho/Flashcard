import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import cardService from "./cardService";

const initialState = {
  cards: [],
  filters: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new card
export const createCard = createAsyncThunk(
  "cards/create",
  async (cardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.createCard(cardData, token);
    } catch (error) {
      //here, we catch errors if any when making the post request.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all flashcards belonging to a specific user
export const getAllCards = createAsyncThunk(
  "cards/getAllCards",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.getAllCards(token);
    } catch (error) {
      //here, we catch errors if any when making the post request.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get FILTERED flashcards belonging to a specific user
export const getFilteredCards = createAsyncThunk(
  "cards/getFilteredCards",
  async (selectedDropdown, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.getFilteredCards(selectedDropdown, token);
    } catch (error) {
      //here, we catch errors if any when making the post request.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a card
export const updateCard = createAsyncThunk(
  "cards/update",
  async ({ cardID, cardData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await cardService.updateCard({ cardID, cardData }, token);
    } catch (error) {
      //here, we catch errors if any when making the post request.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a card
export const deleteCard = createAsyncThunk(
  "cards/delete",
  async (cardID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return cardService.deleteCard(cardID, token);
    } catch (error) {
      //here, we catch errors if any when making the post request.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Card SLICE
export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create new card
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards.push(action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get all cards
      .addCase(getAllCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
        state.filters = action.payload.map(({ category, tags }) => ({
          category,
          tags,
        }));
      })
      .addCase(getAllCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get filtered cards
      .addCase(getFilteredCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(getFilteredCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update a card
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards.push(action.payload);
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete a card
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = state.cards.filter(
          (card) => card._id !== action.payload.cardID
        );
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cardSlice.actions;
export default cardSlice.reducer;
