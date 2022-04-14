import { Box, Grid, Hidden } from "@material-ui/core";
import React, { useContext, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { DeviceContext } from "../../App";
import { User } from "../../store/ducks/user/store/state";
import { UserPageContext } from "../UserPageWrapper/UserPageWrapper";
import UserInformation from "./components/UserInformation/UserInformation";
import UserSkills from "./components/UserSkills/UserSkills";
import "./styles.css";

const UserHeader = () => {
  const { isPad } = useContext(DeviceContext);
  const userData = useContext(UserPageContext);
  const HeaderTextBlockref = useRef<HTMLDivElement>();

  return (
    <Box marginTop={isPad ? 3 : 9} id="header-wrapper">
      {userData?.userData?.image_url ? (
        <Box id="header-img-container">
          <img
            className="header-img"
            src={userData?.userData?.image_url}
            alt="user_img"
          />
        </Box>
      ) : (
        userData?.userData ? (
          ""
        ) : (
          <Skeleton className="header-img" />
        )
      )}
      <div
        ref={HeaderTextBlockref as any}
        id="header-text-block"
      >
        <UserInformation />
        <div style={{ marginTop: 14, marginBottom: -6 }}>
          <UserSkills />
        </div>
      </div>
    </Box>
  );
};

export default UserHeader;
