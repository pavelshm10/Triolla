import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Task } from "../../types/task.type";
import { CardSx } from "../../styles/sxStyles";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  return (
    <Card sx={CardSx.card}>
      <CardContent sx={CardSx.cardContent}>
        <Typography variant="h6">
          {task.title}
        </Typography>
        <Typography sx={CardSx.description} variant="body2">
          {task.description}
        </Typography>
        <Typography variant="caption">Priority: {task.priority}</Typography>
        <CardActions sx={{ padding: 0 }}>
          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            size="small"
            onClick={() => onEdit(task)}
          >
            Edit Task
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
