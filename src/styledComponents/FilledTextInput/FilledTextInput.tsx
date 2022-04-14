import {
  BaseTextFieldProps,
  createStyles,
  FilledTextFieldProps,
  InputBase,
  Select,
  StandardTextFieldProps,
  TextField,
  TextFieldProps,
  withStyles,
} from "@material-ui/core";
import { theme } from "../../theme";

export const FilledTextInput = withStyles({
  root: {
    "& .MuiFilledInput-underline::before": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-underline::after": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 12,
      backgroundColor: theme.palette.primary.light,
      minHeight: 57,
    },
    "& .MuiFilledInput-input": {
      fontWeight: 500,
      fontSize: 20,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 14,
      paddingBottom: 14,
      color: theme.palette.secondary.main,
    },
    "& .MuiInputLabel-filled": {
      fontSize: 24,
      marginLeft: 0,
      position: "relative",
      fontWeight: "bold",
      marginBottom: 13,
      color: theme.palette.secondary.dark,
    },
    "& .MuiFilledInput-multiline": {
      padding: 0,
      lineHeight: "165%",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "none",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },
  },
  // "& "
})(TextField);

export const FilledTextInputMobile = withStyles({
  root: {
    "& .MuiFilledInput-underline::before": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-underline::after": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 12,
      backgroundColor: theme.palette.primary.light,
      minHeight: 52,
    },
    "& .MuiFilledInput-input": {
      fontWeight: 500,
      fontSize: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      color: theme.palette.secondary.main,
    },
    "& .MuiInputLabel-filled": {
      fontSize: 16,
      marginLeft: 0,
      position: "relative",
      fontWeight: "bold",
      marginBottom: 6,
      color: theme.palette.secondary.dark,
    },
    "& .MuiFilledInput-multiline": {
      padding: 0,
      lineHeight: "165%",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "none",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },
  },
  // "& "
})(TextField);

export const OutlinedInput = withStyles({
  root: {
    "& .MuiFilledInput-underline::before": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-underline::after": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 12,
      backgroundColor: "#FAFAFA",
      minHeight: 57,
      border: "2px solid #EAEEF3",
    },
    "& .MuiFilledInput-input": {
      fontWeight: 500,
      // fontSize: 20,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      textAlign: "center",
      color: theme.palette.secondary.main,
    },
    "& .MuiInputLabel-filled": {
      fontSize: 24,
      marginLeft: 0,
      position: "relative",
      fontWeight: "bold",
      marginBottom: 13,
      color: theme.palette.secondary.dark,
    },
    "& .MuiFilledInput-multiline": {
      padding: 0,
      lineHeight: "165%",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "none",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },
  },
  // "& "
})(TextField);

export const OutlinedInputMobile = withStyles({
  root: {
    "& .MuiFilledInput-underline::before": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-underline::after": {
      visibility: "hidden",
    },
    "& .MuiFilledInput-root": {
      borderRadius: 12,
      backgroundColor: "#FAFAFA",
      minHeight: 54,
      border: "2px solid #EAEEF3",
    },
    "& .MuiFilledInput-input": {
      fontWeight: 500,
      fontSize: 11,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      textAlign: "center",
      color: theme.palette.secondary.main,
    },
    "& .MuiInputLabel-filled": {
      fontSize: 24,
      marginLeft: 0,
      position: "relative",
      fontWeight: "bold",
      marginBottom: 13,
      color: theme.palette.secondary.dark,
    },
    "& .MuiFilledInput-multiline": {
      padding: 0,
      lineHeight: "165%",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "none",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.secondary.dark,
    },
  },
  // "& "
})(TextField);

