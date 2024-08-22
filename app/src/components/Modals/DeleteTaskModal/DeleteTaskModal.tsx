import Modal from "../../Modal/Modal";
import { FC } from "react";
import { IDeleteTaskModal } from "./DeleteTaskModal.types";

export const DeleteTaskModal: FC<IDeleteTaskModal> = ({
  onDelete,
  task,
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      footerButtons={{
        onSubmit: () => task && onDelete(task?.id),
        submitText: "Delete",
      }}
      title={`Are you sure to delete task "${task?.title ?? ""}"?`}
    />
  );
};
