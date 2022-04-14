import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { mySiteApi } from "../../api/mySiteApi";
import Button from "../../styledComponents/Button";
import InputMask from "react-input-mask";
import {
  FilledTextInput,
  FilledTextInputMobile,
} from "../../styledComponents/FilledTextInput/FilledTextInput";
import CreateSiteContentSection from "./components/CreateSiteContentSection";
import { ReactComponent as SelectedColorIcon } from "./icons/selectedColor.svg";
import Skeleton from "react-loading-skeleton";
import { DeviceContext, MySiteContext } from "../../App";
import { notificationsText } from "./notificationTexts";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/ducks/user/selectors";
import PriceList from "./components/PriceList";
import Gallery from "./components/Gallery";
import { theme } from "../../theme";

import "./CreateSite.css";

const colors = [
  "#2F80ED",
  "#2D9CDB",
  "#219653",
  "#9B51E0",
  "#EB5757",
  "#F2994A",
];

const CreateSite = () => {
  const location = window.location.origin;
  const { isMobile } = useContext(DeviceContext);
  const { setMySiteData: updateMySiteContext } = useContext<any>(MySiteContext);
  const { enqueueSnackbar } = useSnackbar();
  const userData = useSelector(selectUserData);
  
  const [mySiteData, setMySiteData] = useState({
    description: "",
    color: "#2F80ED",
    name: "",
    facts: Array(4).fill(""),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAlreadyExists, setIsAlreadyExists] = useState(false);
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  
  const saveMySiteHandler = async () => {
    try {
      if (!userData?.first_name || !userData?.last_name) {
        enqueueSnackbar(notificationsText.createSite.fillProfileError, {
          variant: "error",
        });
        return;
      }
      if (!mySiteData.name) {
        enqueueSnackbar(notificationsText.createSite.emptyLinkError, {
          variant: "error",
        });
        return;
      }
      setIsSavingLoading(true);
      await mySiteApi.saveMySite({
        ...mySiteData,
        name: mySiteData.name.replaceAll(" ", "_"),
      });
      // await mySiteApi.saveMySite(mySiteData);

      enqueueSnackbar(notificationsText.defaultAlerts.saved, {
        variant: "success",
      });
      update();
    } catch {
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    } finally {
      setIsSavingLoading(false);
    }
  };
  useEffect(() => {
    update();
  }, []);
  const update = async () => {
    try {
      setIsLoading(true);
      const resp = await mySiteApi.getMySite();
      if (resp?.name) {
        setMySiteData(resp);
        updateMySiteContext(resp);
        setIsAlreadyExists(true);
      }
      console.error(resp);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const editFactHandler = (index: any, val: any) => {
    const a = [...mySiteData.facts] as any[];
    a[index] = val;
    setMySiteData({ ...mySiteData, facts: [...a] });
  };
  const changeInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      event.target.name === "name" &&
      event.target.value &&
      !/^[a-zA-Z0-9_()-]+$/.test(event.target.value)
    ) {
      return;
    }
    setMySiteData({
      ...mySiteData,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const FilledTextInputDevice = isMobile
    ? FilledTextInputMobile
    : FilledTextInput;

  return (
    <div style={isMobile ? { paddingBottom: 250 } : {}}>
      <CreateSiteContentSection
        isObligatory
        isLoading={isLoading}
        title="1. Добавь пару фактов о себе"
        text={`Тогда потенциальный клиент сможет узнать о тебе чуть больше и убедиться\nв твоем проффесионализме`}
      >
        <Box textAlign="left" marginTop={isMobile ? "12px" : 3}>
          <FilledTextInputDevice
            variant="filled"
            autoComplete="off"
            onChange={(e: any) => {
              editFactHandler(0, e.target.value);
            }}
            value={mySiteData.facts[0]}
            label=""
            placeholder="10 лет опыта"
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginRight: 20,
              width: isMobile ? "100%" : 270,
              marginTop: isMobile ? 0 : 5,
            }}
          />
          <FilledTextInputDevice
            variant="filled"
            autoComplete="off"
            onChange={(e: any) => {
              editFactHandler(1, e.target.value);
            }}
            value={mySiteData.facts[1]}
            label=""
            placeholder="Чемпион мира"
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              width: isMobile ? "100%" : 240,
              marginTop: isMobile ? 12 : 5,
            }}
          />
        </Box>
        <Box textAlign="left" marginTop={isMobile ? "12px" : 3}>
          <FilledTextInputDevice
            variant="filled"
            autoComplete="off"
            onChange={(e: any) => {
              editFactHandler(2, e.target.value);
            }}
            value={mySiteData.facts[2]}
            label=""
            placeholder="15 вариантов тортов"
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginRight: 20,
              marginTop: isMobile ? 0 : 5,
              width: isMobile ? "100%" : 290,
            }}
          />
          <FilledTextInputDevice
            style={{
              width: isMobile ? "100%" : 295,
              marginTop: isMobile ? 12 : 5,
            }}
            variant="filled"
            autoComplete="off"
            onChange={(e: any) => {
              editFactHandler(3, e.target.value);
            }}
            value={mySiteData.facts[3]}
            label=""
            placeholder="Собственная пекарня"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </CreateSiteContentSection>
      <CreateSiteContentSection
        isObligatory
        title="2. Напиши несколько слов о себе"
        isLoading={isLoading}
        text="Здесь ты можешь подробнее рассказать о том, что важно для будущих клиентов"
      >
        <Box textAlign="left" marginTop={isMobile ? "12px" : 3}>
          <FilledTextInputDevice
            variant="filled"
            autoComplete="off"
            onChange={changeInputHandler}
            value={mySiteData.description}
            name="description"
            label=""
            fullWidth
            multiline
            rows={isMobile ? 0 : 6}
            placeholder={`Приготовлю торт на Ваш праздник и для вкусного домашнего чаепития! Использую только натуральные и качественные ингридиенты: Мука в/с известных производителей, сахар, сливочное масло 82,5 %, куриные яйца, молоко 2,5%, натуральная ваниль, Сливки натуральные 33%, сливочный сыр, орехи, ягоды и фрукты замороженные, свежие.`}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </CreateSiteContentSection>
      <CreateSiteContentSection
        linkedText="Прайс-лист"
        title="3. Заполни раздел "
        isLoading={isLoading}
        text={`Тогда потенциальный клиент сможет узнать о тебе чуть больше и убедиться\nв твоем проффесионализме`}
      >
        <Box marginTop={3}>
          <PriceList />
        </Box>
      </CreateSiteContentSection>
      <CreateSiteContentSection
        linkedText="Галерея"
        title="4. Заполни раздел "
        isLoading={isLoading}
        text={`Фотографии из этого раздела будут отображаться на твоём сайте в отдельном блоке.\nОтличный способ показать свои работы лицом!`}
      >
        <Box marginTop={3}>
          <Gallery />
        </Box>
      </CreateSiteContentSection>

      <Grid container style={{ marginBottom: 24 }}>
        <Grid item xs={12} sm={6}>
          <CreateSiteContentSection
            title="5. Выбери цветовую гамму"
            text={`Этот цвет будет использоваться на самых\nважных элементах твоего сайта`}
            isLoading={isLoading}
          >
            <Grid
              container
              spacing={isMobile ? 1 : 2}
              style={{ marginTop: isMobile ? 12 : 19 }}
            >
              {colors.map((x) => (
                <Grid item>
                  <Box
                    onClick={() => {
                      setMySiteData({ ...mySiteData, color: x });
                    }}
                    width={isMobile ? 47 : 65}
                    height={isMobile ? 47 : 65}
                    borderRadius={8}
                    style={{
                      backgroundColor: x,
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      style={{
                        position: "absolute",
                        opacity: x === (mySiteData.color || colors[0]) ? 1 : 0,
                        top: "55%",
                        left: "51%",
                        transform: "translate(-50%, -50%)",
                        transition: "opacity 0.5s",
                      }}
                    >
                      <SelectedColorIcon
                        width={isMobile ? 26 : 36}
                        height={isMobile ? 26 : 36}
                        stroke="#FFF"
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CreateSiteContentSection>
        </Grid>
        <Grid item xs={12} sm={6} spacing={0}>
          <Box
            height={isMobile ? "100%" : "calc(100% - 34px)"}
            // maxWidth="500px"
            borderRadius={12}
            style={{ backgroundColor: "#EAEEF3", marginTop: isMobile ? 0 : 36 }}
          >
            <Box
              paddingX={isMobile ? "39px" : "58px"}
              paddingY={isMobile ? "28px" : "42px"}
              width="100%"
            >
              {isLoading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box
                      style={{
                        backgroundColor: "#FFF",
                        width: "100%",
                        height: "100%",
                        borderRadius: 8,
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Typography
                        style={{
                          fontSize: isMobile ? 14 : 18,
                          color: mySiteData.color || colors[0],
                          transition: "color 0.3s",
                        }}
                      >
                        Твоё имя
                      </Typography>
                      <Box
                        marginTop={isMobile ? "4px" : 1}
                        style={{
                          backgroundColor: "#FFF",
                          width: isMobile ? "60%" : "100%",
                          height: isMobile ? 6 : 10,
                          borderRadius: 2,
                        }}
                      />
                      <Box
                        marginTop={isMobile ? "5px" : 1}
                        style={{
                          backgroundColor: "#FFF",
                          width: isMobile ? "45%" : "80%",
                          height: isMobile ? 6 : 10,
                          borderRadius: 2,
                        }}
                      />
                      <Box>
                        <Box marginTop={isMobile ? "10px" : 1} display="flex">
                          <Box
                            style={{
                              backgroundColor: mySiteData.color || colors[0],
                              transition: "background-color 0.3s",
                              width: isMobile ? "25%" : "30%",
                              height: isMobile ? 10 : 15,
                              borderRadius: 4,
                            }}
                          />
                          <Box
                            marginLeft={isMobile ? "4px" : 1}
                            style={{
                              backgroundColor: mySiteData.color || colors[0],
                              transition: "background-color 0.3s",
                              width: "30%",
                              height: isMobile ? 10 : 15,
                              borderRadius: 4,
                            }}
                          />
                        </Box>
                        <Box marginTop={isMobile ? "3px" : 1} display="flex">
                          <Box
                            style={{
                              backgroundColor: mySiteData.color || colors[0],
                              transition: "background-color 0.3s",
                              width: isMobile ? "35%" : "42%",
                              height: isMobile ? 10 : 15,
                              borderRadius: 4,
                            }}
                          />
                          <Box
                            marginLeft={isMobile ? "4px" : 1}
                            style={{
                              backgroundColor: mySiteData.color || colors[0],
                              transition: "background-color 0.3s",
                              width: "42%",
                              height: isMobile ? 10 : 15,
                              borderRadius: 4,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CreateSiteContentSection
        title="6. Как будет называться твой сайт?"
        isLoading={isLoading}
        text={`Уникальный адрес сайта запомнится клиентам и они смогут легко тебя найти.\nПодойдут названия, состоящие из букв и цифр`}
      >
        <Box
          style={{
            borderRadius: isMobile ? 4 : 13,
            height: isMobile ? 44 : 140,
            backgroundColor: "#F2F3F5",
            width: "100%",
            position: "relative",
            marginTop: 24,
            marginBottom: 10,
          }}
        >
          <Box
            style={{
              position: "absolute",
              borderRadius: isMobile ? "4px 4px 0px 0px" : "13px 13px 0px 0px",
              top: 0,
              width: "100%",
              height: isMobile ? 26 : 82,
              backgroundColor: "#E6E7EB",
            }}
          >
            <Box
              style={{
                position: "absolute",
                top: isMobile ? 5 : 8,
                left: "50%",
                transform: "translate(-50%, 0)",
                backgroundColor: "#FFF",
                borderRadius: isMobile ? 4 : 12,
                display: "flex",
                padding: isMobile ? "2px 25px" : 12,
              }}
            >
              {!isMobile && (
                <Typography style={{ fontSize: 24, color: "#626C84" }}>
                  {location + "/"}
                </Typography>
              )}
              <input
                onChange={changeInputHandler}
                value={mySiteData.name}
                name="name"
                className="my-site-link-input"
                placeholder="Напиши название здесь"
                style={
                  isMobile
                    ? {
                        fontSize: 11,
                        padding: 0,
                        minWidth: 150,
                      }
                    : {}
                }
              />
            </Box>
            <Box
              style={{
                position: "absolute",
                top: isMobile ? 7 : 21,
                left: isMobile ? 5 : 14,
                display: "flex",
              }}
            >
              <Box
                style={{
                  borderRadius: "50%",
                  height: isMobile ? 5 : 15,
                  width: isMobile ? 5 : 15,
                  backgroundColor: "#EB5757",
                  marginLeft: isMobile ? 3 : 9,
                }}
              />

              <Box
                style={{
                  borderRadius: "50%",
                  height: isMobile ? 5 : 15,
                  width: isMobile ? 5 : 15,
                  backgroundColor: "#F2C94C",
                  marginLeft: isMobile ? 3 : 9,
                }}
              />
              <Box
                style={{
                  borderRadius: "50%",
                  height: isMobile ? 5 : 15,
                  width: isMobile ? 5 : 15,
                  backgroundColor: "#27AE60",
                  marginLeft: isMobile ? 3 : 9,
                }}
              />
            </Box>
          </Box>
        </Box>
      </CreateSiteContentSection>
      <Box width="100%" textAlign="center">
        {!isLoading && (
          <Button
            style={{
              backgroundColor: isSavingLoading
                ? "#D5D5D5"
                : theme.palette.primary.dark,
              borderRadius: 12,
              marginTop: isMobile ? 20 : 34,
              marginBottom: isMobile ? 0 : 30,
              width: isMobile ? "100%" : "unset",
              height: 61,
            }}
            onClick={() => {
              !isSavingLoading && saveMySiteHandler();
            }}
          >
            <Box marginX={isMobile ? 2 : 10} marginY={1}>
              <Typography
                style={{
                  color: "#FFF",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: isMobile ? 16 : 24,
                }}
              >
                {!isAlreadyExists ? "Создать сайт!" : "Сохранить"}
              </Typography>
            </Box>
          </Button>
        )}
      </Box>
    </div>
  );
};

export default CreateSite;
