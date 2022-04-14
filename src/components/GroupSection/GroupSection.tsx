import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { DeviceContext } from "../../App";
import { useUserInformationStyles } from "../UserHeader/components/UserInformation/UserInformationStyles";
import { UserPageContext } from "../UserPageWrapper/UserPageWrapper";
import { IGroupSection } from "./Models";

const GroupSection = ({ children, headline }: IGroupSection) => {
  const { isPad } = useContext(DeviceContext);
  const userInformationStyles = useUserInformationStyles();
  const userData = useContext(UserPageContext);

  return (
    <Box marginTop={3}>
      <Typography
        variant="h4"
        className={isPad ? userInformationStyles.professionHeadlineMobile : userInformationStyles.professionHeadline}
        style={{ color: userData.color }}
      >
        {headline}
      </Typography>
      {children}
    </Box>
  );
};

export default GroupSection;
