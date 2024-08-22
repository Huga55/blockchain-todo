import { ModalProps } from "antd";
import { IModal } from "../../Modal/Modal.types";

export interface IAddTabModal extends IModal {
  onAdd(tabName: string): void;
}

export interface IAddTabFormFields {
  name: string;
}
