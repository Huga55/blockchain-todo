export enum ETaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: ETaskPriority;
  completed: boolean;
}
