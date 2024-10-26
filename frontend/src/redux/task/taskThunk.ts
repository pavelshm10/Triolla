// taskThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Metadata, Task } from "../../types/task.type";
const API_URL = "http://localhost:3000/api/tasks";

interface FetchTasksParams {
  page: number;
  limit: number;
}

export const fetchTasks = createAsyncThunk<{metadata:Metadata,tasks:Task[]}, FetchTasksParams>(
  'tasks/fetchTasks',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to load tasks');
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
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData:Task, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, taskData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('An error occurred while creating the task');
    }
  }
);
