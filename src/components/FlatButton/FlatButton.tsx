import { useContext } from "react";
import { Typography } from "@material-ui/core";
import clsx from "clsx";

import { theme } from "../../theme";
import { DeviceContext } from "../../App";

import styles from "./flat-button.module.css";
import Button from "../../styledComponents/Button";

type Props = {
    [x: string]: any;
}

const FlatButton: React.FC<Props> = ({ style, children, className, ...props }) => {
    const { isMobile } = useContext(DeviceContext);
    
    return (
        <Button
            style={{
                background: theme.palette.primary.dark,
                ...style,
            }}
            className={clsx(styles.button, className)}
            {...props}
        >
            <Typography className={clsx(isMobile ? styles.textMobile : styles.text)}>
                {children}
            </Typography>
        </Button>
    );
}

export default FlatButton;