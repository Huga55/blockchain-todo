import React from "react";
import { Button } from "../Button/Button";

interface TaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
  };
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onToggleComplete, onDelete }) => {
  const { id, title, description, priority, completed } = task;

  return (
    <div className={`task ${priority} ${completed ? "completed" : ""}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={() => onToggleComplete(id)}>
        {completed ? "Uncomplete" : "Complete"}
      </Button>
      <Button onClick={() => onDelete(id)}>Delete</Button>
    </div>
  );
};

export default Task;
