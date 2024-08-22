import Modal from "../../Modal/Modal";
import { IDeleteTabModal } from "./DeleteTabModal.types";
import { FC } from "react";

export const DeleteTabModal: FC<IDeleteTabModal> = ({
  onDelete,
  tab,
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      footerButtons={{
        onSubmit: () => tab && onDelete(tab?.id),
        submitText: "Delete",
      }}
      title={`Are you sure to delete tab "${tab?.name ?? ""}"?`}
    />
  );
};
