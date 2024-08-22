import { Typography } from "antd";
import { FC } from "react";
import { IModalTitle } from "./ModalTitle.types";

export const ModalTitle: FC<IModalTitle> = ({ text }) => {
  return (
    <Typography.Title style={{ margin: "15px 0" }} level={5}>
      {text}
    </Typography.Title>
  );
};
