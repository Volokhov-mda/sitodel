import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";

import { DeviceContext } from "../../../App";

import "./FooterLogo.css";

const FooterLogo = () => {
  const { isPad } = useContext(DeviceContext);

  return (
    <Box
      marginTop={isPad ? 4 : 8}
      marginBottom={isPad ? 7 : 5}
      width="100%"
      textAlign="center"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          style={
            isPad
              ? {
                  marginRight: 7,
                  fontSize: 16,
                  fontWeight: 500,
                }
              : {
                  marginRight: 7,
                }
          }
        >
          Сделано в
        </Typography>
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img className="footerlogo-logo" src="./assets/logo.svg" alt="logo" />
        </Link>
      </div>
    </Box>
  );
};

export default FooterLogo;
