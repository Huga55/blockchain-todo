import React, { useState } from "react";
import Tabs from "./components/Tabs/Tabs";
import Tasks from "./components/Tasks/Tasks";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./components/Button/Button";
import { Checkbox, Flex, Input, Select } from "antd";
import { useStoredState } from "./hooks/useStoredState";
import { AddTabModal } from "./components/Modals/AddTabModal/AddTabModal";
import { useManageModal } from "./hooks/useManageModal";
import { DeleteTabModal } from "./components/Modals/DeleteTabModal/DeleteTabModal";
import { EditTabModal } from "./components/Modals/EditTabModal/EditTabModal";
import { ETaskPriority, ITask } from "./interfaces/tasks";
import { ITab } from "./interfaces/tabs";
import { taskPriorityOptions } from "./const/tasks";
import { AddTaskModal } from "./components/Modals/AddTaskModal/AddTaskModal";
import { TNewTask } from "./components/Modals/AddTaskModal/AddTaskModal.types";
import { EditTaskModal } from "./components/Modals/EditTaskModal/EditTaskModal";
import { DeleteTaskModal } from "./components/Modals/DeleteTaskModal/DeleteTaskModal";
import { tabModel } from "./blockChain/tabs/TabModel";

const defaultColorFilter = {
  [ETaskPriority.LOW]: true,
  [ETaskPriority.MEDIUM]: true,
  [ETaskPriority.HIGH]: true,
} as const;

