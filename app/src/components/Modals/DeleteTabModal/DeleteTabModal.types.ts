import { ModalProps } from "antd";
import { ITab } from "../../../interfaces/tabs";
import { IModal } from "../../Modal/Modal.types";

export interface IDeleteTabModal extends IModal {
  onDelete(tabId: string): void;
  tab: ITab | null;
}
