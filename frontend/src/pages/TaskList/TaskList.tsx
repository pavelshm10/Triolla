// components/TaskList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../../components/TaskCard/TaskCard";
import TaskModal from "../../components/TaskModal/TaskModal";
import { Task } from "../../types/task.type";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
import { createTask, fetchTasks, updateTask } from "../../redux/task/taskThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useRedux";
import classes from "./TaskList.module.css";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector((state) => state.tasks.tasks);
  const metadata = useAppSelector((state) => state.tasks.metadata);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can change this based on preference

  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (!tasksData) return;
    setTasks(tasksData);
  }, [tasksData]);

  const openModalForNewTask = () => {
    setSelectedTask({
      title: "",
      description: "",
      priority: 0,
    } as Task);
    setIsNew(true);
    setModalOpen(true);
  };

  const openModalForUpdate = (task: Task) => {
    setSelectedTask(task);
    setIsNew(false);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskSubmit = (task: Task) => {
    if (selectedTask?._id) {
      dispatch(updateTask({ ...selectedTask, ...task }));
    } else {
      dispatch(createTask(task));
    }
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{ margin: "auto", display: "flex" }}
        variant="contained"
        color="primary"
        onClick={openModalForNewTask}
      >
        Add Task
      </Button>
      <div className={classes.grid_container}>
        <div className={classes.cards_container}>
          {tasks?.map((task) => (
            <TaskCard
              key={task._id}
              onEdit={(task) => openModalForUpdate(task)}
              task={task}
            />
          ))}
        </div>
      </div>
      {metadata && (
        <Stack spacing={2} style={{ marginTop: "20px", alignItems: "center" }}>
          <Pagination
            count={Math.ceil(metadata?.totalTasks / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
      {selectedTask && (
        <TaskModal
          open={isModalOpen}
          handleClose={handleClose}
          onSubmit={handleTaskSubmit}
          initialValues={selectedTask}
          isNew={isNew}
        />
      )}
    </div>
  );
};

export default TaskList;
