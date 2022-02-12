import { configureStore, ThunkDispatch, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authSlice } from "./slices/authSlice";
import { messageSlice } from "./slices/messageSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    message: messageSlice.reducer,
  },
  devTools: true,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
