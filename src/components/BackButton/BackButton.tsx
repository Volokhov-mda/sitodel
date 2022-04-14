import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { isMobile } from "../../device";
import Button from "../../styledComponents/Button";
import { arrow } from "../../UIconsts";
interface IProps {
  isToHomePage?: boolean;
}
const BackButton = ({ isToHomePage }: IProps) => {
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
