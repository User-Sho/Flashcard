import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import modalFormReducer from "../features/modal/modalSlice";
import cardReducer from "../features/cards/cardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: modalFormReducer,
    cards: cardReducer,
  },
});
