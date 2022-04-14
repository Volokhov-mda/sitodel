import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import {
  Dialog,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router";
import Skeleton from "react-loading-skeleton";
import { useSnackbar } from "notistack";

import { theme } from "../../theme";

import { DeviceContext, MySiteContext } from "../../App";
import { mySiteApi } from "../../api/mySiteApi";
import CreateApplicationDialog from "./CreateApplicationDialog";
import { arrow, noApplications } from "../../UIconsts";
import { notificationsText } from "../MySite/notificationTexts";

import {
  OutlinedTextInputBase,
  OutlinedTextInputBaseMobile,
  OutlinedInput,
  OutlinedInputMobile,
} from "../../styledComponents/FilledTextInput/FilledTextInput";
import Button from "../../styledComponents/Button";
import FloatingButton from "../FloatingFlatButton/FloatingFlatButton";

const sizes = [50, 150, 190, 210, 380];
const sizesMobile = [35, 110, 120, 110, 240];
const headTitles = ["№", "Имя", "Телефон", "Статус", "Комментарий"];

export interface IApplication {
  name: string;
  contact: string;
  status: string;
  comment: string;
  created_at?: string;
  id: number;
}

const limit = 5;

const MyApplications = () => {
  const history = useHistory();
  const { isMobile } = useContext(DeviceContext);
  const { mySiteData } = useContext<any>(MySiteContext);

  const [isCreateDialogShow, setIsCreateDialogShow] = useState(false);
  const [tableData, setTableData] = useState<IApplication[]>([]);
  const [lastCopy, setLastCopy] = useState<IApplication[]>([]);
  const [page, setPage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [stat, setStat] = useState({
    new: null,
    in_progress: null,
  });
  const [isSavingLoading, setIsSavingLoading] = useState(false);

  const changeInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const f = JSON.parse(JSON.stringify(tableData));
    (f[index] as any)[event.target.name] = event.target.value;
    setTableData([...f]);
  };

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const applications = await mySiteApi.getApplications(page, limit);
      console.error(applications);
      if (applications) {
        setTableData(applications.data);
        setTotalApplications(applications.total);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setTableData([...lastCopy]);
    setLastCopy([]);
  };

  const { enqueueSnackbar } = useSnackbar();

  const wordAdaptation = (num: any) => {
    const last2Nums = num % 100;

    if (last2Nums === 1) {
      return "Заявка";
    }

    if (last2Nums >= 2 && last2Nums <= 4) {
      return "Заявки";
    }

    if (last2Nums >= 5 && last2Nums <= 19) {
      return "Заявок";
    }

    const lastNum = last2Nums % 10;

    if (lastNum === 0) {
      return "Заявок";
    }

    if (lastNum === 1) {
      return "Заявка";
    }

    if (lastNum >= 2 && lastNum <= 4) {
      return "Заявки";
    }

    return "Заявок";
  };

  const wordAdaptation2 = (num: any) => {
    const last2Nums = num % 100;

    if (last2Nums === 1) {
      return "Новая";
    }

    if (last2Nums >= 2 && last2Nums <= 4) {
      return "Новые";
    }

    if (last2Nums >= 5 && last2Nums <= 19) {
      return "Новых";
    }

    const lastNum = last2Nums % 10;

    if (lastNum === 0) {
      return "Новых";
    }

    if (lastNum === 1) {
      return "Новая";
    }

    return "Новых";
  };

  const saveEditing = () => {
    try {
      lastCopy.forEach((t) => {
        if (!tableData.some((x) => x.id === t.id)) {
          mySiteApi.deleteOrder(t.id);
        } else if (
          JSON.stringify(tableData.find((x) => t.id === x.id)) !==
          JSON.stringify(t)
        ) {
          if (
            (tableData?.find((x) => t.id === x.id)?.comment?.length || NaN) >
            512
          ) {
            enqueueSnackbar(notificationsText.myApplications.tooLongComment, {
              variant: "error",
            });
            return;
          }
          mySiteApi.editOrder(tableData.find((x) => t.id === x.id));
        }
      });
      setTimeout(() => {
        fetchStat();
      }, 500);
      enqueueSnackbar(notificationsText.defaultAlerts.saved, {
        variant: "success",
      });
      fetchStat();
    } catch {
      enqueueSnackbar(notificationsText.defaultAlerts.editingError, {
        variant: "error",
      });
    } finally {
      setIsEditing(false);
      setLastCopy([]);
    }
  };

  const deleteOrderHandler = (id: number) => {
    setTableData(tableData.filter((x) => x.id !== id));
  };

  const fetchStat = async () => {
    try {
      setStat({
        new: null,
        in_progress: null,
      });
      let newStat = await mySiteApi.getStat();
      if (!newStat) {
        return;
      }
      newStat = {
        in_progress: newStat.in_progress ? newStat.in_progress.toString() : "0",
        new: newStat.new ? newStat.new.toString() : "0",
      };
      setStat(newStat);
    } catch {}
  };

  useEffect(() => {
    fetchStat();
  }, []);

  useEffect(() => {
    loadApplications();
    setIsEditing(false);
    setLastCopy([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const changeCreateDialogIsShow = () => {
    setIsCreateDialogShow(!isCreateDialogShow);
  };

  const saveNewApplication = async (data: IApplication) => {
    try {
      setIsSavingLoading(true);
      if (data.contact.includes("_")) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectPhoneNumber, {
          variant: "error",
        });
        return;
      }
      if (!data.name?.length) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectName, {
          variant: "error",
        });
        return;
      }
      if (!data.comment?.length) {
        enqueueSnackbar(notificationsText.myApplications.noComment, {
          variant: "error",
        });
        return;
      }
      const resp = await mySiteApi.createNewOrder(
        {
          ...data,
          contact:
            ((data.contact || "") as string)
              .replaceAll("_", "")
              .replaceAll("-", "")
              .replaceAll(")", "")
              .replaceAll("(", "")
              .replaceAll(" ", "") || undefined,
        }
        // mySiteData?.name
      );
      if (resp) {
        enqueueSnackbar(notificationsText.defaultAlerts.saved, {
          variant: "success",
        });
        setTimeout(() => {
          fetchStat();
        }, 500);
      } else {
        enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
          variant: "error",
        });
      }
      return !!resp;
    } catch {
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
      return false;
    } finally {
      setIsSavingLoading(false);
    }
  };

  if (isMobile && !isLoading && tableData?.length === 0) {
    return (
      <Box
        width="100%"
        display="flex"
        justifyContent="cetner"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        paddingBottom="150px"
      >
        <Box>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              noApplications
            )}`}
            style={{
              width: isMobile ? "70%" : "100%",
              maxWidth: 500,
              transform: "translate(16px, -18px)",
              marginBottom: -24,
              marginTop: 50,
            }}
            alt="noApplications"
          />
        </Box>
        <Typography style={{ fontSize: 16, marginTop: 24 }}>
          У тебя нет заказов в заявках :(
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 500,
            marginTop: 15,
          }}
        >
          {mySiteData === null ? (
            <>
              Создай собственный сайт, <br />
              чтобы привлечь клиентов
            </>
          ) : (
            <>
              Поделись своим сайтом, <br /> чтобы привлечь клиентов
            </>
          )}
        </Typography>

        {mySiteData === null ? (
          <FloatingButton
            style={{
              bottom: 24,
            }}
            onClick={() => {
              history.push("/my-site");
            }}
          >
            Создать сайт
          </FloatingButton>
        ) : (
          <FloatingButton
            style={{
              bottom: 24,
            }}
            onClick={() => {
              history.push("/my-site");
            }}
          >
            Поделиться сайтом
          </FloatingButton>
        )}
      </Box>
    );
  }

  const sizesDevice = isMobile ? sizesMobile : sizes;
  const OutlinedInputDevice = isMobile ? OutlinedInputMobile : OutlinedInput;
  const OutlinedTextInputBaseDevice = isMobile
    ? OutlinedTextInputBaseMobile
    : OutlinedTextInputBase;

  return (
    <>
      <Dialog
        open={isCreateDialogShow}
        onClose={changeCreateDialogIsShow}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: isMobile
            ? {
                borderRadius: 12,
                margin: 16,
                width: "calc(100% - 32px)",
              }
            : { borderRadius: 12 },
        }}
      >
        <CreateApplicationDialog
          onSave={(data) => {
            saveNewApplication(data).then((isSuccess) => {
              if (isSuccess) {
                setPage(0);
                loadApplications();
                setIsEditing(false);
                setLastCopy([]);
                changeCreateDialogIsShow();
              }
            });
          }}
          isLoading={isSavingLoading}
          onCancel={changeCreateDialogIsShow}
        />
      </Dialog>
      <Box
        width="100%"
        marginX={isMobile ? 0 : 3}
        paddingBottom={isMobile && "100px"}
      >
        <Box display={"flex"} marginTop={isMobile ? 0 : 8}>
          <Box display="flex">
            {stat.new ? (
              <>
                <span
                  style={{
                    fontSize: isMobile ? 24 : 72,
                    fontWeight: "bold",
                    fontFamily: '"Montserrat"',
                    color: theme.palette.primary.dark,
                  }}
                >
                  {stat.new}
                </span>

                <span
                  style={{
                    fontSize: isMobile ? 16 : 24,
                    marginTop: isMobile ? "unset" : 24,
                    marginLeft: isMobile ? 12 : 20,
                    fontFamily: '"Montserrat"',
                    fontWeight: 500,
                    lineHeight: "116%",
                  }}
                >
                  {console.log(stat.new)}
                  {wordAdaptation2(stat.new)} <br />{" "}
                  {wordAdaptation(stat.new).toLowerCase()}
                </span>
              </>
            ) : (
              <Skeleton
                width={isMobile ? 80 : 300}
                height={isMobile ? 37 : 70}
                style={{ marginTop: isMobile ? 0 : 22 }}
              />
            )}
          </Box>

          <Box display="flex" marginLeft={isMobile ? 3 : 10}>
            {stat.in_progress ? (
              <>
                <span
                  style={{
                    fontSize: isMobile ? 24 : 72,
                    fontWeight: "bold",
                    fontFamily: '"Montserrat"',
                    color: theme.palette.primary.dark,
                  }}
                >
                  {stat.in_progress}
                </span>
                <span
                  style={{
                    fontSize: isMobile ? 16 : 24,
                    marginTop: isMobile ? "unset" : 24,
                    marginLeft: isMobile ? 12 : 20,
                    fontFamily: '"Montserrat"',
                    fontWeight: 500,
                    lineHeight: "116%",
                  }}
                >
                  {wordAdaptation(stat.in_progress)} <br /> в работе
                </span>
              </>
            ) : (
              <Skeleton
                width={isMobile ? 80 : 300}
                height={isMobile ? 37 : 70}
                style={{ marginTop: isMobile ? 0 : 22 }}
              />
            )}
          </Box>
        </Box>
        <Box
          style={{
            overflowX: "auto",
          }}
        >
          <Box
            marginTop={isMobile ? 3 : 1}
            style={{
              // width: "100%",
              paddingRight: 10,
            }}
            minWidth={`${sizesDevice.reduce((x, y) => x + y, 90)}px`}
          >
            <Box
              display={isMobile ? "block" : "flex"}
              justifyContent="space-between"
            >
              {!isMobile && (
                <Typography
                  style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    color: "#191E34",
                    marginTop: 20,
                  }}
                >
                  Заявки с твоего сайта
                </Typography>
              )}
              <Box
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  padding: isMobile ? "0 16px" : "unset",
                  position: isMobile ? "fixed" : "static",
                  bottom: isMobile ? 24 : "unset",
                  left: isMobile ? 0 : "unset",
                  width: isMobile ? "100%" : "unset",
                  zIndex: 1,
                }}
              >
                <Button
                  onClick={() => {
                    if (tableData?.length && !isEditing) {
                      setIsEditing(true);
                      setLastCopy([...tableData]);
                    }
                  }}
                  style={{
                    height: 61,
                    width: 61,
                    marginRight: isMobile ? 14 : 20,
                    borderRadius: 12,
                    backgroundColor: "#EAEEF3",
                  }}
                >
                  <Box marginTop={1}>
                    <svg
                      width="24"
                      stroke="#626870"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20H21"
                        stroke="#626870"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.5 3.50023C16.8978 3.1024 17.4374 2.87891 18 2.87891C18.2786 2.87891 18.5544 2.93378 18.8118 3.04038C19.0692 3.14699 19.303 3.30324 19.5 3.50023C19.697 3.69721 19.8532 3.93106 19.9598 4.18843C20.0665 4.4458 20.1213 4.72165 20.1213 5.00023C20.1213 5.2788 20.0665 5.55465 19.9598 5.81202C19.8532 6.06939 19.697 6.30324 19.5 6.50023L7 19.0002L3 20.0002L4 16.0002L16.5 3.50023Z"
                        stroke="#626870"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Box>
                </Button>
                <Button
                  style={{
                    backgroundColor:
                      !mySiteData?.name || mySiteData === null
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                    textTransform: "none",
                    borderRadius: 12,
                    height: 61,
                    flexGrow: 1,
                  }}
                  disabled={!mySiteData?.name || mySiteData === null}
                  onClick={changeCreateDialogIsShow}
                >
                  <Typography
                    style={{
                      fontSize: isMobile ? 16 : 24,
                      fontWeight: "bold",
                      color: "#FFF",
                      margin: isMobile ? "unset" : "0px 59px",
                    }}
                  >
                    Добавить заявку
                  </Typography>
                </Button>
              </Box>
            </Box>

            <Box
              style={{
                borderRadius: 12,
                backgroundColor: "#eaeef3",
                // paddingRight: 80,
              }}
              display={"flex"}
              // justifyContent="flex-start"
              justifyContent="space-between"
              marginTop={isMobile ? 0 : 2}
              paddingY={isMobile ? 2 : 2.7}
              paddingX={isMobile ? 2 : 3}
              textAlign="center"
            >
              {headTitles.map((t, i) => (
                <Typography
                  style={{
                    textAlign: "center",
                    minWidth: `${sizesDevice[i]}px`,
                    paddingRight: i === headTitles.length - 1 ? 50 : 0,
                    color: theme.palette.secondary.dark,
                    fontSize: isMobile ? 16 : 24,
                  }}
                >
                  {t}
                </Typography>
              ))}
            </Box>
            <Box paddingX={isMobile ? 2 : 3} textAlign="center">
              {isLoading ? (
                <Box marginTop={1}>
                  <LinearProgress />
                </Box>
              ) : tableData?.length === 0 ? (
                <>
                  <Box>
                    <img
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        noApplications
                      )}`}
                      alt="noApplications"
                    />
                  </Box>
                  <Typography style={{ fontSize: 32, marginTop: 12 }}>
                    У тебя нет заказов в заявках :(
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      marginTop: 15,
                    }}
                  >
                    {mySiteData === null ? (
                      <>
                        Создай собственный сайт, <br />
                        чтобы привлечь клиентов
                      </>
                    ) : (
                      <>
                        Поделись своим сайтом, <br /> чтобы привлечь клиентов
                      </>
                    )}
                  </Typography>
                  {mySiteData === null && (
                    <Button
                      style={{
                        backgroundColor: theme.palette.primary.dark,
                        textTransform: "none",
                        borderRadius: 12,
                        height: 61,
                        marginTop: 24,
                        marginBottom: 30,
                      }}
                      onClick={() => {
                        history.push("/my-site");
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 24,
                          fontWeight: "bold",
                          color: "#FFF",
                          margin: "0px 79px",
                        }}
                      >
                        Создать сайт
                      </Typography>
                    </Button>
                  )}
                </>
              ) : (
                tableData.map((t, j) => (
                  <>
                    <Box
                      key={j}
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems="center"
                      marginTop={isMobile ? 0 : 2}
                      paddingBottom={isMobile ? 2 : 2.7}
                      paddingTop={2}
                    >
                      {[
                        { value: page * limit + j + 1, name: "num" },
                        { value: t.name, name: "name" },
                        { value: t.contact, name: "contact" },
                        { value: t.status, name: "status" },
                        { value: t.comment, name: "comment" },
                      ].map((y, i) =>
                        isEditing && y.name !== "num" ? (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {y.name === "status" ? (
                              <Box textAlign="left" width={"100%"}>
                                <FormControl style={{ width: "100%" }}>
                                  <Select
                                    input={<OutlinedTextInputBaseDevice />}
                                    value={y.value || "Новая"}
                                    MenuProps={{
                                      classes: {
                                        paper: "#fff",
                                      },
                                    }}
                                    style={{
                                      width: `${sizesDevice[i]}px`,
                                      fontSize: isMobile ? 11 : 18,
                                      fontWeight: 500,
                                      // marginLeft: 21.6,
                                      // marginRight: 21.6
                                    }}
                                    onChange={(
                                      e: React.ChangeEvent<{
                                        name?: string | undefined;
                                        value: unknown;
                                      }>
                                    ) => {
                                      const f = JSON.parse(
                                        JSON.stringify(tableData)
                                      );

                                      (f[j] as any).status = e.target.value;
                                      setTableData([...f]);
                                      // setNewUserData({
                                      //   ...newUserData,
                                      //   gender:
                                      //     event.target.value !== "notSelected"
                                      //       ? (event.target.value as string)
                                      //       : undefined,
                                      // });
                                    }}
                                  >
                                    <MenuItem value={"Новая"}>Новая</MenuItem>
                                    <MenuItem value={"В работе"}>
                                      В работе
                                    </MenuItem>
                                    <MenuItem value={"Выполнена"}>
                                      Выполнена
                                    </MenuItem>
                                    <MenuItem value={"Отказ"}>Отказ</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            ) : (
                              <>
                                <OutlinedInputDevice
                                  value={y.value}
                                  variant="filled"
                                  fullWidth
                                  multiline={
                                    y.name === "comment" || y.name === "name"
                                  }
                                  // label="Почта"
                                  style={{
                                    width: `${
                                      y.name === "comment"
                                        ? sizesDevice[i] - 90
                                        : sizesDevice[i]
                                    }px`,
                                    fontSize: isMobile ? 11 : 18,
                                    fontWeight: 500,
                                    // marginLeft: 21.6,
                                    // marginRight: 21.6
                                  }}
                                  name={y.name}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => {
                                    changeInputHandler(e, j);
                                  }}
                                />
                                {y.name === "comment" && (
                                  <Button
                                    style={{
                                      border: "2px solid #EAEEF3",
                                      borderRadius: 12,
                                      marginLeft: isMobile ? 24 : 26,
                                      width: isMobile ? 54 : "unset",
                                      minWidth: isMobile ? 54 : "unset",
                                      height: isMobile ? 54 : "unset",
                                    }}
                                    onClick={() => {
                                      deleteOrderHandler(t.id);
                                    }}
                                  >
                                    <img
                                      style={
                                        {
                                          // marginTop: 8,
                                          // marginBottom: 8,
                                        }
                                      }
                                      src="./assets/trash-2.svg"
                                      alt="logo"
                                    />
                                  </Button>
                                )}{" "}
                              </>
                            )}
                          </div>
                        ) : (
                          <Typography
                            style={{
                              minWidth: `${
                                isEditing ? sizesDevice[i] : sizesDevice[i]
                              }px`,
                              maxWidth: `${
                                isEditing ? sizesDevice[i] : sizesDevice[i]
                              }px`,
                              fontSize: isMobile ? 11 : 18,
                              fontWeight: 500,
                              whiteSpace: "pre-line",
                              overflowX: "hidden",
                              textOverflow: "ellipsis",
                              paddingRight: y.name === "comment" ? 50 : 0,
                            }}
                          >
                            {y.value || "Нет данных"}
                          </Typography>
                        )
                      )}
                    </Box>
                    <Box
                      width="100%"
                      height={isMobile ? 2 : 4}
                      style={{ borderRadius: 4, backgroundColor: "#eaeef3" }}
                    />
                  </>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {isEditing && (
          <Box
            display={isMobile ? "flex" : "block"}
            width="100%"
            textAlign="center"
            marginTop={2}
          >
            <Button
              style={{
                backgroundColor: theme.palette.primary.dark,
                textTransform: "none",
                borderRadius: 12,
              }}
              onClick={saveEditing}
            >
              <Typography
                style={{
                  fontSize: isMobile ? 16 : 24,
                  fontWeight: "bold",
                  color: "#FFF",
                  margin: "5px 40px",
                }}
              >
                Сохранить
              </Typography>
            </Button>
            <Button
              style={{
                backgroundColor: theme.palette.secondary.main,
                textTransform: "none",
                borderRadius: 12,
                marginLeft: isMobile ? 12 : 24,
              }}
              onClick={cancelEditing}
            >
              <Typography
                style={{
                  fontSize: isMobile ? 16 : 24,
                  fontWeight: "bold",
                  color: "#FFF",
                  margin: "5px 40px",
                }}
              >
                Отменить
              </Typography>
            </Button>
          </Box>
        )}
        {tableData.length ? (
          <Box width="100%" position="relative" marginBottom="100px">
            <div
              style={{
                display: "flex",
                left: "50%",
                top: isMobile ? 10 : 20,
                transform: "translate(-50%, 0)",
                position: "absolute",
                backgroundColor: "#EAEEF3",
                borderRadius: 30,
              }}
            >
              <Button
                style={
                  isMobile
                    ? {
                        minWidth: "unset",
                        height: 35,
                        textTransform: "none",
                        borderRadius: 30,
                      }
                    : {
                        textTransform: "none",
                        borderRadius: 30,
                      }
                }
                disableElevation
                startIcon={
                  <div
                    style={{
                      display: "flex",
                      stroke:
                        page === 0 ? "initial" : theme.palette.primary.main,
                      fill: page === 0 ? "initial" : theme.palette.primary.main,
                      transform: isMobile
                        ? "rotate(-180deg) scale(.666)"
                        : "rotate(-180deg)",
                    }}
                    dangerouslySetInnerHTML={{ __html: arrow }}
                  />
                }
                disabled={page === 0}
                onClick={() => {
                  setPage(page - 1);
                }}
              />
              <Typography
                style={{
                  margin: isMobile ? "0 15px" : "5px 30px 0px 30px",
                  fontSize: isMobile ? 11 : 24,
                  display: isMobile ? "flex" : "block",
                  alignSelf: isMobile ? "center" : "unset",
                }}
              >
                {page + 1}
              </Typography>
              <Button
                style={
                  isMobile
                    ? {
                        minWidth: "unset",
                        height: 35,
                        textTransform: "none",
                        borderRadius: 30,
                      }
                    : {
                        textTransform: "none",
                        borderRadius: 30,
                      }
                }
                disableElevation
                disableFocusRipple
                disabled={page * limit + tableData.length >= totalApplications}
                endIcon={
                  <div
                    style={{
                      display: "flex",
                      transform: isMobile ? "scale(.666)" : "unset",
                      fill:
                        page * limit + tableData.length >= totalApplications
                          ? "initial"
                          : theme.palette.primary.main,

                      stroke:
                        page * limit + tableData.length >= totalApplications
                          ? "initial"
                          : theme.palette.primary.main,
                    }}
                    dangerouslySetInnerHTML={{ __html: arrow }}
                  />
                  // <img
                  //   src={`data:image/svg+xml;utf8,${encodeURIComponent(arrow)}`}
                  //   alt="forward"
                  //   style={{ stroke: "#111" }}
                  // />
                }
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            </div>
          </Box>
        ) : (
          <div />
        )}
      </Box>
    </>
  );
};

export default MyApplications;
