import { Box, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";

import { theme } from "../../../theme";
import { DeviceContext } from "../../../App";

interface IProps {
  title: string;
  text: string;
  Icon: any;
}

const MySiteContentSection = ({ title, text, Icon }: IProps) => {
  const { isMobile } = useContext(DeviceContext);

  return (
    <div style={isMobile ? { marginBottom: 25 } : { marginTop: 34 }}>
      <Grid container>
        <Grid item md={2} lg={1} xs={12}>
          <Box
            display="flex"
            alignItems="center"
          >
            <Box
              width={isMobile ? 34 : 60}
              height={isMobile ? 34 : 60}
              style={{
                flexShrink: 0,
                backgroundColor: theme.palette.primary.dark,
                borderRadius: 8,
                position: "relative",
                marginBottom: isMobile ? "unset" : 20,
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
                <Icon />
              </Box>
            </Box>
            {isMobile && (
              <Typography
                style={{
                  marginLeft: 6,
                  fontWeight: "bold",
                  fontSize: isMobile ? 16 : 24,
                  lineHeight: "120%",
                  color: theme.palette.primary.dark,
                }}
              >
                {title}
              </Typography>
            )}
          </Box>
          <Box>
          </Box>
        </Grid>
        <Grid item xs>
          {!isMobile && (
            <Typography
              style={{
                minWidth: 300,
                fontWeight: "bold",
                fontSize: isMobile ? 16 : 24,
                color: theme.palette.primary.dark,
              }}
            >
              {title}
            </Typography>
          )}
          <Typography
            style={{
              marginTop: 14,
              color: "#191E34",
              fontWeight: 500,
              fontSize: isMobile ? 14 : 20,
              lineHeight: "120%",
            }}
          >
            {text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MySiteContentSection;
