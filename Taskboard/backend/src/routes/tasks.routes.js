import { Router } from 'express';
import TaskController from '../controllers/task.controller.js';
import {
  createTaskValidation,
  updateTaskValidation,
  getTaskValidation,
  validate,
} from '../validation/tasks.validation.js';

const router = Router();

router.post('/', createTaskValidation, validate, TaskController.createTask);

router.get('/:id', getTaskValidation, validate, TaskController.getTask);

router.put('/:id', updateTaskValidation, validate, TaskController.updateTask);

export default router;
