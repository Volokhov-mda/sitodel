import { Box, Container, Typography } from "@material-ui/core";
import React, { ChangeEvent, useContext } from "react";
import { FilledTextInput, FilledTextInputMobile } from "../../../styledComponents/FilledTextInput/FilledTextInput";
import { theme } from "../../../theme";
import { IPriceModel } from "../../PriceCard/Models";
import Button from "../../../styledComponents/Button";
import { DeviceContext } from "../../../App";

interface IProps extends IPriceModel {
  onSave: (card: IPriceModel, isEdit: boolean) => void;
  onCancel: () => void;
  isEdit?: boolean;
  isLoading?: boolean;
}
const PriceDialogContent = ({
  name,
  price,
  description,
  onSave,
  onCancel,
  isEdit = true,
  isLoading = false,
  id,
}: IProps) => {
  const { isMobile } = useContext(DeviceContext);
  const [editingCard, setEditingCard] = React.useState({
    name,
    price,
    description,
    id: id || 0,
  });
  const editInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingCard({ ...editingCard, [event.target.name]: event.target.value });
  };
  return (
    <Container
      style={{
        backgroundColor: "#FFF",
        borderRadius: 12,
      }}
    >
      <Box paddingY={isMobile ? 1 : 4} paddingX={isMobile ? 0 : 4} width={"100%"}>
        {isMobile ?
          <Box textAlign="center">
            <Typography
              style={{
                color: "#191E34",
                paddingTop: 16,
                paddingBottom: 24,
                fontSize: 18,
              }}
            >
              Создать объявление
            </Typography>
          </Box>
          : null
        }

        <Box textAlign="left">
          {isMobile ? (
            <FilledTextInputMobile
              onChange={editInputHandler}
              variant="filled"
              multiline
              value={editingCard.name}
              name="name"
              fullWidth
              label="Название"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <FilledTextInput
              onChange={editInputHandler}
              variant="filled"
              multiline
              value={editingCard.name}
              name="name"
              fullWidth
              label="Название"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )
          }
        </Box>
        <Box textAlign="left" marginTop={3}>
          {isMobile ? (
            <FilledTextInputMobile
              onChange={editInputHandler}
              variant="filled"
              multiline
              value={editingCard.price}
              name="price"
              fullWidth
              label="Цена"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <FilledTextInput
              onChange={editInputHandler}
              variant="filled"
              multiline
              value={editingCard.price}
              name="price"
              fullWidth
              label="Цена"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )
          }
        </Box>
        <Box textAlign="left" marginTop={3}>
          {isMobile ? (
            <FilledTextInputMobile
              onChange={editInputHandler}
              variant="filled"
              value={editingCard.description}
              name="description"
              fullWidth
              label="Описание"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
            />
          ) : (
            <FilledTextInput
              onChange={editInputHandler}
              variant="filled"
              value={editingCard.description}
              name="description"
              fullWidth
              label="Описание"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
            />
          )
          }
        </Box>
        <Box display={isMobile ? "block" : "flex"} width={"100%"} marginTop={3}>
          <Box
            style={{
              width: !isMobile ? "50%" : "100%",
            }}
            paddingRight={isMobile ? 0 : 1}
            marginTop={1}
          >
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor: isLoading
                  ? theme.palette.secondary.main
                  : theme.palette.primary.dark,
              }}
              onClick={() => {
                onSave(editingCard, !!isEdit);
              }}
              variant="contained"
              disableElevation
              disabled={isLoading}
            >
              <Typography
                style={{ color: "#FFF", fontSize: isMobile ? 14 : 24 }}
              >
                Сохранить
              </Typography>
            </Button>
          </Box>
          <Box
            style={{
              width: !isMobile ? "50%" : "100%",
            }}
            paddingLeft={isMobile ? 0 : 1}
            marginTop={isMobile ? 0 : 1}
          >
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor: isMobile ? "transparent" : theme.palette.primary.light,
              }}
              onClick={onCancel}
              variant="contained"
              disabled={isLoading}
              disableElevation
            >
              <Typography
                style={{ color: "#626870", fontSize: isMobile ? 14 : 24 }}
              >
                Отменить
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PriceDialogContent;
