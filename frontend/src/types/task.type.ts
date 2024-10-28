export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: number;
  createdAt?: Date;
};

export type Metadata = {
  totalTasks: number;
  totalPages: number;
  currentPage: number;
  tasksPerPage: number;
};
