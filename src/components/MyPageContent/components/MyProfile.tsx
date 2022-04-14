import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@material-ui/core";
import Button from "../../../styledComponents/Button";
import React, { ChangeEvent, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../../store/ducks/user/selectors";
import { User } from "../../../store/ducks/user/store/state";
import {
  FilledTextInput,
  FilledTextInputBase,
  FilledTextInputBaseMobile,
  FilledTextInputMobile,
} from "../../../styledComponents/FilledTextInput/FilledTextInput";
import { theme } from "../../../theme";
import { ReactComponent as VKIcon } from "../icons/vk.svg";
import { ReactComponent as WebsiteIcon } from "../icons/website.svg";
import { useSnackbar } from "notistack";
import { userApi } from "../../../api/userApi";
import ImagesLoader from "../../ImagesLoader/ImagesLoader";
import { getFileFromUrl, IImageSet, imagesApi } from "../../../api/imagesApi";
// import { ReactComponent as InstaIcon } from "../icons/insta.svg";
import InputMask from "react-input-mask";
import { setUserData } from "../../../store/ducks/user/actionCreators";
import { notificationsText } from "../../MySite/notificationTexts";
import { DeviceContext } from "../../../App";
import ChervonIcon from "../../ChervonIcon/ChevronIcon";
import { ReactComponent as HelpCircle } from "./../icons/help-circle.svg";
import FloatingButton from "../../FloatingFlatButton/FloatingFlatButton";
import FlatButton from "../../FlatButton/FlatButton";
import TooltipClickable from "../../TooltipClickable/TooltipClickable";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { isMobile } = useContext(DeviceContext);

  const userData = useSelector(selectUserData);

  const [isAnyFieldChanged, setIsAnyFieldChanged] = React.useState(false);
  const [isImageFileLoading, setIsImageFileLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [newUserData, setNewUserData] = React.useState<User>();
  const [imageFile, setImageFile] = React.useState<IImageSet>();
  const [userImageUrl, setUserImageUrl] = React.useState<string>();
  const [searchBox, setSearchBox] = React.useState<any>();

  const { enqueueSnackbar } = useSnackbar();

  const changeInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewUserData({
      ...newUserData,
      ...{ [event.target.name]: event.target.value },
    });

    if (isMobile && !isAnyFieldChanged) {
      setIsAnyFieldChanged(true);
    }
  };

  const changeSelectHandler = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setNewUserData({
      ...newUserData,
      gender:
        event.target.value !== "notSelected"
          ? (event.target.value as string)
          : undefined,
    });

    if (isMobile && !isAnyFieldChanged) {
      setIsAnyFieldChanged(true);
    }
  };

  const onPlaceChange = () => {
    const places = searchBox?.getPlaces();
    console.error(places);
    if (places && places[0]) {
      setNewUserData({
        ...newUserData,
        address: places[0]?.formatted_address || "",
      });
    }
  };

  React.useEffect(() => {
    const t = setTimeout(() => {
      const input = document.getElementById("geo-input") as HTMLInputElement;
      // @ts-ignore: Unreachable code error
      // setGoogledPlace(new google.maps.places.Autocomplete(input, options));
      // @ts-ignore: Unreachable code error
      const snd = new google.maps.places.SearchBox(input);
      setSearchBox(snd);
    }, 1000);
    return () => {
      clearTimeout(t);
    };
  }, []);

  React.useEffect(() => {
    searchBox?.addListener("places_changed", onPlaceChange);
  }, [searchBox, newUserData]);

  React.useEffect(() => {
    newUserData?.image_url &&
      (async () => {
        try {
          setIsImageFileLoading(true);
          const file = await getFileFromUrl(newUserData?.image_url as string);
          console.log(file);
          setImageFile(file);
        } catch {
        } finally {
          setIsImageFileLoading(false);
        }
      })();
  }, [newUserData?.image_url]);

  React.useEffect(() => {
    !newUserData && userData && setNewUserData(userData);
    userData?.image_url && setUserImageUrl(userData?.image_url);
  }, [userData]);

  React.useEffect(() => {
    if (userData?.image_url !== userImageUrl) {
      setTimeout(
        () => {
          updateUserImage(userImageUrl);
        },
        isLoading ? 1500 : 0
      );
    }
  }, [userImageUrl]);

  const updateUserImage = async (imageUrl?: string) => {
    if (!imageUrl) {
      return;
    }
    try {
      setIsLoading(true);
      const isSuccess = await userApi.saveuserProfile({
        ...userData,
        image_url: imageUrl,
      });
      if (isSuccess) {
        enqueueSnackbar(notificationsText.defaultAlerts.saved, {
          variant: "success",
        });
        dispatch(
          setUserData({
            ...userData,
            image_url: imageUrl,
          })
        );
      } else {
        enqueueSnackbar(notificationsText.defaultAlerts.editingError, {
          variant: "error",
        });
      }
    } catch {
      enqueueSnackbar(notificationsText.defaultAlerts.editingError, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <LinearProgress />;
  }

  const submitFormHandler = async () => {
    if (!newUserData) {
      return;
    }
    try {
      setIsLoading(true);
      if (newUserData.phone?.includes("_")) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectPhoneNumber, {
          variant: "error",
        });
        return;
      }
      if (!newUserData.first_name) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectName, {
          variant: "error",
        });
        return;
      }
      if (!newUserData.last_name) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectSecondName, {
          variant: "error",
        });
        return;
      }

      const isSuccess = await userApi.saveuserProfile({
        ...newUserData,
        phone:
          ((newUserData.phone || "") as string)
            .replaceAll("_", "")
            .replaceAll("-", "")
            .replaceAll(")", "")
            .replaceAll("(", "")
            .replaceAll(" ", "") || undefined,
        image_url: userImageUrl || newUserData.image_url,
      });
      if (!isSuccess) {
        enqueueSnackbar(notificationsText.defaultAlerts.editingError, {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar(notificationsText.defaultAlerts.saved, {
        variant: "success",
      });
      dispatch(
        setUserData({
          ...newUserData,
          image_url: userImageUrl || newUserData.image_url,
        })
      );
      if (userImageUrl && userImageUrl !== newUserData.image_url) {
        try {
          imagesApi.deleteImage(newUserData.image_url);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (e) {
      console.error(e);
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!newUserData) {
    return <LinearProgress />;
  }

  const FilledTextInputDevice = isMobile
    ? FilledTextInputMobile
    : FilledTextInput;
  const FilledTextInputBaseDevice = isMobile
    ? FilledTextInputBaseMobile
    : FilledTextInputBase;

  return (
    <Grid
      container
      spacing={isMobile ? 0 : 9}
      style={{ width: "100%", paddingBottom: 200 }}
    >
      <Grid item xs={12} md={4}>
        {/* <img src="./assets/me.png" alt="avatar" width="100%" height="auto" /> */}
        {!isImageFileLoading && (
          <ImagesLoader
            isAnimateHover
            onLoadChanger={(urls: string[]) => {
              urls.length !== 0 &&
                (() => {
                  setUserImageUrl(urls[0]);
                })();
            }}
            initialPhotoFiles={imageFile ? [imageFile] : []}
            filesLimit={1}
          />
        )}
        <Box textAlign="left" marginTop={3}>
          <TooltipClickable
            title="Введи свой ИНН, чтобы подтвердить официальный
    статус Самозанятого и повысить доверие клиентов"
          >
            <FilledTextInputDevice
              variant="filled"
              onChange={changeInputHandler}
              value={newUserData.inn}
              inputProps={{ tabIndex: 11 }}
              name="inn"
              fullWidth
              label={
                <div>
                  ИНН
                  {userData?.verified ? (
                    <span
                      style={{
                        marginLeft: 8,
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: isMobile ? 18 : 24,
                        height: isMobile ? 18 : 24,
                      }}
                      data-title="21123"
                      className="tootip-icon"
                    >
                      <svg
                        width={isMobile ? "18" : "24"}
                        height={isMobile ? "18" : "24"}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.547 3.88621L12.3595 0.071666C12.1293 -0.0238652 11.8706 -0.0239121 11.6405 0.071666L2.45302 3.88621C2.10309 4.03153 1.875 4.37315 1.875 4.75204V9.38915C1.875 15.7741 5.73417 21.5176 11.6457 23.9305C11.8728 24.0231 12.1272 24.0231 12.3543 23.9305C18.2657 21.5176 22.125 15.7742 22.125 9.38915V4.75204C22.125 4.37315 21.897 4.03153 21.547 3.88621ZM20.25 9.38915C20.25 14.817 17.0625 19.8138 12 22.0442C7.07278 19.8734 3.75 14.9641 3.75 9.38915V5.37792L12 1.95257L20.25 5.37792V9.38915ZM10.9638 12.5492L14.9933 8.51967C15.3594 8.15357 15.953 8.15353 16.3192 8.51967C16.6853 8.88581 16.6852 9.47938 16.3191 9.84548L11.6267 14.5379C11.2605 14.9041 10.6669 14.9039 10.3009 14.5379L7.68084 11.9179C7.3147 11.5517 7.3147 10.9581 7.68084 10.5921C8.04698 10.226 8.64056 10.2259 9.00666 10.5921L10.9638 12.5492Z"
                          fill="#191E34"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      style={{
                        marginLeft: 8,
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: isMobile ? 18 : 24,
                        height: isMobile ? 18 : 24,
                      }}
                      data-title="21123"
                      className="tootip-icon"
                    >
                      <HelpCircle
                        stroke={theme.palette.secondary.dark}
                        width={isMobile ? 18 : 24}
                        height={isMobile ? 18 : 24}
                      />
                    </span>
                  )}
                </div>
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TooltipClickable>
        </Box>
      </Grid>
      <Grid item container xs={12} md={8} spacing={isMobile ? 0 : 4}>
        <Grid item xs={12} md={6}>
          <Box textAlign="left" marginTop={isMobile && 3}>
            <FilledTextInputDevice
              inputProps={{ tabIndex: 1 }}
              variant="filled"
              onChange={changeInputHandler}
              value={newUserData.first_name}
              name="first_name"
              fullWidth
              label="Имя"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box textAlign="left" marginTop={3} width={"100%"}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  transform: "none",
                  fontSize: isMobile ? 16 : 24,
                  marginLeft: 0,
                  position: "relative",
                  fontWeight: "bold",
                  marginBottom: isMobile ? 6 : 13,
                  color: theme.palette.secondary.dark,
                }}
              >
                Пол
              </InputLabel>
              <Select
                IconComponent={() => (
                  <ChervonIcon
                    style={{
                      position: "absolute",
                      right: 23,
                      pointerEvents: "none",
                    }}
                  />
                )}
                inputProps={{ tabIndex: 3 }}
                variant="filled"
                input={<FilledTextInputBaseDevice />}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newUserData.gender || "notSelected"}
                MenuProps={{
                  classes: {
                    paper: "#fff",
                  },
                  variant: "menu",
                  //setting variant to menu makes it appear below the element
                }}
                style={{
                  height: 52,
                }}
                onChange={changeSelectHandler}
              >
                <MenuItem value={"notSelected"}>Не выбран</MenuItem>
                <MenuItem value={"men"}>Мужской</MenuItem>
                <MenuItem value={"women"}>Женский</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box textAlign="left" marginTop={3}>
            <FilledTextInputDevice
              inputProps={{ tabIndex: 5 }}
              variant="filled"
              onChange={changeInputHandler}
              value={newUserData.address}
              name="address"
              fullWidth
              id="geo-input"
              label="Адрес"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box textAlign="left" marginTop={isMobile ? 3 : 0}>
            <FilledTextInputDevice
              inputProps={{ tabIndex: 2 }}
              variant="filled"
              onChange={changeInputHandler}
              value={newUserData.last_name}
              name="last_name"
              fullWidth
              label="Фамилия"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box textAlign="left" marginTop={3}>
            <InputMask
              mask="+7 (999) 999-99-99"
              value={newUserData.phone}
              disabled={false}
              onChange={changeInputHandler}
            >
              {() => (
                <FilledTextInputDevice
                  inputProps={{ tabIndex: 4 }}
                  variant="filled"
                  onChange={changeInputHandler}
                  value={newUserData.phone}
                  name="phone"
                  fullWidth
                  label="Телефон"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </InputMask>
          </Box>
          <Box textAlign="left" marginTop={3}>
            <FilledTextInputDevice
              inputProps={{ tabIndex: 6 }}
              variant="filled"
              onChange={changeInputHandler}
              value={newUserData.occupation}
              name="occupation"
              fullWidth
              label="Деятельность"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="left" marginTop={3}>
            <Box textAlign="left" marginTop={3} display="flex">
              <VKIcon
                style={{
                  marginRight: isMobile ? 12 : 18,
                  width: isMobile ? 64 : "unset",
                  height: isMobile ? 52 : 57,
                }}
              />
              <FilledTextInputDevice
                inputProps={{ tabIndex: 7 }}
                variant="filled"
                onChange={changeInputHandler}
                value={newUserData.vk}
                placeholder="sitodelme"
                name="vk"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="left" marginTop={3} display="flex">
              <WebsiteIcon
                style={{
                  marginRight: isMobile ? 12 : 18,
                  width: isMobile ? 65.5 : "unset",
                  height: isMobile ? 52 : 57,
                }}
              />
              <FilledTextInputDevice
                inputProps={{ tabIndex: 10 }}
                variant="filled"
                placeholder="sitodel.me"
                onChange={changeInputHandler}
                value={newUserData.website}
                name="website"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box textAlign="left" marginTop={3}>
              {isMobile ? (
                isAnyFieldChanged ? (
                  <FloatingButton
                    style={{
                      background: isLoading
                        ? theme.palette.secondary.main
                        : theme.palette.primary.dark,
                    }}
                    tabIndex={13}
                    fullWidth={isMobile}
                    variant="contained"
                    disableElevation
                    disabled={isLoading}
                    onClick={submitFormHandler}
                  >
                    Сохранить
                  </FloatingButton>
                ) : null
              ) : (
                <FlatButton
                  style={{
                    minWidth: 360,
                    backgroundColor: isLoading
                      ? theme.palette.secondary.main
                      : theme.palette.primary.dark,
                  }}
                  onClick={submitFormHandler}
                >
                  Сохранить
                </FlatButton>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyProfile;
