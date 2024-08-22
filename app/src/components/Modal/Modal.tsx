import React from "react";
import { IModal } from "./Modal.types";
import { Modal as AntModal } from "antd";
import { ModalButtons } from "./ModalButtons/ModalButtons";
import { ModalTitle } from "./ModalTitle/ModalTitle";

const Modal: React.FC<IModal> = ({
  title,
  footerButtons,
  children,
  ...modalProps
}) => {
  return (
    <AntModal
      footer={
        <ModalButtons
          onCancel={modalProps.onClose}
          submitText="Submit"
          {...footerButtons}
        />
      }
      {...modalProps}
      centered
    >
      {title && <ModalTitle text={title} />}

      {children}
    </AntModal>
  );
};

export default Modal;
