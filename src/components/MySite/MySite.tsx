import {
  Box,
  Dialog,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import _ from "lodash";

import MySiteContentSection from "./components/MySiteContentSection";
import { ReactComponent as SearchIcon } from "./icons/searchIcon.svg";
import { ReactComponent as Star } from "./icons/Star.svg";
import { ReactComponent as Move } from "./icons/Move.svg";
import { ReactComponent as ShareIcon } from "./icons/shareIcon.svg";
import { ReactComponent as EnterIcon } from "./icons/enterIcon.svg";
import { ReactComponent as EditIcon } from "./icons/editIcon.svg";
import Button from "../../styledComponents/Button";
import { theme } from "../../theme";

import { DeviceContext } from "../../App";
import { mySiteApi } from "../../api/mySiteApi";
import ShareSiteDialog from "./components/ShareSiteDialog";
import FloatingButton from "../FloatingFlatButton/FloatingFlatButton";

const MySite = () => {
  const history = useHistory();
  const { isMobile } = useContext(DeviceContext);

  const [mySiteData, setMySiteData] = useState();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeShareDialogOpen = () => {
    setIsShareDialogOpen(!isShareDialogOpen);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await mySiteApi.getMySite();
        console.error(resp);
        resp?.name && setMySiteData(resp);
      } catch {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const editConfig = [
    {
      icon: () => <EditIcon stroke="#FFF" />,
      title: "Редактировать",
      handler: () => {
        history.push("/my-site/1");
      },
    },
    {
      icon: () => <ShareIcon stroke="#FFF" />,
      title: "Поделиться сайтом",
      handler: () => {
        changeShareDialogOpen();
      },
    },
    {
      icon: () => <EnterIcon stroke="#FFF" />,
      title: "Перейти на сайт",
      handler: () => {
        mySiteData &&
          window.open(
            `${window.location.origin}/${(mySiteData as any)?.name}`,
            "_blank"
          );
      },
    },
  ];

  if (isLoading) {
    return <LinearProgress />;
  }

  if (mySiteData) {
    return (
      <Box marginBottom={isMobile && 25}>
        <Dialog
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: isMobile
              ? {
                  borderRadius: 12,
                  margin: 16,
                  width: "calc(100% - 32px)",
                }
              : { borderRadius: 12 },
          }}
          open={isShareDialogOpen}
          onClose={changeShareDialogOpen}
        >
          <ShareSiteDialog
            href={`${window.location.origin}/${(mySiteData as any)?.name}`}
          />
        </Dialog>
        <Grid
          container
          style={
            isMobile
              ? {
                  flexFlow: "column-reverse nowrap",
                }
              : {}
          }
          spacing={isMobile ? 3 : 5}
        >
          <Grid item md={7} sm={12} xs={12}>
            <Box width="100%" maxHeight={900} overflow={"hidden"}>
              <iframe
                title="my-site"
                src={`${window.location.origin}/${(mySiteData as any)?.name}`}
                width={isMobile ? "100%" : "300%"}
                style={{
                  transform: isMobile
                    ? "scale(0.7) translate(0%, -24%)"
                    : "scale(0.3) translate(-116%, -116%)",
                  borderRadius: 12,
                  overflow: "hidden",
                  pointerEvents: "none",
                  minHeight: isMobile ? "700px" : "4000px",
                }}
                scrolling={isMobile ? "yes" : "no"}
                frameBorder="0"
              />
            </Box>
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
            <Box style={isMobile ? {} : { position: "sticky", top: "35px" }}>
              {editConfig.map((x, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: isMobile
                      ? editConfig.length - 1 !== i
                        ? 24
                        : "unset"
                      : 34,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    _.isFunction(x.handler) && x.handler();
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item>
                      <Box
                        width={isMobile ? 34 : 60}
                        height={isMobile ? 34 : 60}
                        style={{
                          backgroundColor: theme.palette.primary.dark,
                          borderRadius: 8,
                          position: "relative",
                        }}
                      >
                        <Box
                          style={{
                            transform: "translate(-50%, -50%)",
                            left: "50%",
                            top: "54%",
                            position: "absolute",
                            height: "min-content",
                          }}
                        >
                          {x.icon()}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={8} lg={10} md={10}>
                      <Typography
                        style={{
                          fontWeight: "bold",
                          fontSize: isMobile ? 16 : 24,
                          color: isMobile
                            ? theme.palette.primary.dark
                            : theme.palette.secondary.dark,
                          marginLeft: isMobile ? 12 : 24,
                        }}
                      >
                        {x.title}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box paddingBottom={isMobile && 37}>
      {!isMobile && (
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: "#191E34",
          }}
        >
          Зачем тебе нужен сайт?
        </Typography>
      )}
      <MySiteContentSection
        title="1. Тебя будет проще найти"
        Icon={() => (
          <SearchIcon
            width={isMobile ? 13 : "unset"}
            height={isMobile ? 13 : "unset"}
            stroke="#FFF"
          />
        )}
        text="Рядом с тобой десятки людей, которые ищут классного специалиста. Помоги им себя найти — создай сайт, рассказывающий о тебе и твоих услугах всем в интернете"
      />
      <MySiteContentSection
        title="2. Улучши работу сарафанного радио"
        Icon={() => (
          <Star
            width={isMobile ? 13 : "unset"}
            height={isMobile ? 13 : "unset"}
            stroke="#FFF"
          />
        )}
        text="Помоги довольным клиентам делиться твоими контактами: по одной ссылке будут доступны твои расценки, примеры работ и контакты. Это удобнее, чем обмениваться телефонами, правда?"
      />
      <MySiteContentSection
        title="3. Больше ты не пропустишь важный заказ"
        Icon={() => (
          <Move
            width={isMobile ? 13 : "unset"}
            height={isMobile ? 13 : "unset"}
            stroke="#FFF"
          />
        )}
        text="Все заявки с сайта ты увидишь в личном кабинете — теперь не нужно постоянно сидеть у телефона и бояться пропустить звонок от клиента"
      />
      {isMobile ? (
        <FloatingButton
          onClick={() => {
            history.push("/my-site/1");
          }}
        >
          Создать сайт
        </FloatingButton>
      ) : (
        <Button
          style={{
            backgroundColor: theme.palette.primary.dark,
            borderRadius: 12,
            marginTop: 34,
            marginBottom: 20,
          }}
        >
          <Box
            paddingX={isMobile ? 2 : 10}
            paddingY={1}
            onClick={() => {
              history.push("/my-site/1");
            }}
          >
            <Typography
              style={{
                color: "#FFF",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              Создать сайт!
            </Typography>
          </Box>
        </Button>
      )}
    </Box>
  );
};

export default MySite;
