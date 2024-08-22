import { FC } from "react";
import { Button as AntButton } from "antd";
import { IButton } from "./Button.types";

export const Button: FC<IButton> = (props) => {
  return <AntButton type="primary" {...props} />;
};
