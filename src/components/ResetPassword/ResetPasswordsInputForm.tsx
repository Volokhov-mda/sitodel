import {
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { ChangeEvent } from "react";

import { theme } from "../../theme";
import { eye_2, eye_1 } from "../../UIconsts";
import { DeviceContext } from "../../App";
import { userApi } from "../../api/userApi";
import { notificationsText } from "../MySite/notificationTexts";
import {
  FilledTextInput,
  FilledTextInputMobile,
} from "../../styledComponents/FilledTextInput/FilledTextInput";
import Button from "../../styledComponents/Button";

const ResetPasswordFrom = ({ successCallback, query }: any) => {
  const { isMobile } = useContext(DeviceContext);

  const [formData, setFormData] = React.useState({
    password: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [isPasswordShow, setIsPasswordShow] = React.useState(false);
  const handleClickShowPassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  const [isPasswordShow2, setIsPasswordShow2] = React.useState(false);
  const handleClickShowPassword2 = () => {
    setIsPasswordShow2(!isPasswordShow2);
  };
  const changeInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const loginHandler = async (event: any) => {
    event.preventDefault();
    if (!formData.password) {
      enqueueSnackbar(notificationsText.defaultAlerts.incorrectPassword, {
        variant: "error",
      });
      return;
    }
    if (formData.password?.length < 8) {
      enqueueSnackbar(notificationsText.account.passwordIsTooShort, {
        variant: "error",
      });
      return;
    }
    if (formData.password !== formData.password2) {
      enqueueSnackbar(notificationsText.account.passwordsNotMatch, {
        variant: "error",
      });
      return;
    }
    try {
      setIsLoading(true);
      console.log(query)
      const resp = await userApi.resetPassword(formData.password, query);
      console.log(resp);
      if (resp === true) {
        successCallback();
        return;
      }
      if (resp === "User not found") {
        enqueueSnackbar(notificationsText.defaultAlerts.userDoesNotExist, {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      marginTop={isMobile ? 4.25 : 3}
      marginBottom={3}
      width="100%"
      textAlign="center"
      minWidth={isMobile ? 20 : 45}
      maxWidth={isMobile ? "100%" : 400}
    >
      <Container>
        <form onSubmit={loginHandler}>
          {isMobile ? (
            <>
              <Box textAlign="left" marginTop={3}>
                <FilledTextInputMobile
                  value={formData?.password}
                  onChange={changeInputHandler}
                  variant="filled"
                  label="Пароль"
                  name="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          tabIndex={-1}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {isPasswordShow ? (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_2
                              )}`}
                              alt="eye"
                            />
                          ) : (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_1
                              )}`}
                              alt="eye"
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  type={isPasswordShow ? "text" : "password"}
                />
              </Box>
              <Box textAlign="left" marginTop={3}>
                <FilledTextInputMobile
                  value={formData?.password2}
                  onChange={changeInputHandler}
                  variant="filled"
                  label="Подтверждение пароля"
                  name="password2"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          tabIndex={-1}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                        >
                          {isPasswordShow2 ? (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_2
                              )}`}
                              alt="eye"
                            />
                          ) : (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_1
                              )}`}
                              alt="eye"
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  type={isPasswordShow2 ? "text" : "password"}
                />
              </Box>
            </>
          ) : (
            <>
              <Box textAlign="left" marginTop={3}>
                <FilledTextInput
                  value={formData?.password}
                  onChange={changeInputHandler}
                  variant="filled"
                  label="Пароль"
                  name="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          tabIndex={-1}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {isPasswordShow ? (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_2
                              )}`}
                              alt="eye"
                            />
                          ) : (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_1
                              )}`}
                              alt="eye"
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  type={isPasswordShow ? "text" : "password"}
                />
              </Box>
              <Box textAlign="left" marginTop={3}>
                <FilledTextInput
                  value={formData?.password2}
                  onChange={changeInputHandler}
                  variant="filled"
                  label="Подтверждение пароля"
                  name="password2"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          tabIndex={-1}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                        >
                          {isPasswordShow2 ? (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_2
                              )}`}
                              alt="eye"
                            />
                          ) : (
                            <img
                              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                                eye_1
                              )}`}
                              alt="eye"
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  type={isPasswordShow2 ? "text" : "password"}
                />
              </Box>
            </>
          )}

          <Box marginTop={3}>
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor: isLoading
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
              }}
              variant="contained"
              disableElevation
              type="submit"
              // onClick={loginHandler}
              disabled={isLoading}
            >
              <Typography
                style={{ color: "#FFF", fontSize: isMobile ? 16 : 24 }}
              >
                {!isLoading ? "Восстановить" : <CircularProgress size={20} />}
              </Typography>
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default ResetPasswordFrom;
