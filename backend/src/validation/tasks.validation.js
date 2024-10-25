import { body, param, validationResult, query } from "express-validator";

export const createTaskValidation = [
  body("title").notEmpty().withMessage("Title is required").trim(),
  body("description").notEmpty().withMessage("Description is required").trim(),
];

export const updateTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  body("title").optional().trim(),
  body("description").optional().trim(),
];

export const getTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task ID"),
];

export const getTasksValidation  = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer.'),
  query('priority').optional().isIn(['high', 'medium', 'low']).withMessage('Invalid priority level.'),
  query('title').optional().isString().trim().withMessage('Title must be a string.'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
