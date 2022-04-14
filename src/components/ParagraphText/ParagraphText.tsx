import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { DeviceContext } from "../../App";
import { IParagraphText } from "./Models";

const ParagraphText = ({ text, fontSize }: IParagraphText) => {
  const { isPad } = useContext(DeviceContext);
  return (
    <Typography
      color="secondary"
      style={{
        marginTop: isPad ? 8 : 0,
        fontSize: fontSize || isPad ? 14 : 24,
        fontWeight: 500,
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        whiteSpace: "pre-line"
      }}
    >
      {text}
    </Typography>
  );
};

export default ParagraphText;
