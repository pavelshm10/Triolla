import { logger } from "../logger.js";
import TaskService from "../services/task.service.js";
import NodeCache from "node-cache";

const cache = new NodeCache();

class TaskController {
  async createTask(req, res) {
    try {
      const taskData = req.body;
      const newTask = await TaskService.createTask(taskData);
      logger.info(`Task created: ${newTask.id}`);
      return res.status(201).json(newTask);
    } catch (error) {
      logger.error(`Error creating task: ${error.message}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTask(req, res) {
    try {
      const taskId = req.params.id;
      console.log({ taskId });
      const cachedTask = cache.get(taskId);
      if (cachedTask) {
        logger.info(`Cache hit for task ID: ${taskId}`);
        return res.status(200).json(cachedTask);
      }
      const task = await TaskService.getTaskById(taskId);
      if (!task) {
        logger.warn(`Task not found: ${taskId}`);
        return res.status(404).json({ error: "Task not found" });
      }
      logger.info(`Fetched task: ${taskId}`);
      return res.json(task);
    } catch (error) {
      logger.error(`Error fetching task: ${error.message}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateTask(req, res) {
    try {
      const taskId = req.params.id;
      const updatedTask = await TaskService.updateTask(taskId, req.body);
      logger.info(`Task updated: ${taskId}`);
      return res.json(updatedTask);
    } catch (error) {
      logger.error(`Error updating task: ${error.message}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTasks(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        priority,
        title,
        sortBy = "createdAt",
        order = "asc",
      } = req.query;
      const filterOptions = { priority, title };

      const result = await TaskService.getTasks({
        page,
        limit,
        filterOptions,
        sortBy,
        order,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
