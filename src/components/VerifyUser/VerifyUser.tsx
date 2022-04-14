import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { apiUrl } from "../../Consts/Urls";
import { notificationsText } from "../MySite/notificationTexts";

const VerifyUser = () => {
  const location = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  React.useEffect(() => {
    const q: any = {};
    Array.from(query.entries()).forEach((x) => {
      q[x[0]] = x[1];
    });
    setTimeout(() => {
      axios
        .post(`${apiUrl}/auth/verify-registration/`, q)
        .then(() => {
          history.push("/login");
          enqueueSnackbar(notificationsText.account.emailConfirmed, {
            variant: "success",
          });
        })
        .catch(() => {
          enqueueSnackbar(notificationsText.account.emailConfirmFailed, {
            variant: "error",
          });
          history.push("/");
        });
    }, 100);
  }, [enqueueSnackbar, history, query]);
  return <LinearProgress />;
};

export default VerifyUser;
