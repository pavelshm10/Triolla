import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../../components/TaskCard/TaskCard";
import TaskModal from "../../components/TaskModal/TaskModal";
import { Task } from "../../types/task.type";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Snackbar,
  Stack,
} from "@mui/material";
import { createTask, fetchTasks, updateTask } from "../../redux/task/taskThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useRedux";
import classes from "./TaskList.module.css";
import Navbar from "../../components/Navbar/Navbar";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector((state) => state.tasks.tasks);
  const metadata = useAppSelector((state) => state.tasks.metadata);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const loading = useAppSelector((state) => state.tasks.loading);

  const [priorityFilter, setPriorityFilter] = useState<number | 0>(0);
  const [titleSearch, setTitleSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [order, setOrder] = useState<string | undefined>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    dispatch(
      fetchTasks({
        page: currentPage,
        limit: itemsPerPage,
        priority: priorityFilter ? priorityFilter : undefined,
        title: titleSearch ? titleSearch : undefined,
        sortBy: sortBy ? sortBy : undefined,
        order: order ? order : undefined,
      })
    );
  }, [dispatch, currentPage, priorityFilter, titleSearch, sortBy, order]);

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

  const handleTaskSubmit = async (task: Task) => {
    if (selectedTask?._id) {
      try {
        await dispatch(updateTask({ ...selectedTask, ...task })).unwrap;
        setSnackbarMessage("Task updated successfully!");
      } catch (error) {
        setSnackbarMessage("Failed to update task.");
      } finally {
        setSnackbarOpen(true);
      }
    } else {
      await dispatch(createTask(task));
    }
    handleClose();
  };

  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress size={80} color="primary" />
    </Box>
  ) : (
    <div>
      <Navbar
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        titleSearch={titleSearch}
        setTitleSearch={setTitleSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TaskList;
