import { Flex } from "antd";
import { Button } from "../../Button/Button";
import { FC } from "react";
import { IModalButtons } from "./ModalButtons.types";

export const ModalButtons: FC<IModalButtons> = ({
  onCancel,
  onSubmit,
  submitText,
  cancelText,
  formName,
}) => {
  return (
    <Flex justify="end" gap={10}>
      <Button form="" onClick={onCancel} type="default">
        {cancelText || "Close"}
      </Button>
      <Button form={formName} onClick={onSubmit} htmlType="submit">
        {submitText}
      </Button>
    </Flex>
  );
};
