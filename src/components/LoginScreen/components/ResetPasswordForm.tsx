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
import React, { useContext, useState } from "react";
import { ChangeEvent } from "react";
import {
  FilledTextInput,
  FilledTextInputMobile,
} from "../../../styledComponents/FilledTextInput/FilledTextInput";
import { theme } from "../../../theme";
import { eye_2, eye_1 } from "../../../UIconsts";
import { DeviceContext } from "../../../App";
import { userApi } from "../../../api/userApi";
import { notificationsText } from "../../MySite/notificationTexts";

const ResetPasswordFrom = ({ successCallback }: any) => {
  const { isMobile } = useContext(DeviceContext);

  const [formData, setFormData] = React.useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

  const loginHandler = async (event: any) => {
    event.preventDefault();
    if (!formData.email) {
      enqueueSnackbar(notificationsText.defaultAlerts.incorrectEmail, {
        variant: "error",
      });
      return;
    }
    try {
      setIsLoading(true);
      const resp = await userApi.sendResetPasswordEmail(formData.email);
      console.log(resp)
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
      console.log(error)
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const FilledTextInputDevice = isMobile ? FilledTextInputMobile : FilledTextInput;

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
