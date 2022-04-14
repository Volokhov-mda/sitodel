import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { DeviceContext } from "../../App";
import { apiUrl } from "../../Consts/Urls";
import BackButton from "../BackButton/BackButton";
import LoginForm from "../LoginScreen/components/LoginForm";
import LoginHeader from "../LoginScreen/components/LoginHeader";
import ResetPasswordFrom from "../LoginScreen/components/ResetPasswordForm";
import ResetPasswordHeader from "../LoginScreen/components/ResetPasswordHeader";
import { notificationsText } from "../MySite/notificationTexts";
import ResetPasswordsInputForm from "./ResetPasswordsInputForm";

const ResetPassword = () => {
  const { isMobile } = useContext(DeviceContext);
  const location = useLocation();
  const q = React.useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [query, setQuery] = useState({});
  React.useEffect(() => {
    const g: any = {};
    Array.from(q.entries()).forEach((x) => {
      g[x[0]] = x[1];
    });
    setQuery({ ...g });
  }, [enqueueSnackbar, history, q]);

  const successCallback = async () => {
    enqueueSnackbar(notificationsText.account.passwordChangesSuccessfully, {
      variant: "success",
    });
    history.push("/login");
  };
  return (
    <>
      {!isMobile ? <BackButton isToHomePage /> : null}
      <Grid container justify="center">
        <Box
          marginTop={isMobile ? 5 : 12}
          width={isMobile ? "100%" : "unset"}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ResetPasswordHeader isChangePassword />
          <ResetPasswordsInputForm
            successCallback={successCallback}
            query={query}
          />
        </Box>
      </Grid>
    </>
  );
};

export default ResetPassword;
