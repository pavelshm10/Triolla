import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Metadata, Task } from "../../types/task.type";
import { createTask, fetchTasks, updateTask } from "./taskThunk";

interface TasksState {
  tasks: Task[];
  metadata?: Metadata;
  error: string | null;
  loading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  error: null,
  loading: false
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.metadata = action.payload.metadata;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not fetch tasks";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload; // Update the task in state
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.error = null;
        state.tasks.push(action.payload); // Add new task to the tasks array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default tasksSlice.reducer;
