import {
  Box,
  createMuiTheme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
  Theme,
  Typography,
} from "@material-ui/core";
import Button from "../../../styledComponents/Button";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { DeviceContext } from "../../../App";

const useTopBarClasses = makeStyles((theme: Theme) =>
  createStyles({
    activeTab: {
      fontSize: 24,
      position: "relative",
      color: "#000",
      "&::before": {
        transition: "background-color 0.5s",
        content: '""',
        display: "block",
        height: 4,
        width: "80%",
        left: 0,
        bottom: -10,
        backgroundColor: theme.palette.primary.dark,
        position: "absolute",
        borderRadius: 4,
      },
    },
    tab: {
      fontSize: 24,
      padding: "unset",
      "&::before": {
        transition: "background-color 0.5s",
        content: '""',
        backgroundColor: "#FFF",
      },
    },
    activeTabMobile: {
      paddingTop: 17,
      paddingBottom: 40,
      fontSize: 14,
      position: "relative",
      color: "#000",
      "&::before": {
        transition: "background-color 0.5s",
        content: '""',
        display: "block",
        height: 2,
        width: "80%",
        left: 0,
        bottom: 34,
        backgroundColor: theme.palette.primary.dark,
        position: "absolute",
        borderRadius: 4,
      },
    },
    tabMobile: {
      paddingTop: 17,
      paddingBottom: 40,
      fontSize: 14,
      "&::before": {
        transition: "background-color 0.5s",
        content: '""',
        backgroundColor: "#FFF",
      },
    },
  })
);

const useTopBarTabClasses = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "red",
      "&.MuiButton-text": {
        padding: 0,
        // marginLeft: 10,
      },
    },
  })
);

interface IProps<T> {
  handler: (tab: T) => void;
  activeTab: T;
  isLoading?: boolean;
  allTabButtons: {
    text: string;
    val: T;
  }[];
}
const TopBar = function <T>({
  handler,
  activeTab,
  allTabButtons,
  isLoading,
}: IProps<T>) {
  const { isMobile } = useContext(DeviceContext);
  const topBarClasses = useTopBarClasses();
  const topTabClasses = useTopBarTabClasses();

  return (
    <Box 
      display={"flex"} 
      style={{ 
        display: "flex",
        justifyContent: isMobile ? "center" : "unset",
        padding: isMobile ? "0 16px" : "unset",
        marginBottom: isMobile ? 0 : 40, 
        borderTop: isMobile ? "1px solid rgba(98, 104, 112, 0.25)" : "unset",
        width: isMobile ? "100%" : "unset",
        position: isMobile ? "fixed" : "unset", 
        bottom: 0,
        left: 0,
        background: isMobile ? "#fff" : "unset",
        zIndex: 2,
      }} 
    >
      {allTabButtons.map((el, index) => (
        <Box marginRight={index + 1 < allTabButtons.length ? 4 : 0} key={index}>
          {isLoading ? (
            <Skeleton width="200px" height="50px" />
          ) : (
              <Button
                style={{ textTransform: "none", padding: "none" }}
                key={index}
                onClick={() => {
                  handler(el.val);
                }}
                className={isMobile ? topTabClasses.button : ""}
              >
                <Typography
                  className={
                    el.val === activeTab
                      ? (isMobile ? topBarClasses.activeTabMobile : topBarClasses.activeTab)
                      : (isMobile ? topBarClasses.tabMobile : topBarClasses.tab)
                  }
                >
                  {el.text}
                </Typography>
              </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TopBar;
