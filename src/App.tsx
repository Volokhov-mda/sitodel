import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySiteApi } from "./api/mySiteApi";
import PageContent from "./components/PageContent/PageContent";
import useWindowSize from "./hooks/useWindowSize";
import { refreshTokens } from "./store/ducks/user/actionCreators";
import { selectIsUserLoaded } from "./store/ducks/user/selectors";

export const MySiteContext = React.createContext({
  mySiteData: undefined,
  setMySiteData: (v: any) => {},
});

export const DeviceContext = React.createContext({
  isMobile: !(document.documentElement.clientWidth > 500),
  isPad: !(document.documentElement.clientWidth > 800),
  isDesktop: !(document.documentElement.clientWidth > 1440),
  windowHeight: document.documentElement.clientHeight,
});

function App() {
  const { windowWidth, windowHeight } = useWindowSize();

  const [mySiteData, setMySiteData] = useState<any>(undefined);
  const [isPreloaderShown, setIsPreloaderShown] = React.useState(true);
  const [currDevice, setCurrDevice] = useState({
    isMobile: !(windowWidth > 500),
    isPad: !(windowWidth > 800),
    isDesktop: !(windowWidth > 1440),
    windowHeight: windowHeight,
  });

  const dispatch = useDispatch();
  const isUserLoaded = useSelector(selectIsUserLoaded);
  const refreshSite = async () => {
    try {
      const resp = await mySiteApi.getMySite();
      await mySiteApi.getApplications();
      if (resp?.name) {
        setMySiteData(resp);
      } else {
        setMySiteData(null);
      }
      console.error(resp);
    } catch {}
  };

  useEffect(() => {
    isUserLoaded && refreshSite();
  }, [isUserLoaded]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    let refreshInterval: NodeJS.Timeout;
    if (accessToken && refreshToken) {
      dispatch(refreshTokens({ accessToken, refreshToken }));
      refreshInterval = setInterval(() => {
        dispatch(refreshTokens({ accessToken, refreshToken }));
      }, 59 * 60 * 1000);
    }

    setTimeout(() => {
      setIsPreloaderShown(false);
    }, 1000);
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  useEffect(() => {
    const newCurrDevice = {
      isMobile: !(windowWidth > 500),
      isPad: !(windowWidth > 800),
      isDesktop: !(windowWidth > 1440),
      windowHeight: windowHeight,
    };

    if (
      newCurrDevice.isMobile === currDevice.isMobile &&
      newCurrDevice.isPad === currDevice.isPad &&
      newCurrDevice.isDesktop === currDevice.isDesktop &&
      newCurrDevice.windowHeight === currDevice.windowHeight
    ) {
      return;
    }

    setCurrDevice(newCurrDevice);
  }, [windowWidth]);

  if (isPreloaderShown) {
    return <LinearProgress />;
  }

  return (
    <MySiteContext.Provider value={{ mySiteData, setMySiteData }}>
      <DeviceContext.Provider value={currDevice}>
        <PageContent />
      </DeviceContext.Provider>
    </MySiteContext.Provider>
  );
}

export default App;
