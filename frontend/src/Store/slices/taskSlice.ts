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

export const editTask = createAsyncThunk(
  "task/editTask",
  async (
    {
      id,
      title,
      description,
      isDone,
      userid,
    }: {
      id: number;
      title: string;
      description: string;
      isDone: boolean;
      userid: number;
    },
    thunkAPI
  ) => {
    try {
      const data = await TaskService.update({
        id,
        title,
        description,
        isDone,
        userid,
      });
      console.log(data);
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

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: number, thunkAPI) => {
    try {
      const data = await TaskService.delete(id);
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
    builder.addCase(editTask.fulfilled, (state, action) => {
      const edited_state = state.data.map((task) => {
        if (task.id !== action.payload.id) return task;
        return {
          ...task,
          title: action.payload.title,
          description: action.payload.description,
          isDone: action.payload.isDone,
          AssignedUserId: action.payload.AssignedUserId,
        };
      });
      state.data = edited_state;
    });
    builder.addCase(editTask.rejected, (state, action) => {});
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { id } = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {});
  },
});
