import { ModalProps } from "antd";
import { ITask } from "../../../interfaces/tasks";
import { IModal } from "../../Modal/Modal.types";

export type TNewTask = Omit<ITask, "id" | "completed">;

export interface IAddTaskModal extends IModal {
  onAdd(task: TNewTask): void;
}

export type TAddTaskFormFields = TNewTask;
