import { ModalProps } from "antd";
import { ITask } from "../../../interfaces/tasks";
import { TNewTask } from "../AddTaskModal/AddTaskModal.types";
import { IModal } from "../../Modal/Modal.types";

export interface IEditTaskModal extends IModal {
  onEdit(task: ITask): void;
  task: ITask | null;
}

export type TEditTaskFormFields = TNewTask;
