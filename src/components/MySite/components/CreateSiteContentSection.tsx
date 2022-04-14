import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router";

import { theme } from "../../../theme";
import { DeviceContext } from "../../../App";

interface IProps {
  title: string;
  text: string;
  linkedText?: string;
  linkPath?: string;
  isObligatory?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const CreateSiteContentSection = ({
  isObligatory,
  title,
  linkedText,
  linkPath,
  text,
  children,
  isLoading,
}: IProps) => {
  const { isMobile } = useContext(DeviceContext);
  const history = useHistory();
  return (
    <div style={isMobile ? { marginBottom: 24 } : { marginTop: 34 }}>
      {isLoading ? (
        <Box marginBottom="10px">
          <Skeleton width="40%" height="30px" />
        </Box>
      ) : (
        <Typography
          style={{
            minWidth: 300,
            fontWeight: "bold",
            fontSize: isMobile ? 16 : 24,
            color: theme.palette.secondary.dark,
          }}
        >
          {title}
          {linkedText && (
            <span
              style={{
                cursor: linkPath ? "pointer" : "auto",
                color: theme.palette.primary.dark,
              }}
              onClick={() => {
                linkPath && history.push(linkPath);
              }}
            >
              {linkedText}
            </span>
          )}
          {isObligatory && <span style={{ color: "#FF5757" }}>{" *"}</span>}
        </Typography>
      )}
      {isLoading ? (
        <Skeleton width="90%" height="60px" />
      ) : (
        <Typography
          style={{
            marginTop: isMobile ? 6 : 10,
            fontWeight: 500,
            fontSize: isMobile ? 14 : 24,
            lineHeight: "120%",
            whiteSpace: "pre-line",
            color: theme.palette.secondary.dark,
          }}
        >
          {text}
        </Typography>
      )}
      {isLoading ? (
        children ? (
          <Box marginY={3}>
            <Skeleton width="80%" height="200px" />
          </Box>
        ) : (
          ""
        )
      ) : (
        children
      )}
    </div>
  );
};

export default CreateSiteContentSection;
