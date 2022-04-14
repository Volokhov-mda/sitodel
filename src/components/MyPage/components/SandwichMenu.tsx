import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import { isFunction } from "lodash";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

import { pagesConfig } from "../MyPage";

import { logout } from "../../../store/ducks/user/actionCreators";

import { DeviceContext } from "../../../App";
import { notificationsText } from "../../MySite/notificationTexts";

import { theme } from "../../../theme";

import { ReactComponent as PersonIcon } from "../icons/1.svg";
import { ReactComponent as MySiteIcon } from "../icons/2.svg";
import { ReactComponent as CashIcon } from "../icons/4.svg";
import { ReactComponent as MarketPlaceIcon } from "../icons/5.svg";
import { ReactComponent as HomeIcon } from "../icons/6.svg";
import { ReactComponent as ExitIcon } from "../icons/7.svg";
import { ReactComponent as SandwichIcon } from "./../icons/sandwichMenu.svg";
import { ReactComponent as SandwichCloseIcon } from "./../icons/sandwichMenuClose.svg";

import "./SandwichMenu.css";

export enum EActiveTabs {
  PROFILE,
  MY_SITE,
  MY_CARDS,
  MY_REQ,
  MARKETPLACE,
  SERVICE_ABOUT,
  LOGOUT,
}

interface IProps {
  setActiveTab: (tab: EActiveTabs) => void;
  activeTab: EActiveTabs;
}

const urlsWithoutLogo = ["/marketplace"];

