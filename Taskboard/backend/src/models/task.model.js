import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  description: {
    type: String,
    required: true,
    trim: true, 
  },
  priority: {
    type: Number,
    required: true,
    default: 0, 
    min: 0,
    max: 1,
  },
}, {
  timestamps: true,
});

taskSchema.pre('save', function(next) {
  const descriptionLength = this.description.length;
  this.priority = Math.min(1, descriptionLength / 100);

  next();
});

const Task = model('Task', taskSchema);

export default Task;
