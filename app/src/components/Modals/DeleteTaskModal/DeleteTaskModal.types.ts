import { ITask } from "../../../interfaces/tasks";
import { IModal } from "../../Modal/Modal.types";

export interface IDeleteTaskModal extends IModal {
  task: ITask | null;
  onDelete(id: string): void;
}
