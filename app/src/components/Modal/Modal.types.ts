import { ModalProps } from "antd";
import { IModalButtons } from "./ModalButtons/ModalButtons.types";

export interface IModal extends ModalProps {
  title?: string;
  footerButtons?: IModalButtons;
}
