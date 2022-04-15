import {
  Box,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import Button from "../../../styledComponents/Button";
import React, { useContext } from "react";
import {
  FilledTextInput,
  FilledTextInputMobile,
} from "../../../styledComponents/FilledTextInput/FilledTextInput";
import { theme } from "../../../theme";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "../style.css";
import { ChangeEvent } from "react";
import { UserRegistrationData } from "../../../store/ducks/user/store/state";
import {
  regUser,
  setRegErrorMessage,
} from "../../../store/ducks/user/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsRegUserLoading,
  selectIsRegUserLoaded,
  selectRegErrorMessage,
  selectIsRegUserError,
  selectIsUserLoaded,
} from "../../../store/ducks/user/selectors";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import { eye_1, eye_2, regIllustration } from "../../../UIconsts";
import { notificationsText } from "../../MySite/notificationTexts";
import { DeviceContext } from "../../../App";

const RegForm = () => {
  const { isMobile } = useContext(DeviceContext);
  const [isAgreed, setIsAgreed] = React.useState(false);
  const [isPasswordShow, setIsPasswordShow] = React.useState(false);
  const [isDublicatePasswordShow, setIsDublicatePasswordShow] =
    React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const regErrorMessage = useSelector(selectRegErrorMessage);
  const isError = useSelector(selectIsRegUserError);
  const isLoading = useSelector(selectIsRegUserLoading);
  const isSuccess = useSelector(selectIsRegUserLoaded);
  const isUserAlreadyLoaded = useSelector(selectIsUserLoaded);
  const [formData, setFormData] = React.useState<UserRegistrationData>({
    email: "",
    password: "",
    password2: "",
  });
  const handleClickShowPassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  const handleClickShowDublicatePassword = () => {
    setIsDublicatePasswordShow(!isDublicatePasswordShow);
  };
  const changeInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      ...{ [event.target.name]: event.target.value },
    });
  };
  const registrationHandler = (event: any) => {
    event.preventDefault();

    if (Object.values(formData).some((x) => !x)) {
      enqueueSnackbar(notificationsText.defaultAlerts.notAllFields, {
        variant: "error",
      });
      return;
    }
    if (formData.password2 !== formData.password) {
      enqueueSnackbar(notificationsText.account.passwordsNotMatch, {
        variant: "error",
      });
      return;
    }
    if (!formData.email.includes("@")) {
      enqueueSnackbar(notificationsText.defaultAlerts.incorrectEmail, {
        variant: "error",
      });
      return;
    }
    if (!isAgreed) {
      enqueueSnackbar(notificationsText.account.policyNotConfirmd, {
        variant: "error",
      });
      return;
    }
    dispatch(regUser(formData));
  };

  React.useEffect(() => {
    isUserAlreadyLoaded && history.push("/");
  }, [isUserAlreadyLoaded]);

  React.useEffect(() => {
    console.error(regErrorMessage, isError);
    if (regErrorMessage && isError) {
      enqueueSnackbar(regErrorMessage, {
        variant: "error",
      });
      dispatch(setRegErrorMessage(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueueSnackbar, regErrorMessage]);

  return (
    <Box
      marginTop={isMobile ? 4.25 : 3}
      marginBottom={3}
      textAlign="center"
      minWidth={isMobile ? 20 : 45}
    >
      <Container>
        {isSuccess ? (
          <form onSubmit={registrationHandler}>
            {isMobile ? (
              <>
                <Box textAlign="left" marginTop={3}>
                  <FilledTextInputMobile
                    variant="filled"
                    label="Почта"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={changeInputHandler}
                    value={formData.email}
                    name="email"
                  />
                </Box>
                <Box textAlign="left" marginTop={3}>
                  <FilledTextInputMobile
                    variant="filled"
                    label="Пароль"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.password}
                    name="password"
                    onChange={changeInputHandler}
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
                    variant="filled"
                    label="Подтверждение пароля"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.password2}
                    name="password2"
                    onChange={changeInputHandler}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex={-1}
                            disableRipple
                            aria-label="toggle password visibility"
                            onClick={handleClickShowDublicatePassword}
                          >
                            {isDublicatePasswordShow ? (
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
                    type={isDublicatePasswordShow ? "text" : "password"}
                  />
                </Box>
              </>
            ) : (
              <>
                <Box textAlign="left" marginTop={3}>
                  <FilledTextInput
                    variant="filled"
                    label="Почта"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={changeInputHandler}
                    value={formData.email}
                    name="email"
                  />
                </Box>
                <Box textAlign="left" marginTop={3}>
                  <FilledTextInput
                    variant="filled"
                    label="Пароль"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.password}
                    name="password"
                    onChange={changeInputHandler}
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
                    variant="filled"
                    label="Подтверждение пароля"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.password2}
                    name="password2"
                    onChange={changeInputHandler}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex={-1}
                            disableRipple
                            aria-label="toggle password visibility"
                            onClick={handleClickShowDublicatePassword}
                          >
                            {isDublicatePasswordShow ? (
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
                    type={isDublicatePasswordShow ? "text" : "password"}
                  />
                </Box>
              </>
            )}
            <Box marginTop={3} textAlign="left" maxWidth={361}>
              <Box display="flex" style={{alignItems: "center"}}>
                <Checkbox
                  disableRipple
                  color="primary"
                  value={isAgreed}
                  checked={isAgreed}
                  onChange={() => {
                    setIsAgreed(!isAgreed);
                  }}
                  icon={
                    <CheckBoxOutlineBlankIcon
                      fontSize="large"
                      style={{
                        backgroundColor: theme.palette.primary.light,
                        borderRadius: 5,
                      }}
                    />
                  }
                  checkedIcon={
                    <CheckBoxIcon
                      fontSize="large"
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 5,
                      }}
                    />
                  }
                />
                <div>
                  <Typography
                    variant="body2"
                    style={{ fontSize: isMobile ? 14 : 16, marginLeft: 10 }}
                  >
                    Согласен с
                    <span
                      onClick={() => {
                        window.open("policy", "_blank");
                      }}
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: theme.palette.primary.main,
                      }}
                    >
                      {" политикой обработки персональных данных"}
                    </span>
                  </Typography>
                </div>
              </Box>
            </Box>
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
                type="submit"
                variant="contained"
                disableElevation
                // onClick={registrationHandler}
                disabled={isLoading}
              >
                <Typography
                  style={{ color: "#FFF", fontSize: isMobile ? 16 : 24 }}
                >
                  {!isLoading ? (
                    "Зарегистрироваться"
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </Typography>
              </Button>
            </Box>
          </form>
        ) : (
          <Box>
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                regIllustration
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
              Мы отправили тебе на email ссылку <br /> для подтверждения
              аккаунта
            </Typography>
            <Box marginTop={3}>
              <Typography
                variant="body2"
                style={{
                  color: "#000",
                  fontSize: isMobile ? 14 : 24,
                }}
              >
                Перейди по ней, чтобы начать <br /> пользоваться{" "}
                <span
                  onClick={() => {
                    history.push("/");
                  }}
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Самоделкиным
                </span>
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RegForm;
