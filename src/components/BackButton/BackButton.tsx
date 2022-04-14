import { useContext } from "react";
import { useHistory } from "react-router";
import { Box, Typography } from "@material-ui/core";

import { DeviceContext } from "../../App";

import { arrow } from "../../UIconsts";

import Button from "../../styledComponents/Button";

interface IProps {
  isToHomePage?: boolean;
}

const BackButton = ({ isToHomePage }: IProps) => {
  const { isMobile } = useContext(DeviceContext);

  const history = useHistory();
  const goBackHandler = () => {
    isToHomePage ? history.push("/") : history.goBack();
  };

  return isMobile ? (
    <div />
  ) : (
    <Box position="fixed" left={32} top={24}>
      <Button
        style={{
          textTransform: "none",
          borderRadius: 30,
          backgroundColor: "#EAEEF3",
        }}
        variant="contained"
        disableElevation
        startIcon={
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(arrow)}`}
            alt="back"
            style={{ transform: "rotate(-180deg)" }}
          />
        }
        onClick={goBackHandler}
      >
        <Typography
          style={{ fontSize: 24, fontWeight: "bold", marginRight: 2 }}
          color="primary"
        >
          Назад
        </Typography>
      </Button>
    </Box>
  );
};

export default BackButton;
