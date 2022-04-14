import InputMask from "react-input-mask";
import { Box, Paper, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ChangeEvent, useContext, useState } from "react";

import { mySiteApi } from "../../../api/mySiteApi";

import { theme } from "../../../theme";

import { ContactFormInput, ContactFormInputMobile } from "../../../styledComponents/ContactFormInput/ContactFormInput";
import { UserPageContext } from "../../UserPageWrapper/UserPageWrapper";
import Button from "../../../styledComponents/Button";
import { notificationsText } from "../../MySite/notificationTexts";
import { DeviceContext } from "../../../App";

const emptyOrder = {
  name: "",
  contact: "",
  comment: "",
};

const FooterForm = () => {
  const userData = useContext(UserPageContext);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [orderData, setOrderData] = useState(emptyOrder);
  const editInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrderData({ ...orderData, [event.target.name]: event.target.value });
  };
  const { isPad } = useContext(DeviceContext);
  const sendOrder = async () => {
    try {
      setIsLoading(true);

      if (orderData.contact?.includes("_")) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectPhoneNumber, {
          variant: "error",
        });
        return;
      }
      if (!orderData.name) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectPhoneNumber, {
          variant: "error",
        });
        return;
      }
      const isSuccess = await mySiteApi.createNewOrder(
        {
          ...orderData,
          contact:
            ((orderData.contact || "") as string)
              .replaceAll("_", "")
              .replaceAll("-", "")
              .replaceAll(")", "")
              .replaceAll("(", "")
              .replaceAll(" ", "") || undefined,
        },
        userData.name
      );
      if (!isSuccess) {
        enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar(notificationsText.userSite.footerForm.applicationSent, {
        variant: "success",
      });
      setOrderData(emptyOrder);
    } catch {
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Paper elevation={0} style={{ padding: isPad ? "24px" : 34, maxWidth: 500 }}>
      <Box>
        {isPad && (
            <Typography
              variant="body1"
              style={{
                marginBottom: 24,
                fontSize: 16,
                fontWeight: "bold",
                color: theme.palette.secondary.dark,
                textAlign: "center",
              }}
            >
              Обратная связь
            </Typography>
          )
        }
        <form>
          <Box>
            {isPad ? (
              <ContactFormInputMobile
                fullWidth
                multiline
                type="text"
                label="Как Вас зовут?"
                autoComplete="off"
                variant="filled"
                value={orderData.name}
                onChange={editInputHandler}
                name="name"
              />
            ) : (
              <ContactFormInput
                fullWidth
                multiline
                type="text"
                label="Как Вас зовут?"
                autoComplete="off"
                variant="filled"
                value={orderData.name}
                onChange={editInputHandler}
                name="name"
              />
            )}
          </Box>
          <Box paddingTop={3}>
            <InputMask
              mask="+7 (999) 999-99-99"
              value={orderData.contact}
              disabled={false}
              onChange={editInputHandler}
            >
              {() => (
                isPad ? (
                  <ContactFormInputMobile
                    fullWidth
                    type="text"
                    label="Ваш телефон"
                    autoComplete="off"
                    variant="filled"
                    value={orderData.contact}
                    onChange={editInputHandler}
                    name="contact"
                  />
                ) : (
                  <ContactFormInput
                    fullWidth
                    type="text"
                    label="Ваш телефон"
                    autoComplete="off"
                    variant="filled"
                    value={orderData.contact}
                    onChange={editInputHandler}
                    name="contact"
                  />
                )
              )
                // <FilledTextInput
                //   variant="filled"
                //   onChange={changeInputHandler}
                //   value={newUserData.phone}
                //   name="phone"
                //   fullWidth
                //   label="Телефон"
                //   InputLabelProps={{
                //     shrink: true,
                //   }}
                // />
              }
            </InputMask>
          </Box>
          <Box paddingTop={3}>
            {isPad ? (
              <ContactFormInputMobile
                fullWidth
                multiline
                type="text"
                label="Ваш комментарий"
                autoComplete="off"
                variant="filled"
                value={orderData.comment}
                onChange={editInputHandler}
                name="comment"
              />
            ) : (
              <ContactFormInput
                fullWidth
                multiline
                type="text"
                label="Ваш комментарий"
                autoComplete="off"
                variant="filled"
                value={orderData.comment}
                onChange={editInputHandler}
                name="comment"
              />
            )}
          </Box>
          <Box paddingTop={3}>
            <Button
              variant="contained"
              // color="primary"
              disableElevation
              fullWidth
              onClick={() => {
                !isLoading && sendOrder();
              }}
              style={{
                height: isPad ? 52 : 66,
                borderRadius: 12,
                textTransform: "none",
                backgroundColor: isLoading ? "#eaeaea" : userData?.color,
              }}
              disableRipple
            >
              <Typography
                style={{ fontWeight: "bold", color: "#FFF", fontSize: isPad ? 16 : 24 }}
              >
                Отправить
              </Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Paper >
  );
};

export default FooterForm;
