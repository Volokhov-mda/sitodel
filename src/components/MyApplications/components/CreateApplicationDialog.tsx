import InputMask from "react-input-mask";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useContext } from "react";

import Button from "../../../styledComponents/Button";
import {
  FilledTextInput,
  FilledTextInputBase,
  FilledTextInputBaseMobile,
  FilledTextInputMobile,
  OutlinedTextInputBase,
} from "../../../styledComponents/FilledTextInput/FilledTextInput";

import { theme } from "../../../theme";
import { DeviceContext } from "../../../App";

import { IApplication } from "../MyApplications";
import ChervonIcon from "../../ChervonIcon/ChevronIcon";

interface IProps {
  onSave: (data: IApplication) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CreateApplicationDialog = ({ onSave, isLoading, onCancel }: IProps) => {
  const { isMobile, isPad } = useContext(DeviceContext);

  const [editingCard, setEditingCard] = React.useState<IApplication>({
    name: "",
    contact: "",
    status: "Новая",
    comment: "",
    id: 0,
  });
  const editInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingCard({ ...editingCard, [event.target.name]: event.target.value });
  };

  const FilledTextInputDevice = isMobile ? FilledTextInputMobile : FilledTextInput;
  const FilledTextInputBaseDevice = isMobile ? FilledTextInputBaseMobile : FilledTextInputBase;

  return (
    <Container
      style={{
        backgroundColor: "#FFF",
        borderRadius: 12,
      }}
    >
      <Box paddingX={isMobile ? 0 : 4} paddingTop={isMobile ? 3 : 4} paddingBottom={isMobile ? 0 : 4} width={"100%"}>
        <FilledTextInputDevice
          onChange={editInputHandler}
          variant="filled"
          value={editingCard.name}
          name="name"
          fullWidth
          label="Имя"
          placeholder="Иван Фролов"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box
          display={isMobile ? "block" : "flex"}
          marginY={isMobile ? 3 : 2}
          style={{ justifyContent: "space-between" }}
        >
          <InputMask
            mask="+7 (999) 999-99-99"
            value={editingCard.contact}
            disabled={false}
            onChange={editInputHandler}
            alwaysShowMask
          >
            {() => (
              <FilledTextInputDevice
                style={{ width: isMobile ? "100%" : "45%" }}
                onChange={editInputHandler}
                variant="filled"
                value={editingCard.contact}
                name="contact"
                fullWidth
                label="Телефон"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          </InputMask>

          <Box
            textAlign="left"
            style={{
              width: isMobile ? "100%" : "45%",
            }}
            marginTop={isMobile && 3}
          >
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                id="create-application-label"
                style={{
                  transform: "none",
                  fontSize: isMobile ? 16 : 24,
                  marginLeft: 0,
                  position: "relative",
                  fontWeight: "bold",
                  marginBottom: isMobile ? 6 : 13,
                  color: theme.palette.secondary.dark,
                }}
              >
                Статус
              </InputLabel>
              <Select
                IconComponent={() =>
                  <ChervonIcon style={{ position: "absolute", right: 23, pointerEvents: "none", }} />
                }
                variant="filled"
                labelId="create-application-label"
                input={<FilledTextInputBaseDevice />}
                value={editingCard.status || "Новая"}
                MenuProps={{
                  classes: {
                    paper: "#fff",
                  },
                }}
                onChange={(
                  e: React.ChangeEvent<{
                    name?: string | undefined;
                    value: unknown;
                  }>
                ) => {
                  setEditingCard({
                    ...editingCard,
                    status: e.target.value as string,
                  });
                }}
              >
                <MenuItem value={"Новая"}>Новая</MenuItem>
                <MenuItem value={"В работе"}>В работе</MenuItem>
                <MenuItem value={"Выполнена"}>Выполнена</MenuItem>
                <MenuItem value={"Отказ"}>Отказ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <FilledTextInputDevice
          onChange={editInputHandler}
          variant="filled"
          value={editingCard.comment}
          name="comment"
          fullWidth
          multiline
          label="Комментарий"
          placeholder="Введите комментарий здесь"
          rows={4}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box display={isPad ? "block" : "flex"} width={"100%"} marginTop={3}>
          <Box
            style={{
              width: !isPad ? "50%" : "100%",
            }}
            paddingRight={isPad ? 0 : 1}
            marginTop={2}
          >
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor: theme.palette.primary.dark,
              }}
              onClick={() => {
                onSave({
                  ...editingCard,
                });
              }}
              variant="contained"
              disableElevation
              disabled={isLoading}
            >
              <Typography style={{ color: "#FFF", fontSize: isPad ? 14 : 24 }}>
                Сохранить
              </Typography>
            </Button>
          </Box>
          <Box
            style={{
              width: !isPad ? "50%" : "100%",
            }}
            marginTop={isMobile ? 0 : 2}
            paddingLeft={isPad ? 0 : 1}
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
              disableElevation
              disabled={isLoading}
            >
              <Typography
                style={{ color: "#626870", fontSize: isPad ? 14 : 24 }}
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

export default CreateApplicationDialog;
