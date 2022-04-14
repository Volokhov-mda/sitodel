import { createMuiTheme } from "@material-ui/core";
import { Shadows } from '@material-ui/core/styles/shadows';

export const theme = createMuiTheme({
  shadows: Array(25).fill('none') as Shadows,

  props: {
    MuiButton: {
      disableRipple: true,
    },
  },
  typography: {
    fontFamily: '"Montserrat"',
  },
  spacing: (factor) => `${8 * factor}px`,
  palette: {
    primary: {
      main: "#c65edb",
      contrastText: "#FFF",
      light: "#EAEEF3",
      dark: "#b12dba",
    },
    secondary: {
      light: "#7e6284",
      main: "#626870",
      dark: "#191E34",
    },
    background: {
      paper: "#EAEEF3",
    },
  },
  overrides: {
    MuiList: {
      root: {
        // backgroundColor: "#212C4D",
        borderRadius: 20,
      },
    },
    MuiTypography: {
      colorTextPrimary: {
        color: "#888DE0",
      },
      body1: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#626870",
      },
    },
    MuiPaper: {
      elevation0: {
        borderRadius: 24,
      },
    },
  },
});
