import Task from "../models/task.model.js";
import HttpError from "../utils/HttpError.js";

class TaskService {
  async createTask(taskData) {
    if (!taskData.title || !taskData.description) {
      throw new HttpError(400, "Task title and description are required");
    }

    const newTask = await Task.create(taskData);
    return newTask;
  }

  async getTaskById(taskId) {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new HttpError(404, "Task not found");
    }
    return task;
  }

  async updateTask(taskId, taskData) {
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
      new: true,
    });
    if (!updatedTask) {
      throw new HttpError(404, "Task not found");
    }
    return updatedTask;
  }

  async getTasks({ page, limit }) {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limitInt;
    const tasks = await Task.find().skip(skip).limit(limitInt);
    const totalTasks = await Task.countDocuments();
    const totalPages = Math.ceil(totalTasks / limitInt);

    return {
      metadata: {
        totalTasks,
        totalPages,
        currentPage: pageInt,
        tasksPerPage: limitInt,
      },
      tasks,
    };
  }
}

export default new TaskService();
