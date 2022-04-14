import { Box, Grid } from "@material-ui/core";
import { useContext } from "react";

import { DeviceContext } from "../../App";

import BackButton from "../BackButton/BackButton";
import RegForm from "./components/RegForm";
import RegHeader from "./components/RegHeader";

const RegistrationScreen = () => {
  const { isMobile } = useContext(DeviceContext);

  return (
    <>
      <BackButton isToHomePage />
      <Grid container justify="center">
        <Box marginTop={isMobile ? 5 : 12} width={isMobile ? "100%" : "unset"}>
          <RegHeader />
          <RegForm />
        </Box>
      </Grid>
    </>
  );
};

export default RegistrationScreen;