const App: React.FC = () => {
  console.log("tabstabs", tabModel.getTabs());

  const [tasks, setTasks] = useStoredState<{ [key: string]: ITask[] }>(
    "tasks",
    {}
  );
  const [tabs, setTabs] = useStoredState<ITab[]>("tabs", [
    { id: uuidv4(), name: "Default" },
  ]);
  const [currentTab, setCurrentTab] = useStoredState<string>(
    "currentTab",
    tabs[0].id
  );
  const [searchTerm, setSearchTerm] = useStoredState("tasksSearch", "");
  const [filter, setFilter] = useStoredState<
    "all" | "completed" | "notCompleted"
  >("completedFilter", "all");
  const [colorFilter, setColorFilter] = useStoredState<
    Record<ETaskPriority, boolean>
  >("importantFilter", defaultColorFilter);
  const [deleteOrEditTab, setDeleteOrEditTab] = useState<ITab | null>(null);
  const [deleteOrEditTask, setDeleteOrEditTask] = useState<ITask | null>(null);
  const {
    open: isOpenAddTab,
    handleClose: closeAddTab,
    handleOpen: openAddTab,
  } = useManageModal();
  const {
    open: isOpenDeleteTab,
    handleClose: closeDeleteTab,
    handleOpen: openDeleteTab,
  } = useManageModal();
  const {
    open: isOpenEditTab,
    handleClose: closeEditTab,
    handleOpen: openEditTab,
  } = useManageModal();

  const {
    open: isOpenAddTask,
    handleClose: closeAddTask,
    handleOpen: openAddTask,
  } = useManageModal();
  const {
    open: isOpenEditTask,
    handleClose: closeEditTask,
    handleOpen: openEditTask,
  } = useManageModal();
  const {
    open: isOpenDeleteTask,
    handleClose: closeDeleteTask,
    handleOpen: openDeleteTask,
  } = useManageModal();

  const handleAddTab = (name: string) => {
    const newTab = { id: uuidv4(), name };
    setTabs([...tabs, newTab]);
    setTasks({ ...tasks, [newTab.id]: [] });
    closeAddTab();
  };

  const handleEditTab = (id: string, name: string) => {
    const updatedTabs = tabs.map((tab) =>
      tab.id === id ? { ...tab, name } : tab
    );
    setTabs(updatedTabs);
    closeEditTab();
  };

  const handleOpenEditTabModal = (id: string) => {
    const currentTab = tabs.find((tab) => tab.id === id);

    if (!currentTab) {
      return;
    }

    setDeleteOrEditTab(currentTab);
    openEditTab();
  };

  const handleOpenDeleteTabModal = (id: string) => {
    const currentTab = tabs.find((tab) => tab.id === id);

    if (!currentTab) {
      return;
    }

    setDeleteOrEditTab(currentTab);
    openDeleteTab();
  };

  const handleOpenEditTaskModal = (id: string) => {
    const currentTask = tasks[currentTab]?.find((task) => task.id === id);

    if (!currentTask) {
      return;
    }

    setDeleteOrEditTask(currentTask);
    openEditTask();
  };

  const handleOpenDeleteTaskModal = (id: string) => {
    const currentTask = tasks[currentTab]?.find((task) => task.id === id);

    if (!currentTask) {
      return;
    }

    setDeleteOrEditTask(currentTask);
    openDeleteTask();
  };

  const handleDeleteTab = (id: string) => {
    if (tabs.length === 1) {
      return;
    }

    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);
    delete tasks[id];
    setTasks(tasks);

    if (currentTab === id) {
      setCurrentTab(updatedTabs[0].id);
    }

    closeEditTab();
  };

  const handleAddTask = ({ description = "", priority, title }: TNewTask) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      priority,
      completed: false,
    };
    console.log("handleAddTask", {
      currentTab,
      tasks,
      newTask,
      res: { [currentTab]: [...(tasks[currentTab] || []), newTask] },
      fullResult: {
        ...tasks,
        [currentTab]: [...(tasks[currentTab] || []), newTask],
      },
      tabTasks: tasks[currentTab],
    });
    setTasks({
      ...tasks,
      [currentTab]: [...(tasks[currentTab] || []), newTask],
    });
    closeAddTask();
  };

  const handleEditTask = (updatedTask: ITask) => {
    const updatedTasks = tasks[currentTab].map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks({ ...tasks, [currentTab]: updatedTasks });
    closeEditTask();
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks[currentTab].filter((task) => task.id !== id);
    setTasks({ ...tasks, [currentTab]: updatedTasks });
    closeDeleteTask();
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks[currentTab].map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks({ ...tasks, [currentTab]: updatedTasks });
  };

  const filteredTasks = tasks[currentTab]
    ?.filter((task) => task.title.includes(searchTerm))
    .filter(
      (task) =>
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "notCompleted" && !task.completed)
    )
    .filter((task) => colorFilter[task.priority]);

  const handleMoveTaskUp = (id: string) => {
    const taskIndex = tasks[currentTab].findIndex((task) => task.id === id);
    if (taskIndex > 0) {
      const updatedTasks = [...tasks[currentTab]];
      const movedTask = updatedTasks.splice(taskIndex, 1)[0];
      updatedTasks.splice(taskIndex - 1, 0, movedTask);
      setTasks({ ...tasks, [currentTab]: updatedTasks });
    }
  };

  return (
    <div className="app">
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onAddTab={openAddTab}
        onEditTab={handleOpenEditTabModal}
        onDeleteTab={handleOpenDeleteTabModal}
      />
      <Flex gap={10} vertical className="task-controls">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={filter}
          onChange={(value) =>
            setFilter(value as "all" | "completed" | "notCompleted")
          }
        >
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="notCompleted">Not Completed</Select.Option>
        </Select>
        <Flex>
          {taskPriorityOptions.map(({ label, value }) => (
            <Checkbox
              checked={colorFilter[value]}
              onChange={(e) =>
                setColorFilter({ ...colorFilter, [value]: e.target.checked })
              }
              key={value}
            >
              {label}
            </Checkbox>
          ))}
        </Flex>
      </Flex>
      <Tasks
        tasks={filteredTasks || []}
        onToggleComplete={handleToggleComplete}
        onEditTask={handleOpenEditTaskModal}
        onDeleteTask={handleOpenDeleteTaskModal}
        // onViewTask={handleViewTask}
        onMoveTaskUp={handleMoveTaskUp}
      />
      <Button onClick={openAddTask}>Add Task</Button>

      <AddTabModal
        open={isOpenAddTab}
        onAdd={handleAddTab}
        onClose={closeAddTab}
      />

      <EditTaskModal
        onEdit={handleEditTask}
        task={deleteOrEditTask}
        open={isOpenEditTask}
        onClose={closeEditTask}
      />

      <DeleteTaskModal
        open={isOpenDeleteTask}
        onClose={closeDeleteTask}
        task={deleteOrEditTask}
        onDelete={handleDeleteTask}
      />

      <DeleteTabModal
        onDelete={handleDeleteTab}
        onClose={closeDeleteTab}
        tab={deleteOrEditTab}
        open={isOpenDeleteTab}
      />

      <EditTabModal
        open={isOpenEditTab}
        onClose={closeEditTab}
        tab={deleteOrEditTab}
        onEdit={handleEditTab}
      />

      <AddTaskModal
        open={isOpenAddTask}
        onClose={closeAddTask}
        onAdd={handleAddTask}
      />
    </div>
  );
};

export default App;
