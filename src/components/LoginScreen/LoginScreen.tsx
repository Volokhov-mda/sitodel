import { Grid, Box, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import { useHistory } from "react-router";

import { DeviceContext } from "../../App";
import { resetPasswordIllustration } from "../../UIconsts";

import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";
import ResetPasswordFrom from "./components/ResetPasswordForm";
import ResetPasswordHeader from "./components/ResetPasswordHeader";
import BackButton from "../BackButton/BackButton";
import FloatingButton from "../FloatingFlatButton/FloatingFlatButton";

const LoginScreen = ({ targetUrl }: any) => {
  const { isMobile } = useContext(DeviceContext);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isResetPasswordEmailSent, setIsResetPasswordEmailSent] =
    useState(false);
  const changeIsResetPassword = () => {
    setIsResetPassword(!isResetPassword);
  };
  const history = useHistory();

  return (
    <>
      {!isMobile && <BackButton isToHomePage />}
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
          {!isResetPassword ? (
            <>
              <LoginHeader />
              <LoginForm {...{ targetUrl }} />
              <div
                onClick={changeIsResetPassword}
                style={{
                  width: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Typography
                  style={{ fontSize: isMobile ? 16 : 24, color: "#5862EE", fontWeight: isMobile ? 500 : 400 }}
                >
                  Не помню пароль
                </Typography>
              </div>
            </>
          ) : (
            <>
              <ResetPasswordHeader />
              {isResetPasswordEmailSent ? (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    paddingBottom: isMobile ? 200 : "unset",
                  }}
                >
                  <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      resetPasswordIllustration
                    )}`}
                    style={{
                      width: isMobile ? "100%" : "unset",
                    }}
                    alt="facebook"
                  />
                  <Typography
                    style={{
                      color: "#000",
                      lineHeight: "100%",
                      fontSize: isMobile ? 16 : 30,
                      marginTop: 30,
                    }}
                  >
                    Мы отправили тебе на email ссылку <br /> для восстановления
                    пароля
                  </Typography>
                  <Box marginTop={isMobile ? "4px" : "14px"}>
                    <Typography
                      variant="body2"
                      style={{
                        color: "#000",
                        fontSize: isMobile ? 14 : 24,
                      }}
                    >
                      Перейди по ней, <br /> чтобы задать новый пароль
                    </Typography>
                  </Box>
                  {isMobile && (
                    <FloatingButton
                      style={{
                        bottom: 24,
                      }}
                      onClick={() => history.push("/")}
                    >
                      На главную
                    </FloatingButton>
                  )}
                </Box>
              ) : (
                <>
                  <ResetPasswordFrom
                    {...{
                      successCallback: () => {
                        setIsResetPasswordEmailSent(true);
                      },
                    }}
                  />
                  <div
                    onClick={changeIsResetPassword}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: isMobile ? 16 : 24,
                        color: "#5862EE",
                        fontWeight: isMobile ? 500 : 400,
                      }}
                    >
                      Вспомнил пароль
                    </Typography>
                  </div>
                </>
              )}
            </>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default LoginScreen;
