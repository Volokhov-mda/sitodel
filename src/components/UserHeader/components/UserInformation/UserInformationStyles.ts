import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { theme as themeGen } from "./../../../../theme";

export const useUserInformationStyles = makeStyles((theme: Theme) =>
  createStyles({
    professionHeadline: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: "135%",
    },
    professionHeadlineMobile: {
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: "20px",
    },
    mainHeadline: {
      fontSize: 64,
      fontWeight: "bold",
      lineHeight: "135%",
      [theme.breakpoints.down("sm")]: {
        fontSize: 40,
      },
    },
    mainHeadlineMobile: {
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: "22px",
      color: themeGen.palette.secondary.dark,
    },
    placeHeadline: {
      fontSize: 30,
      fontWeight: 500,
      marginTop: 8,
      lineHeight: "135%",
    },
  })
);
