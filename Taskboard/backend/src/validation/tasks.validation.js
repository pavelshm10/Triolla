import { body, param, validationResult } from 'express-validator';

// Validation rules for creating a task
export const createTaskValidation = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('description').notEmpty().withMessage('Description is required').trim(),
];

// Validation rules for updating a task
export const updateTaskValidation = [
  param('id').isMongoId().withMessage('Invalid task ID'),
  body('title').optional().trim(),
  body('description').optional().trim(),
];

// Validation rules for getting a task by ID
export const getTaskValidation = [
  param('id').isMongoId().withMessage('Invalid task ID'),
];

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
