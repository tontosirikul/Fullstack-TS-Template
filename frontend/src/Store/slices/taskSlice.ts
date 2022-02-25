import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../../Services/TaskService";
import { setMessage } from "./messageSlice";

export const createTask = createAsyncThunk(
  "task/create",
  async (
    {
      title,
      description,
      isDone,
      userid,
    }: {
      title: string;
      description: string;
      isDone: boolean;
      userid: number;
    },
    thunkAPI
  ) => {
    try {
      const data = await TaskService.create({
        title,
        description,
        isDone,
        userid,
      });
      return data;
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

export const getAllTask = createAsyncThunk(
  "task/getAllTask",
  async (userid: number, thunkAPI) => {
    try {
      const data = await TaskService.getUserTask(userid);
      return data;
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
const initialState: { data: any[]; loading: boolean } = {
  data: [],
  loading: true,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getAllTask.rejected, (state, action) => {});
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {});
  },
});
