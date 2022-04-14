import { useState, ReactChildren, ReactChild, ReactFragment, ReactElement } from "react";
import { Button, Tooltip } from "@material-ui/core";

import styles from "./tooltip-clickable.module.css";

interface AuxProps {
    title: ReactChild | ReactFragment | string,
    children: ReactChild | ReactChildren,
}


const TooltipClickable = ({ title, children }: AuxProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <Button
            className={styles.button}
            onClick={() => setShowTooltip(!showTooltip)}
        >
            <Tooltip
                title={title}
                open={showTooltip}
                onOpen={() => setShowTooltip(true)}
                onClose={() => setShowTooltip(false)}
                TransitionProps={{ timeout: 1000 }}
            >
                {children as ReactElement<any, any>}
            </Tooltip>
        </Button>
    )
}

export default TooltipClickable;