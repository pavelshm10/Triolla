export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: number;
};

export type Metadata = {
  totalTasks: number;
  totalPages: number;
  currentPage: number;
  tasksPerPage: number;
};
