import { createSlice } from "@reduxjs/toolkit";
const initialState = { message: "" };
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});
const { actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
