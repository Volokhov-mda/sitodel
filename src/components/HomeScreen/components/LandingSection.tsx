import { Box, Container, Grid, GridSize, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { DeviceContext } from "../../../App";

interface IProps {
  headline: string;
  text: string;
  children: React.ReactNode;
  leftPartW?: GridSize;
  rightPartW?: GridSize;
  isLeftText?: boolean;
  paddingLeft?: number;
  paddingRight?: number;
}

const LandingSection = ({
  headline,
  text,
  children,
  leftPartW = 6,
  rightPartW = 6,
  isLeftText = true,
  paddingLeft = 0,
  paddingRight = 0,
}: IProps) => {
  const { isMobile } = useContext(DeviceContext);

  const content = (val: boolean) =>
    val ? (
      <Box textAlign={isLeftText ? "left" : "right"}>
        <Typography
          variant="h4"
          style={{
            fontSize: isMobile ? 16 : 48,
            fontWeight: "bold",
            whiteSpace: "pre-line",
            // color: isLeftText ? "#FFFFFF" : "#191E34",
            color:  "#FFFFFF",
          }}
        >
          {headline}
        </Typography>
        <Typography
          variant="subtitle2"
          style={{
            fontSize: isMobile ? 14 : 30,
            fontWeight: 300,
            // color: isLeftText ? "#FFFFFF" : "#191E34",
            color:  "#FFFFFF",
            marginTop: isMobile ? 8 : 0,
          }}
        >
          {text}
        </Typography>
      </Box>
    ) : (
      <>{children} </>
    );
  return (
    <Box
      minHeight={!isMobile ? 300 : 150}
      style={{
        // backgroundColor: isLeftText ? "initial" : "#FFF",
        backgroundColor: "initial" ,
      }}
    >
      <Container
        style={{
          paddingTop: isMobile ? 27 : 200,
          paddingBottom: isMobile ? 27 : 200,
          maxWidth: isMobile ? 260 + 27 * 2 : ""
        }}
      >
        <Box 
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
        >
          <Grid container spacing={0}>
            <Grid item lg={leftPartW} md={7} xs={12}>
              {/* If isMobile, image first */}
              {content(isMobile ? false : isLeftText)}
            </Grid>
            <Grid item lg={rightPartW} md={4} xs={12}>
              {/* If isMobile, text second */}
              {content(isMobile ? true : !isLeftText)}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingSection;
