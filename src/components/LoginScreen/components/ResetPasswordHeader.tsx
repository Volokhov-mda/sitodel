import { Box, Typography } from "@material-ui/core";
import { useContext } from "react";
import { DeviceContext } from "../../../App";
import { theme } from "../../../theme";

const ResetPasswordHeader = ({
  isChangePassword,
}: {
  isChangePassword?: boolean;
}) => {
  const { isMobile } = useContext(DeviceContext);

  return (
    <Box textAlign="center">
      <img
        src="assets/darkLogo.svg"
        alt="Самоделкин"
        width={isMobile ? 91 : "unset"}
      />
      <Typography
        style={{
          fontSize: isMobile ? 24 : 40,
          color: theme.palette.secondary.dark,
        }}
        component="h2"
      >
        {isChangePassword ? "ИЗМЕНЕНИЕ ПАРОЛЯ" : "ВОССТАНОВИТЬ ПАРОЛЬ"}
      </Typography>
      <Typography variant="subtitle2" style={{ fontSize: isMobile ? 16 : 24 }}>
        {isChangePassword
          ? "Введи новый пароль"
          : "Мы отправим ссылку на почту"}
      </Typography>
    </Box>
  );
};

export default ResetPasswordHeader;
