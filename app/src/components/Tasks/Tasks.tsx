import React, { useState } from "react";
import { Button } from "../Button/Button";
import { ETaskPriority, ITask } from "../../interfaces/tasks";
import { Card, Flex } from "antd";

interface TasksProps {
  tasks: ITask[];
  onToggleComplete: (id: string) => void;
  onEditTask(id: string): void;
  onDeleteTask(id: string): void;
  // onViewTask: (task: Task): void; // New prop for viewing task details
  onMoveTaskUp: (id: string) => void; // New prop for moving task up
}

const Tasks: React.FC<TasksProps> = ({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  // onViewTask,
  onMoveTaskUp,
}) => {
  const [draggedTask, setDraggedTask] = useState<ITask | null>(null);

  const handleDragStart = (task: ITask) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (index: number) => {
    if (!draggedTask) return;
    onMoveTaskUp(draggedTask.id);
    setDraggedTask(null);
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const getColorByPriority = (priority: ETaskPriority) => {
    if (priority === ETaskPriority.HIGH) {
      return "#FF4444";
    }

    if (priority === ETaskPriority.MEDIUM) {
      return "#FFAA00";
    }

    return "#66CC66";
  };

  return (
    <Flex vertical gap={10} className="tasks">
      {tasks.map((task, index) => (
        <Card
          key={task.id}
          title={task.title}
          color="green"
          type="inner"
          hoverable
          styles={{
            header: {
              background: getColorByPriority(task.priority),
              color: "#ffffff",
            },
          }}
        >
          <p
            style={{
              textDecoration: task.completed ? "line-through" : "unset",
            }}
          >
            {task.description && task.description.length > 70
              ? `${task.description.slice(0, 70)}...`
              : task.description}
          </p>
          <Flex gap={20}>
            <Button onClick={() => onToggleComplete(task.id)}>
              {task.completed ? "Incomplete" : "Complete"}
            </Button>
            <Button onClick={() => onEditTask(task.id)}>Edit</Button>
            {task.completed && (
              <Button onClick={() => onDeleteTask(task.id)}>Delete</Button>
            )}
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default Tasks;
