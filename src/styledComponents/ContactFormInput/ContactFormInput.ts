import { TextField, withStyles } from "@material-ui/core";
import { theme } from "../../theme";

export const ContactFormInput = withStyles({
  root: {
    "& .MuiFilledInput-underline::before": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-underline::after": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 12,
      backgroundColor: "#FFF",
      minHeight: 66,
    },
    "& .MuiFilledInput-input": {
      fontWeight: 500,
      fontSize: 20,
      marginLeft: 10
    },
    "& .MuiInputLabel-filled": {
      fontWeight: 500,
      fontSize: 24,
      marginLeft: 10
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
  // "& "
})(TextField);

export const ContactFormInputMobile = withStyles({
  root: {
    "& .MuiFilledInput-underline::before": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-underline::after": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 12,
      backgroundColor: "#FFF",
      minHeight: 52,
    },
    "& .MuiFilledInput-input": {
      fontWeight: 500,
      fontSize: 16,
    },
    "& .MuiInputLabel-filled": {
      fontWeight: 500,
      fontSize: 16,
      color: theme.palette.secondary.dark,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
  // "& "
})(TextField);
