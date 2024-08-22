import { ITab } from "../../../interfaces/tabs";
import { IModal } from "../../Modal/Modal.types";

export interface IEditTabModal extends IModal {
  onEdit(id: string, name: string): void;
  tab: ITab | null;
}

export interface IEditTabFormFields {
  name: string;
}
