import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:3000/api/tasks";

interface FetchTasksParams {
  page: number;
  limit: number;
  priority?: string | "";
  title?: string;
  sortBy?: string;
  order?: string;
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params: FetchTasksParams, { rejectWithValue }) => {
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== '' && value !== undefined)
      );

      const response = await axios.get(API_URL, { params: filteredParams });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, task);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "An error occurred");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: Task, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, taskData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred while creating the task");
    }
  }
);