const SandwichMenu = ({ setActiveTab, activeTab }: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const updateSidebar = (event: any) => {
    try {
      if (event.detail.isNewApplications) {
        setSideBarButtons(
          sideBarButtons.map((x) =>
            x.tab === EActiveTabs.MY_REQ ? { ...x, marked: true } : x
          )
        );
      }
    } catch {}
  };
  useEffect(() => {
    document.addEventListener("update-user-total-applications", updateSidebar);
    return () => {
      document.removeEventListener(
        "update-user-total-applications",
        updateSidebar
      );
    };
  }, []);

  const { windowHeight } = useContext(DeviceContext);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isToggleButtonDisabled, setIsToggleButtonDisabled] = useState(false);
  const toggleHamburgerOpen = () => {
    if (!isToggleButtonDisabled) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);

      setIsToggleButtonDisabled(true);
      if (!isMenuOpened) {
        setIsMenuOpened(!isMenuOpened);
        document
          .getElementById("hamburger-container")
          ?.classList.add("hamburger-opened");

        setTimeout(() => {
          setIsToggleButtonDisabled(false);
        }, 600);
      } else {
        document
          .getElementById("hamburger-container")
          ?.classList.remove("hamburger-opened");
        document
          .getElementById("hamburger-container")
          ?.classList.add("hamburger-closing");

        document.body.style.overflow = "unset";

        setTimeout(() => {
          document
            .getElementById("hamburger-container")
            ?.classList.remove("hamburger-closing");
          setIsToggleButtonDisabled(false);
          setIsMenuOpened(!isMenuOpened);
        }, 600);
      }
    }
  };

  const [sideBarButtons, setSideBarButtons] = useState<
    {
      icon: any;
      alt: string;
      text: string;
      tab: EActiveTabs;
      marked?: boolean;
      onClick?: () => void;
    }[]
  >([
    {
      icon: PersonIcon,
      alt: "person",
      text: "Профиль",
      tab: EActiveTabs.PROFILE,
    },
    {
      icon: MySiteIcon,
      alt: "my-site",
      text: "Мой сайт",
      tab: EActiveTabs.MY_SITE,
    },
    // {
    //   icon: MyCardsIcon,
    //   alt: "my-cards",
    //   text: "Мои визитки",
    //   tab: EActiveTabs.MY_CARDS,
    // },
    {
      icon: CashIcon,
      alt: "my-cards",
      text: "Мои заявки",
      tab: EActiveTabs.MY_REQ,
      // marked: true,
    },
    {
      icon: MarketPlaceIcon,
      alt: "my-cards",
      text: "Маркетплейс",
      tab: EActiveTabs.MARKETPLACE,
    },
    {
      icon: HomeIcon,
      alt: "my-about",
      text: "О сервисе",
      tab: EActiveTabs.SERVICE_ABOUT,
      onClick: () => {
        history.push("/");
      },
    },
    {
      icon: ExitIcon,
      alt: "my-exit",
      text: "Выход",
      tab: EActiveTabs.LOGOUT,
      onClick: () => {
        dispatch(logout());
        history.push("/");
        enqueueSnackbar(notificationsText.account.successLogout, {
          variant: "error",
        });
      },
    },
  ]);

  return (
    <Box marginBottom={3} id="hamburger-container">
      <Box
        textAlign="left"
        minWidth={260}
        height={43}
        id={
          urlsWithoutLogo.includes(window.location.pathname)
            ? "hamburger-logo-hidden"
            : ""
        }
        onClick={() => {
          history.push("/");
        }}
      >
        <img className="hamburger-logo" src="../assets/logo.svg" alt="logo" />
      </Box>

      <Button
        id="hamburger-toggle-button"
        onClick={toggleHamburgerOpen}
        style={{
          marginRight: -10,
        }}
      >
        <SvgIcon
          id="hamburger-button-menu"
          component={SandwichIcon}
          style={{ height: 44, width: 44 }}
          viewBox="0 0 44 44"
        />
        <SvgIcon
          id="hamburger-button-close"
          component={SandwichCloseIcon}
          style={{ height: 44, width: 44 }}
          viewBox="0 0 44 44"
        />
      </Button>

      {isMenuOpened ? (
        <Box className="hamburger-background">
          <List
            component="nav"
            style={{
              position: "relative",
              paddingTop: 126,
              height: windowHeight,
            }}
          >
            <Box className="hamburger-upper">
              {sideBarButtons.map((el, index) =>
                index <= 3 ? (
                  <>
                    <ListItem
                      button
                      key={index}
                      disableRipple
                      onClick={() => {
                        toggleHamburgerOpen();
                        setActiveTab(el.tab);
                        isFunction(el?.onClick) && el.onClick();
                        const elKey = pagesConfig.find(
                          (x) => x.key === el.tab
                        )?.path;
                        elKey && history.push(elKey);
                      }}
                      style={{ marginTop: 12, marginBottom: 12 }}
                    >
                      <ListItemIcon>
                        <el.icon
                          style={{
                            marginLeft: 18,
                            stroke:
                              activeTab === el.tab
                                ? "white"
                                : theme.palette.secondary.light,
                          }}
                        />
                      </ListItemIcon>
                      <Typography
                        style={{
                          fontSize: 18,
                          color:
                            activeTab === el.tab
                              ? "white"
                              : theme.palette.secondary.light,
                        }}
                      >
                        {el.text}
                      </Typography>
                      {el.marked && (
                        <div
                          style={{
                            position: "absolute",
                            right: 22,
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: "#EB5757",
                          }}
                        />
                      )}
                    </ListItem>
                  </>
                ) : null
              )}
            </Box>
            <Box className="hamburger-footer">
              <Box marginX={3}>
                <div
                  style={{
                    width: "100%",
                    height: 2,
                    backgroundColor: theme.palette.secondary.light,
                  }}
                />
              </Box>
              {sideBarButtons.map((el, index) =>
                index > 3 ? (
                  <>
                    <ListItem
                      button
                      key={index}
                      disableRipple
                      onClick={() => {
                        toggleHamburgerOpen();
                        setActiveTab(el.tab);
                        isFunction(el?.onClick) && el.onClick();
                        const elKey = pagesConfig.find(
                          (x) => x.key === el.tab
                        )?.path;
                        elKey && history.push(elKey);
                      }}
                      style={{ marginTop: 12, marginBottom: 12 }}
                    >
                      <ListItemIcon>
                        <el.icon
                          style={{
                            marginLeft: 18,
                            stroke:
                              activeTab === el.tab
                                ? "white"
                                : theme.palette.secondary.light,
                          }}
                        />
                      </ListItemIcon>
                      <Typography
                        style={{
                          fontSize: 18,
                          color:
                            activeTab === el.tab
                              ? "white"
                              : theme.palette.secondary.light,
                        }}
                      >
                        {el.text}
                      </Typography>
                      {el.marked && (
                        <div
                          style={{
                            position: "absolute",
                            right: 22,
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: "#EB5757",
                          }}
                        />
                      )}
                    </ListItem>
                  </>
                ) : null
              )}
            </Box>
          </List>
        </Box>
      ) : null}
    </Box>
  );
};

export default SandwichMenu;
