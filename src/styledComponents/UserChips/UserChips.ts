import { Chip, withStyles } from "@material-ui/core";
import { theme } from "../../theme";

export const UserChips = (backColor = theme.palette.primary.main) =>
  withStyles({
    root: {
      borderRadius: 12,
      backgroundColor: backColor,
      color: theme.palette.primary.contrastText,
      height: 69,
      "& .MuiChip-label": {
        paddingLeft: 24,
        paddingRight: 24,
        fontWeight: "bold",
        fontSize: 30,
        [theme.breakpoints.down("md")]: {
          fontSize: 20,
        },
      },
    },
  })(Chip);

export const UserChipsMobile = (backColor = theme.palette.primary.main) =>
  withStyles({
    root: {
      borderRadius: 12,
      backgroundColor: backColor,
      color: theme.palette.primary.contrastText,
      minHeight: 29,
      height: "unset",
      "& .MuiChip-label": {
        padding: "8px 16px",
        fontWeight: "bold",
        fontSize: 11,
        lineHeight: "13px",
        whiteSpace: "normal",
        textOverflow: "unset",
      },
    },
  })(Chip);