
import { logger } from '../logger.js';

export const errorHandler = (
  err ,
  req,
  res,
  next
) => {
  logger.error(`Error occurred: ${err.message}`);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
