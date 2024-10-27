import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import classes from "./App.module.css";

function App() {
  return (
    <>
      <h1 className={classes.title}>Taskboard</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
