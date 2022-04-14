import React, { useState } from "react";
import { Button as MuiBtn, ButtonProps } from "@material-ui/core";

const Button = (props: ButtonProps) => {
  const [isAnim, setIsAnim] = useState(false);
  React.useEffect(() => {
    isAnim &&
      setTimeout(() => {
        setIsAnim(false);
      }, 200);
  }, [isAnim]);
  return (
    <MuiBtn
      {...props}
      className={`${props.className} ${isAnim ? "anim" : ""}`}
      onClick={(e: any) => {
        setIsAnim(true);
        setTimeout(() => {
          props?.onClick && props.onClick(e);
        }, 100);
      }}
    />
  );
};

export default Button;
