import { IconButton } from "@material-ui/core";
import React, { MouseEventHandler } from "react";
interface IProps {
  component: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const FloatingCardButton = ({ component, onClick }: IProps) => {
  return (
    <IconButton
      disableRipple
      style={{ borderRadius: 6, backgroundColor: "#FFF", padding: 8 }}
      onClick={onClick}
    >
      {component}
    </IconButton>
  );
};

export default FloatingCardButton;
