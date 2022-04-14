import { Box } from "@material-ui/core";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";

import { DeviceContext } from "../../../../App";

import { UserChips, UserChipsMobile } from "../../../../styledComponents/UserChips/UserChips";
import { UserPageContext } from "../../../UserPageWrapper/UserPageWrapper";

const UserSkills = () => {
  const { isPad } = useContext(DeviceContext);
  const userData = useContext(UserPageContext);

  const Chip = isPad ? UserChipsMobile(userData?.color || "#eaeaea") : UserChips(userData?.color || "#eaeaea");

  return (
    <Box
      style={{
        maxWidth: isPad ? "500px" : "50vw"
      }}
    >
      {userData?.facts ? (
        userData?.facts.map((skill: any, index: any) => (
          skill && <Chip
            key={index}
            label={skill}
            style={{
              marginRight: isPad ? 12 : 24,
              marginBottom: isPad ? 6 : 20,
              maxWidth: isPad ? "100%" : "unset",
            }}
          />
        ))
      ) : (
        isPad && (
          <>
            <Skeleton width={120} height={29} style={{ marginRight: 12, marginBottom: 6, }} />
            <Skeleton width={110} height={29} style={{ marginRight: 12, marginBottom: 6, }} />
            <Skeleton width={170} height={29} style={{ marginRight: 12, marginBottom: 6, }} />
            <Skeleton width={134} height={29} style={{ marginRight: 12, marginBottom: 6, }} />
          </>
        )
      )}
    </Box>
  );
};

export default UserSkills;
