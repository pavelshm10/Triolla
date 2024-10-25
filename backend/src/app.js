import express from 'express';
import taskRoutes from './routes/tasks.routes.js';
import { logger, morganMiddleware } from './logger.js'
import { errorHandler } from './middleware/errorHandler.js'; 
import HttpError from './utils/HttpError.js';
import connectDB from '../config/db.js';

const app = express();
connectDB();
app.use(morganMiddleware);

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  const error = new HttpError(404, 'Resource not found');
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
