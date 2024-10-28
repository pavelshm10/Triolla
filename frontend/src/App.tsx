import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TaskList from "./pages/TaskList/TaskList";
import classes from "./App.module.css";
import "./i18n";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className={classes.title}>{t("general.title")}</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
