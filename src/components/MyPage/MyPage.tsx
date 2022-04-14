import { Box, Container, LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { DeviceContext } from "../../App";
import Marketplace from "../../Marketplace/Marketplace";
import {
  selectIsUserError,
  selectIsUserLoaded,
  selectIsUserLoading,
  selectIsUserNever,
} from "../../store/ducks/user/selectors";
import ErrorPage from "../ErrorPage/ErrorPage";
import HomeScreen from "../HomeScreen/HomeScreen";
import MyApplications from "../MyApplications/MyApplications";
import MyPageContent from "../MyPageContent/MyPageContent";
import MySiteContent from "../MyPageContent/MySiteContent";
import Sidebar, { EActiveTabs } from "./components/Sidebar";
import SandwichMenu from "./components/SandwichMenu";

export const pagesConfig = [
  {
    key: EActiveTabs.PROFILE,
    path: "/me",
  },
  {
    key: EActiveTabs.MY_SITE,
    path: "/my-site",
  },
  {
    key: EActiveTabs.MY_CARDS,
    path: "/my-cards",
  },
  {
    key: EActiveTabs.MY_REQ,
    path: "/my-requests",
  },
  {
    key: EActiveTabs.SERVICE_ABOUT,
    // path: "/about-us",
  },
  {
    key: EActiveTabs.MARKETPLACE,
    path: "/marketplace",
  },
  {
    key: EActiveTabs.LOGOUT,
    path: "/",
  },
];

const MyPage = () => {
  const { isMobile } = useContext(DeviceContext);
  const isAuthed = useSelector(selectIsUserLoaded);
  const isAuthError = useSelector(selectIsUserError);
  const isAuthNever = useSelector(selectIsUserNever);
  const isAuthLoading = useSelector(selectIsUserLoading);
  const [activeTab, setActiveTab] = React.useState<EActiveTabs | undefined>();
  // EActiveTabs.PROFILE
  const { tab } = useParams<{ tab?: string }>();
  const pathname = useLocation().pathname;
  React.useEffect(() => {
    setActiveTab(
      pagesConfig.find((x) => x.path && pathname.includes(x.path))?.key
    );
  }, [pathname]);
  if (activeTab === undefined) {
    return <div />;
  }
  if (activeTab !== EActiveTabs.MARKETPLACE && (isAuthError || isAuthNever)) {
    return <ErrorPage code={"403"} targetUrl={pathname} />;
  }
  if (isAuthLoading) {
    return <LinearProgress />;
  }
  if (activeTab === EActiveTabs.MARKETPLACE && !isAuthed) {
    return (
      <Container maxWidth="lg">
        <Box marginTop={4}>
          <Marketplace />
        </Box>
      </Container>
    );
  }
  return (
    <Container maxWidth="xl" style={{ position: "relative" }}>
      <Box
        marginTop={isMobile ? 2 : 3}
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <Box textAlign="right">
          {activeTab !== undefined &&
            (isMobile ? (
              <SandwichMenu {...{ setActiveTab, activeTab }} />
            ) : (
              <Sidebar {...{ setActiveTab, activeTab }} />
            ))}
        </Box>
        {activeTab === EActiveTabs.PROFILE && (
          <MyPageContent tab={tab?.toString() || "0"} />
        )}
        {activeTab === EActiveTabs.MY_SITE && (
          <MySiteContent tab={tab?.toString() || "0"} />
        )}
        {activeTab === EActiveTabs.MARKETPLACE && <Marketplace />}
        {activeTab === EActiveTabs.MY_REQ && <MyApplications />}
      </Box>
    </Container>
  );
};

export default MyPage;
