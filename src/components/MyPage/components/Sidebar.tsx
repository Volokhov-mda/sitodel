import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { isFunction } from "lodash";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../../store/ducks/user/actionCreators";
import { theme } from "../../../theme";
import { notificationsText } from "../../MySite/notificationTexts";
import { ReactComponent as PersonIcon } from "../icons/1.svg";
import { ReactComponent as MySiteIcon } from "../icons/2.svg";
import { ReactComponent as MyCardsIcon } from "../icons/3.svg";
import { ReactComponent as CashIcon } from "../icons/4.svg";
import { ReactComponent as MarketPlaceIcon } from "../icons/5.svg";
import { ReactComponent as HomeIcon } from "../icons/6.svg";
import { ReactComponent as ExitIcon } from "../icons/7.svg";
import { pagesConfig } from "../MyPage";

import "./Sidebar.css"

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
const Sidebar = ({ setActiveTab, activeTab }: IProps) => {
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
    <>
      <Box
        textAlign="center"
        minWidth={260}
        onClick={() => {
          history.push("/");
        }}
        className="sidebar-logo-container"
      >
        <img src="../assets/logo.svg" className="sidebar-logo" alt="logo" />
      </Box>
      <Box textAlign="center" minWidth={260} position="sticky" top={40}>
        <List component="nav" className="sidebar">
          {sideBarButtons.map((el, index) => (
            <>
              <ListItem
                button
                key={index}
                disableRipple
                onClick={() => {
                  setActiveTab(el.tab);
                  isFunction(el?.onClick) && el.onClick();
                  const elKey = pagesConfig.find((x) => x.key === el.tab)?.path;
                  elKey && history.push(elKey);
                }}
                style={{ marginTop: 12, marginBottom: 12 }}
              >
                <ListItemIcon>
                  <el.icon
                    style={{
                      marginLeft: 12,
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
              {index === 4 ? (
                <Box marginX={3}>
                  <div
                    style={{
                      width: "100%",
                      height: 2,
                      backgroundColor: theme.palette.secondary.light,
                    }}
                  />
                </Box>
              ) : undefined}
            </>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
