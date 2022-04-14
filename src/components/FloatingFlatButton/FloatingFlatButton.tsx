import { Button, Typography } from "@material-ui/core";

import { theme } from "../../theme";

import FlatButton from "../FlatButton/FlatButton";

import styles from "./floating-flat-button.module.css";

type Props = {
    [x: string]: any;
}

const FloatingButton: React.FC<Props> = ({ children, ...props }) => {
    return (
        <FlatButton className={styles.button} {...props}>
            {children}
        </FlatButton>
    )
}

export default FloatingButton;