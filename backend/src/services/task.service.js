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

  async getTasks({ page = 1, limit = 10, filterOptions, sortBy, order }) {
    const query = {};

    if (filterOptions.priority) {
      switch (filterOptions.priority) {
        case 'low':
          query.priority = { $lt: 0.33 };
          break;
        case 'medium':
          query.priority = { $gte: 0.33, $lt: 0.66 };
          break;
        case 'high':
          query.priority = { $gte: 0.66, $lte: 1 };
          break;
      }
      console.log("test ", query.priority);
    }

    if (filterOptions.title) {
      query.title = new RegExp(filterOptions.title, "i");
    }

    const skip = (page - 1) * limit;

    const sortOptions = {};
    sortOptions[sortBy] = order === "desc" ? -1 : 1;

    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // Total count for metadata
    const totalTasks = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limit);

    return {
      metadata: {
        totalTasks,
        totalPages,
        currentPage: Number(page),
        tasksPerPage: Number(limit),
      },
      tasks,
    };
  }
}

export default new TaskService();
