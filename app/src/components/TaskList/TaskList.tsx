import React from "react";
import Task from "./../Task/Task";

interface TaskListProps {
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
  }>;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
