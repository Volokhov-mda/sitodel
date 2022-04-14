import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { DeviceContext } from "../../../App";
import { theme } from "../../../theme";

const LoginHeader = () => {
  const { isMobile } = useContext(DeviceContext);
  const history = useHistory();
  const routeToRegistration = () => {
    history.push("/registration");
  };
  return (
    <Box textAlign="center">
      <img src="assets/darkLogo.svg" alt="Самоделкин" width={isMobile ? 91 : "unset"} />
      <Typography
        style={{ fontSize: isMobile ? 24 : 40, color: theme.palette.secondary.dark }}
        component="h2"
      >
        ВОЙТИ В АККАУНТ
      </Typography>
      <Typography variant="subtitle2" style={{ fontSize: isMobile ? 16 : 24 }}>
        Нет аккаунта?
        <span
          style={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            cursor: "pointer",
          }}
          onClick={routeToRegistration}
        >
          {" Создай"}
        </span>
      </Typography>
    </Box>
  );
};

export default LoginHeader;
