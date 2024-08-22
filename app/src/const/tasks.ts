import { ETaskPriority } from "../interfaces/tasks";

export const taskPriorityOptions = [
  {
    value: ETaskPriority.LOW,
    label: "Low",
  },
  {
    value: ETaskPriority.MEDIUM,
    label: "Medium",
  },
  {
    value: ETaskPriority.HIGH,
    label: "High",
  },
] as const;
