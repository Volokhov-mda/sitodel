import { Dialog, Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { DeviceContext } from "../../../App";
import Button from "../../../styledComponents/Button";
import { theme } from "../../../theme";

const DeleteDialog = ({ isOpen, deleteHandler, closeHandler, cardId }: any) => {
  const { isMobile, isPad } = useContext(DeviceContext);

  return (
    <Dialog
      onClose={closeHandler}
      open={isOpen}
      fullWidth={isMobile ? false : true}
      maxWidth="sm"
      PaperProps={{
        style: { 
          borderRadius: 12,
          margin: isMobile ? 16 : 32,
        },
      }}
    >
      <Box paddingX={isMobile ? 2 : 3} paddingY={2} style={{ backgroundColor: "#FFF" }} textAlign={isMobile ? "center" : "unset"}>
        <Typography
          style={isMobile ? {
            color: theme.palette.secondary.dark,
            fontSize: 18,
          } : {}}
        >
          {isMobile ? (
            "Действительно удалить объявление?"
          ) : (
            "Ты действительно хочешь удалить карточку?"
          )}
        </Typography>
        <Box display={isMobile ? "flex" : (isPad ? "block" : "flex")} justifyContent="space-between" width={"100%"} marginTop={3}>
          <Box
            style={{
              width: isMobile ? 148 : (!isPad ? "50%" : "100%"),
            }}
            paddingRight={isPad ? 0 : 1}
            marginTop={1}
          >
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor: isMobile ? "rgba(98, 104, 112, .5)" : theme.palette.primary.dark, // theme.palette.secondary.main
              }}
              onClick={() => {
                deleteHandler(cardId || 0);
                closeHandler();
              }}
              variant="contained"
              disableElevation
            >
              <Typography style={{ color: "#fff", fontSize: isPad ? 14 : 24 }}>
                {isMobile ? "Да" : "Удалить"}
              </Typography>
            </Button>
          </Box>
          <Box
            style={{
              width: isMobile ? 148 : (!isPad ? "50%" : "100%"),
            }}
            marginTop={1}
            paddingLeft={isPad ? 0 : 1}
          >
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor: isMobile ? theme.palette.primary.dark : theme.palette.primary.light,
              }}
              onClick={closeHandler}
              variant="contained"
              disableElevation
            >
              <Typography
                style={{ color: isMobile ? "#fff" : "#626870", fontSize: isPad ? 14 : 24 }}
              >
                {isMobile ? "Нет" : "Отменить"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
