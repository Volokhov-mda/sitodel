import { Box,  Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { isFunction } from "lodash";
import Button from "../../../styledComponents/Button";
import { DeviceContext } from "../../../App";

interface IProps {
  text: string;
  onClick?: () => void;
  fontSize?: number;
  marginY?: number;
}

const TopNavbarMenuItem = ({ text, onClick, fontSize=18, marginY=3 }: IProps) => {
  const { isMobile } = useContext(DeviceContext);

  const clickHandler = () => {
    isFunction(onClick) && onClick();
  };
  return (
    <Box marginY={marginY}>
      <Button
        onClick={clickHandler}
        variant="text"
        style={{
          textTransform: "none",
          marginRight: isMobile ? 8 : 18,
        }}
      >
        <Typography
          variant="body2"
          style={{ fontSize: fontSize, fontWeight: 600, color: "#FFF" }}
        >
          {text}
        </Typography>
      </Button>
    </Box>
  );
};

export default TopNavbarMenuItem;