export const FilledTextInputBase = withStyles(() =>
  createStyles({
    root: {
      "label + &": {
        // fontWeight: 500,
        fontWeight: 500,
        fontSize: 20,
        // paddingRight: 24,
        // paddingTop: 14,
        // paddingBottom: 14,
        color: theme.palette.secondary.main,
        // marginTop: theme.spacing(3),
        // transform: "none",
        // fontSize: 24,
        // marginLeft: 0,
        // position: "relative",
        // fontWeight: "bold",
        // marginBottom: 13,
        // color: theme.palette.secondary.dark,
      },
    },
    input: {
      paddingTop: 17,
      paddingBottom: 17,
      width: "100%",
      borderRadius: 12,
      position: "relative",
      backgroundColor: theme.palette.primary.light,
      fontSize: 20,
      padding: "12px 24px 12px 24px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),

      "&:focus": {
        borderRadius: 12,
        position: "relative",
        backgroundColor: theme.palette.primary.light,
      },
    },
  })
)(InputBase);

export const FilledTextInputBaseMobile = withStyles(() =>
  createStyles({
    root: {
      "label + &": {
        // fontWeight: 500,
        fontWeight: 500,
        fontSize: 16,
        // paddingRight: 24,
        // paddingTop: 14,
        // paddingBottom: 14,
        color: theme.palette.secondary.main,
        // marginTop: theme.spacing(3),
        // transform: "none",
        // fontSize: 24,
        // marginLeft: 0,
        // position: "relative",
        // fontWeight: "bold",
        // marginBottom: 13,
        // color: theme.palette.secondary.dark,
      },
    },
    input: {
      width: "100%",
      borderRadius: 12,
      position: "relative",
      backgroundColor: theme.palette.primary.light,
      fontSize: 16,
      padding: "16px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),

      "&:focus": {
        borderRadius: 12,
        position: "relative",
        backgroundColor: theme.palette.primary.light,
      },
    },
  })
)(InputBase);

export const OutlinedTextInputBase = withStyles(() =>
  createStyles({
    root: {
      "label + &": {
        // fontWeight: 500,
        fontWeight: 500,
        fontSize: 200,
        // paddingRight: 24,
        // paddingTop: 14,
        // paddingBottom: 14,
        color: theme.palette.secondary.main,
        // marginTop: theme.spacing(3),
        // transform: "none",
        // fontSize: 24,
        // marginLeft: 0,
        // position: "relative",
        // fontWeight: "bold",
        // marginBottom: 13,
        // color: theme.palette.secondary.dark,
        // backgroundColor: theme.palette.primary.light,
      },
    },
    input: {
      border: "2px solid #EAEEF3",
      // paddingTop: 17,
      // paddingBottom: 17,
      // width: "100%",
      borderRadius: 12,
      textAlign: "center",
      color: theme.palette.secondary.main,
      // position: "relative",
      // backgroundColor: theme.palette.primary.light,
      fontSize: 16,
      fontWeight: 500,
      padding: "15px 34px 15px 24px",
      // transition: theme.transitions.create(["border-color", "box-shadow"]),

      "&:focus": {
        borderRadius: 12,
        position: "relative",
        backgroundColor: "inherit",
      },
    },
  })
)(InputBase);

export const OutlinedTextInputBaseMobile = withStyles(() =>
  createStyles({
    root: {
      "label + &": {
        // fontWeight: 500,
        fontWeight: 500,
        fontSize: 200,
        // paddingRight: 24,
        // paddingTop: 14,
        // paddingBottom: 14,
        color: theme.palette.secondary.main,
        // marginTop: theme.spacing(3),
        // transform: "none",
        // fontSize: 24,
        // marginLeft: 0,
        // position: "relative",
        // fontWeight: "bold",
        // marginBottom: 13,
        // color: theme.palette.secondary.dark,
        // backgroundColor: theme.palette.primary.light,
      },
    },
    input: {
      verticalAlign: "middle",
      border: "2px solid #EAEEF3",
      // paddingTop: 17,
      // paddingBottom: 17,
      // width: "100%",
      borderRadius: 12,
      textAlign: "center",
      color: theme.palette.secondary.main,
      // position: "relative",
      // backgroundColor: theme.palette.primary.light,
      fontSize: 11,
      fontWeight: 500,
      padding: "19px 34px 18px 24px",
      // transition: theme.transitions.create(["border-color", "box-shadow"]),

      "&:focus": {
        borderRadius: 12,
        position: "relative",
        backgroundColor: "inherit",
      },
    },
  })
)(InputBase);
