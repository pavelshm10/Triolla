import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import classes from "./App.module.css";
import { useAppSelector } from "./redux/hooks/useRedux";
import { Box, CircularProgress } from "@mui/material";
function App() {
  const loading = useAppSelector((state) => state.tasks.loading);
  return (
    <>
      <h1 className={classes.title}>Taskboard</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
      {/* {loading && ( */}
       
      {/* )} */}
    </>
  );
}

export default App;
