import { useContext } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Box, Hidden } from "@material-ui/core";

import { DeviceContext } from "../../App";

import { theme } from "../../theme";

import LandingSection from "./components/LandingSection";
import CreateAccoutButton from "./components/CreateAccoutButton";
import HeaderSection from "./components/HeaderSection";
import ParallaxWrapper from "./components/ParallaxWrapper";

const LandingBlock = () => {
  const { isMobile } = useContext<any>(DeviceContext);

  return (
    <Box paddingTop={isMobile ? 1 : 0} paddingBottom={isMobile ? 27.75 : 0}>
      <LandingSection
        headline={`Удобный учёт клиентов,
        платежей, заявок`}
        text="Даже если ты не бухгалтер"
        leftPartW={4}
        rightPartW={8}
        isLeftText={false}
        paddingLeft={isMobile ? 1.25 : 0}
        paddingRight={isMobile ? 3.25 : 0}
      >
        <Box position="relative">
          <Hidden smUp>
            <Box marginBottom={3} height={78}>
              <Box position="absolute" style={{ left: 0, top: 38 }}>
                <img
                  src="./assets/mobile/accounting-minus-mobile.png"
                  alt="accounting-minus"
                  width={111}
                />
              </Box>
              <Box position="absolute" style={{ left: 27, top: 0 }}>
                <img
                  src="./assets/mobile/accounting-plus-mobile.png"
                  alt="accounting-plus"
                  width={131}
                  style={{
                    filter: "drop-shadow(4px 4px 40px rgba(0, 0, 0, 0.25))",
                  }}
                />
              </Box>
            </Box>
          </Hidden>
          <Hidden xsDown mdUp>
            <Box textAlign="right" marginTop={5}>
              <img src="./assets/plus.png" alt="plus" />
            </Box>
          </Hidden>
          <Hidden smDown xlUp>
            <Box position="absolute" style={{ right: 0, top: -20 }}>
              <ScrollAnimation animateOnce animateIn="fadeIn">
                <img src="./assets/plus.png" width={400} alt="plus" />
              </ScrollAnimation>
            </Box>
          </Hidden>
          <Hidden lgDown>
            <Box position="absolute" style={{ right: 0, top: -20 }}>
              <ScrollAnimation animateOnce animateIn="fadeIn">
                <img src="./assets/plus.png" alt="plus" />
              </ScrollAnimation>
            </Box>
          </Hidden>
        </Box>
      </LandingSection>
      <LandingSection
        headline={`Поток клиентов
        с нашего маркетплейса`}
        text="Даже если ты не маркетолог"
        leftPartW={8}
        rightPartW={4}
        paddingLeft={isMobile ? 3.75 : 0}
        paddingRight={isMobile ? 3.25 : 0}
        // isLeftText={false}
      >
        <Box position="relative" marginBottom={3}>
          <Hidden smUp>
            <Box textAlign="right" style={{ width: "100%" }}>
              <svg
                width="97"
                viewBox="0 0 301 367"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="141"
                  width="138"
                  height="85"
                  rx="12"
                  fill="white"
                  fill-opacity="0.8"
                />
                <rect x="162" width="139" height="170" rx="12" fill="#BCC1FF" />
                <rect width="138" height="117" rx="12" fill="#878FFA" />
                <rect
                  x="162"
                  y="194"
                  width="139"
                  height="117"
                  rx="12"
                  fill="#878FFA"
                />
                <rect y="250" width="138" height="117" rx="12" fill="#878FFA" />
              </svg>
            </Box>
          </Hidden>
          <Hidden xsDown mdUp>
            <Box style={{ transform: "scale(0.8,0.8)" }}>
              <svg
                width="301"
                height="367"
                viewBox="0 0 301 367"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="141"
                  width="138"
                  height="85"
                  rx="12"
                  fill="white"
                  fill-opacity="0.8"
                />
                <rect x="162" width="139" height="170" rx="12" fill="#BCC1FF" />
                <rect width="138" height="117" rx="12" fill="#878FFA" />
                <rect
                  x="162"
                  y="194"
                  width="139"
                  height="117"
                  rx="12"
                  fill="#878FFA"
                />
                <rect y="250" width="138" height="117" rx="12" fill="#878FFA" />
              </svg>
            </Box>
          </Hidden>
          <Hidden smDown>
            <Box position="absolute" style={{ left: 0, top: -80 }}>
              <ScrollAnimation animateOnce animateIn="fadeIn" duration={3}>
                <svg
                  width="301"
                  height="367"
                  viewBox="0 0 301 367"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="141"
                    width="138"
                    height="85"
                    rx="12"
                    fill="white"
                    fill-opacity="0.8"
                  />
                  <rect
                    x="162"
                    width="139"
                    height="170"
                    rx="12"
                    fill="#BCC1FF"
                  />
                  <rect width="138" height="117" rx="12" fill="#878FFA" />
                  <rect
                    x="162"
                    y="194"
                    width="139"
                    height="117"
                    rx="12"
                    fill="#878FFA"
                  />
                  <rect
                    y="250"
                    width="138"
                    height="117"
                    rx="12"
                    fill="#878FFA"
                  />
                </svg>
              </ScrollAnimation>
            </Box>
          </Hidden>
        </Box>
      </LandingSection>
    </Box>
  );
};

const HomeScreen = () => {
  const { isMobile } = useContext<any>(DeviceContext);

  return (
    <div style={{ backgroundColor: theme.palette.primary.main }}>
      <ParallaxWrapper>
        <HeaderSection />
      </ParallaxWrapper>
      <LandingBlock />
      <Box
        marginTop={11}
        paddingBottom={!isMobile ? 7 : 0}
        textAlign="center"
        style={{
          position: isMobile ? "fixed" : "unset",
          bottom: isMobile ? "61px" : "unset",
          width: isMobile ? "100%" : "unset",
        }}
      >
        <CreateAccoutButton />
      </Box>
    </div>
  );
};

export default HomeScreen;
