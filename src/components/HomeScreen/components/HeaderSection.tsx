import { Container, Typography, Box, Hidden } from "@material-ui/core";
import React, { useContext } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { DeviceContext } from "../../../App";
import CreateAccoutButton from "./CreateAccoutButton";
import LandingSection from "./LandingSection";
import TopNavbar from "./TopNavbar";

const HeaderSection = () => {
  const { isMobile, windowHeight } = useContext(DeviceContext);

  const MainInfo = () => {
    return (
      <header
        style={{
          textAlign: "center",
          width: "100%",
          marginTop: isMobile ? 0 : 100,
          paddingTop: isMobile ? "calc(" + windowHeight + "px * 205/655)" : 0,
        }}
      >
        <Typography
          variant="h1"
          style={{
            fontWeight: "bold",
            color: "#FFF",
            marginTop: isMobile ? 22 : 130,
            fontSize: isMobile ? 28 : 90,
            lineHeight: isMobile ? "102.2%" : "100%",
          }}
        >
          Генерация <br /> страниц-каталогов <br /> для самозанятых
        </Typography>
        <Box marginTop={11}>
          {!isMobile ? <CreateAccoutButton /> : null}
        </Box>

        <Box 
          marginTop={isMobile ? 0 : 8} 
          marginBottom={isMobile ? 0 : 5} 
          width="100%" 
          textAlign="center"
          style={{
            position: isMobile ? "absolute" : "unset",
            top: isMobile ? windowHeight - 24 - 25 : "unset",
            left: isMobile ? "50%" : "unset",
            transform: isMobile ? "translateX(-50%)" : "unset",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: isMobile ? 0 : 94,
            }}
          >
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                color: "#FFF",
                fontSize: isMobile ? 14 : 24,
                marginRight: 12,
              }}
            >
              Что это такое?
            </Typography>
            <img src="./assets/bottomArrow.svg" alt="bottom-arrow" />
          </div>
        </Box>
      </header>
    );
  }

  return (
    <>
      <TopNavbar />
      <Container style={{ height: isMobile ? windowHeight : "unset", }}>
        <MainInfo />
      </Container>

      <LandingSection
        headline={`Свой сайт
        за 5 простых действий`}
        text="Даже если ты не программист"
        // isLeftText={isMobile ? false : true}
        paddingLeft={isMobile ? 1.375 : 0}
        paddingRight={isMobile ? 1.375 : 0}
      >
        <Box position="relative">
          <Hidden mdUp>
            <Box
              marginBottom={.75}
              height={100}
            >
              <Box position="absolute" style={{ right: 0, top: 33 }}>
                <img src="./assets/mobile/site-v-mobile.png" alt="site-v" width={97} style={{ filter: "drop-shadow(10px 10px 100px rgba(0, 0, 0, 0.25))" }} />
              </Box>
              <Box position="absolute" style={{ right: 58, top: 0 }}>
                <img src="./assets/mobile/site-p-mobile.png" alt="site-p" width={97} style={{ filter: "drop-shadow(10px 10px 100px rgba(0, 0, 0, 0.25))" }} />
              </Box>
            </Box>
          </Hidden>
          <Hidden smDown lgUp>
            <Box style={{ transform: "scale(0.7,0.7)" }}>
              <Box position="absolute" style={{ right: 0, top: 0 }}>
                <img src="./assets/site-v.png" alt="site-v" />
              </Box>
              <Box position="absolute" style={{ right: 80, top: -160 }}>
                <img src="./assets/site-p.png" alt="site-p" />
              </Box>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box position="absolute" style={{ right: 0, top: 0 }}>
              <ScrollAnimation animateOnce animateIn="fadeIn" duration={4}>
                <img src="./assets/site-v.png" alt="site-v" />
              </ScrollAnimation>
            </Box>
            <Box position="absolute" style={{ right: 80, top: -160 }}>
              <ScrollAnimation animateOnce animateIn="fadeIn">
                <img src="./assets/site-p.png" alt="site-p" />
              </ScrollAnimation>
            </Box>
          </Hidden>
        </Box>
      </LandingSection>
    </>
  );
};

export default HeaderSection;
