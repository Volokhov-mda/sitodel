import {
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import Button from "../../../styledComponents/Button";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  fetchUserData,
  setErrorMessage,
} from "../../../store/ducks/user/actionCreators";
import {
  selectErrorMessage,
  selectIsUserError,
  selectIsUserLoaded,
  selectIsUserLoading,
  selectUserData,
} from "../../../store/ducks/user/selectors";
import { UserLogginData } from "../../../store/ducks/user/store/state";
import {
  FilledTextInput,
  FilledTextInputMobile,
} from "../../../styledComponents/FilledTextInput/FilledTextInput";
import { theme } from "../../../theme";
import { eye_2, eye_1 } from "../../../UIconsts";
import { notificationsText } from "../../MySite/notificationTexts";
import { DeviceContext } from "../../../App";

const LoginForm = ({ targetUrl }: any) => {
  const { isMobile } = useContext(DeviceContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState<UserLogginData>({
    email: "",
    password: "",
  });
  const userData = useSelector(selectUserData);
  const isLoading = useSelector(selectIsUserLoading);
  const isError = useSelector(selectIsUserError);
  const isSuccess = useSelector(selectIsUserLoaded);
  let isSuccessSnackShown = false;
  const errorMessage = useSelector(selectErrorMessage);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [isPasswordShow, setIsPasswordShow] = React.useState(false);
  const handleClickShowPassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  const changeInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      ...{ [event.target.name]: event.target.value },
    });
  };
  let delayTimeout: NodeJS.Timeout | undefined;
  const actionWithDelay = (act: any) => {
    delayTimeout && clearTimeout(delayTimeout);
    delayTimeout = setTimeout(act, 1000);
  };
  React.useEffect(() => {
    if (errorMessage && isError) {
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
      dispatch(setErrorMessage(""));
    } else {
      if (!isSuccessSnackShown && isSuccess && userData) {
        actionWithDelay(() =>
          enqueueSnackbar(notificationsText.account.successLogin, {
            variant: "success",
          })
        );
        setTimeout(() => {
          history.push(targetUrl || "/me");
        }, 100);
        isSuccessSnackShown = true;
      }
    }
  }, [errorMessage, isError, isSuccess]);

  const loginHandler = (event: any) => {
    event.preventDefault();
    dispatch(fetchUserData(formData));
  };

  const FilledTextInputDevice = isMobile
    ? FilledTextInputMobile
    : FilledTextInput;

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
          <Box textAlign="left" marginTop={3}>
            <FilledTextInputDevice
              value={formData?.email}
              variant="filled"
              fullWidth
              label="Почта"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={changeInputHandler}
            />
          </Box>
          <Box textAlign="left" marginTop={3}>
            <FilledTextInputDevice
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
                {!isLoading ? "Войти" : <CircularProgress size={20} />}
              </Typography>
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default LoginForm;
