import React from "react";
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Task } from "../../types/task.type";
import { CardSx } from "../../styles/sxStyles";
import { useTranslation } from "react-i18next";
import classes from "./TaskCard.module.css";
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { t } = useTranslation();

  const getBadgeColor = () => {
    if (task.priority >= 0.66) {
      return "error";
    } else if (task.priority >= 0.33) {
      return "warning";
    } else {
      return "success";
    }
  };

  return (
    <Card
      className={classes.card}
      sx={CardSx.card}
    >
      <CardContent sx={CardSx.cardContent}>
        <Badge
          color={getBadgeColor()}
          badgeContent=" "
          variant="dot"
          sx={CardSx.badge}
        >
          <Typography variant="h6">{t("task.title")}</Typography>
        </Badge>

        <Typography sx={CardSx.description} variant="body2">
          {t("task.description")}
        </Typography>
        <Typography variant="caption">
          {t("task.priority")}: {task.priority}
        </Typography>
        <CardActions sx={{ padding: 0 }}>
          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            size="small"
            onClick={() => onEdit(task)}
          >
            {t("task.edit")}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
