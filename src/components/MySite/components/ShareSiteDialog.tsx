import { Box, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";

import { DeviceContext } from "../../../App";
import { notificationsText } from "../notificationTexts";

import Button from "../../../styledComponents/Button";
import { theme } from "../../../theme";

const ShareSiteDialog = ({ href }: any) => {
  const { isMobile } = useContext(DeviceContext);
  const { enqueueSnackbar } = useSnackbar();

  const copy = () => {
    navigator.clipboard
      .writeText(href)
      .then(() => {
        enqueueSnackbar(notificationsText.defaultAlerts.linkCopied, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(notificationsText.defaultAlerts.linkCopied, {
          variant: "error",
        });
      });
  };
  return (
    <Box paddingX={isMobile ? 2 : 3} paddingY={3} style={{ backgroundColor: "#FFF" }}>
      <Typography
        style={{
          fontWeight: 700,
          fontSize: isMobile ? 16 : 24,
          paddingBottom: isMobile ? 6 : 24,
          color: "#191E34",
        }}
      >
        Ссылка на твой сайт
      </Typography>
      <Box
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        marginBottom={isMobile && 1}
      >
        <Typography
          style={isMobile ? {
            width: "100%",
            // minHeight: 61,
            fontSize: 14,
            maxWidth: "unset",
            padding: "12px",
          } : {}}
          className="site-share-href-text"
        >
          {href}
        </Typography>
        </Box>
        {isMobile ? (
          <Button
            tabIndex={13}
            style={{
              display: "block",
              width: isMobile ? "100%" : "unset",
              textTransform: "none",
              borderRadius: 12,
              minHeight: 61,
              backgroundColor: theme.palette.primary.dark,
              zIndex: 1,
            }}
            fullWidth={isMobile}
            variant="contained"
            disableElevation
            onClick={copy}
          >
            <Typography style={{ color: "#FFF", fontSize: isMobile ? 16 : 24 }}>
              Скопировать
            </Typography>
          </Button>
        ) : (
          <div
            onClick={copy}
            style={{
              display: "flex",
              height: 52,
              width: 52,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#5862EE",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
    </Box>
  );
};

export default ShareSiteDialog;
