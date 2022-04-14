import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { DeviceContext } from "../../../App";
import { theme } from "../../../theme";

const RegHeader = () => {
  const { isMobile } = useContext(DeviceContext);
  const history = useHistory();
  const routeToLogin = () => {
    history.push("/login");
  };
  return (
    <Box textAlign="center">
      <img src="./assets/darkLogo.svg" alt="dark-logo" width={isMobile ? 91 : "unset"} />
      <Typography
        style={{ fontSize: isMobile ? 24 : 40, color: theme.palette.secondary.dark }}
        component="h2"
      >
        СОЗДАТЬ АККАУНТ
      </Typography>
      <Typography variant="subtitle2" style={{ fontSize: isMobile ? 16 : 24 }}>
        Уже есть аккаунт?
        <span
          style={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            cursor: "pointer",
          }}
          onClick={routeToLogin}
        >
          {" Войдите"}
        </span>
      </Typography>
    </Box>
  );
};

export default RegHeader;
