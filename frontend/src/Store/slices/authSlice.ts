import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import AuthService from "../../Services/AuthService";
import UserService from "../../Services/UserService";

const user = JSON.parse(localStorage.getItem("user") as string);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await AuthService.register(username, email, password);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const changeProfile = createAsyncThunk(
  "user/changeprofile",
  async (
    { id, email, username }: { id: number; email: string; username: string },
    thunkAPI
  ) => {
    try {
      const data = await UserService.changeProfileData({ email, username, id });
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changepassword",
  async (
    {
      id,
      oldpassword,
      newpassword,
    }: { id: number; oldpassword: string; newpassword: string },
    thunkAPI
  ) => {
    try {
      const data = await UserService.changePassword({
        id,
        oldpassword,
        newpassword,
      });
      thunkAPI.dispatch(logout());
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(changeProfile.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(changeProfile.rejected, (state, action) => {});
    builder.addCase(changePassword.fulfilled, (state, action) => {});
    builder.addCase(changePassword.rejected, (state, action) => {});
  },
});
