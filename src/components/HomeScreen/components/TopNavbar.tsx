import { Box, Container, Hidden } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import CreateAccoutButton from "./CreateAccoutButton";
import TopNavbarMenuItem from "./TopNavbarMenuItem";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserLoaded } from "../../../store/ducks/user/selectors";
import { logout } from "../../../store/ducks/user/actionCreators";
import clsx from "clsx";
import { DeviceContext } from "../../../App";

import "./TopNavbar.css";
import { throttle } from "lodash";

const TopNavbar = () => {
  const { isMobile } = useContext(DeviceContext);

  const isAuthed = useSelector(selectIsUserLoaded);
  // const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const history = useHistory();
  const isUserLoaded = useSelector(selectIsUserLoaded);
  const loginRedirectHandler = () => {
    history.push("/login");
  };

  const [showHeaderMobile, setShowHeaderMobile] = React.useState(true);

  useEffect(() => {
    const threshold = 10;
    const maxSxrollY =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      if (scrollY <= threshold) {
        if (!showHeaderMobile) {
          setShowHeaderMobile(true);
        }
        ticking = false;
        return;
      }

      if (scrollY >= maxSxrollY - threshold) {
        if (showHeaderMobile) {
          setShowHeaderMobile(false);
        }
        ticking = false;
        return;
      }

      if (
        (scrollY > lastScrollY && !showHeaderMobile) ||
        (scrollY <= lastScrollY && showHeaderMobile)
      ) {
        ticking = false;
        lastScrollY = scrollY > 0 ? scrollY : 0;
        return;
      }

      setShowHeaderMobile(scrollY > lastScrollY ? false : true);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = throttle(() => {
      if (isMobile && !ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    }, 250);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [showHeaderMobile]);

  const topMenuTabs = React.useCallback<
    () => { text: string; onClick?: () => void; isPrivate?: boolean }[]
  >(
    () => [
      {
        text: "Маркетплейс",
        onClick: () => history.push("/marketplace"),
        isPrivate: false,
      },
      {
        text: "Личный кабинет",
        onClick: () => history.push("/me"),
        isPrivate: true,
      },
    ],
    [history]
  );

  // const openDrawerHandler = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Container
      className={clsx(
        isMobile && "header-mobile",
        showHeaderMobile ? "showed" : "hidden"
      )}
      maxWidth="xl"
    >
      <Hidden smDown>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <img src="../assets/logo.svg" alt="logo" className="header-logo" />
            {topMenuTabs().map((x, index) => {
              if (!x.isPrivate || isAuthed) {
                return <TopNavbarMenuItem {...x} key={index} />;
              }
              return <div />;
            })}
          </Box>
          <Box display="flex">
            {!isUserLoaded ? (
              <>
                <TopNavbarMenuItem
                  text="Войти"
                  onClick={loginRedirectHandler}
                />
                {!isMobile ? (
                  <Box style={{ marginTop: 18 }} marginLeft={3}>
                    <CreateAccoutButton isSmall />
                  </Box>
                ) : null}
              </>
            ) : (
              <>
                <TopNavbarMenuItem text="Выйти" onClick={logoutHandler} />
              </>
            )}
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{
            width: "100%",
          }}
        >
          <img
            src="../assets/logo.svg"
            alt="logo"
            style={{
              marginRight: 33,
              width: 106,
              height: 68,
            }}
            className="header-logo"
          />
          <Box display="flex">
            {topMenuTabs().map((x, index) => {
              if (!x.isPrivate || isAuthed) {
                return (
                  <TopNavbarMenuItem
                    {...x}
                    key={index}
                    fontSize={16}
                    marginY={2}
                  />
                );
              }
              return <div />;
            })}
            {!isUserLoaded ? (
              <TopNavbarMenuItem
                text="Войти"
                onClick={loginRedirectHandler}
                fontSize={16}
                marginY={2}
              />
            ) : (
              <>
                <TopNavbarMenuItem
                  text="Выйти"
                  onClick={logoutHandler}
                  fontSize={16}
                  marginY={2}
                />
              </>
            )}
          </Box>
        </Box>
      </Hidden>
    </Container>
  );
};

export default TopNavbar;
