import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
};

export const modalSlice = createSlice({
  name: " modalForm",
  initialState,
  reducers: {
    showForm: (state) => {
      state.modal = true;
    },
    closeForm: (state) => {
      state.modal = false;
    },
  },
});

export const { showForm, closeForm } = modalSlice.actions;
export default modalSlice.reducer;
