import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";

import { DeviceContext } from "../../../App";
import { facebook, inst, vk, website } from "../../../UIconsts";
import { UserPageContext } from "../../UserPageWrapper/UserPageWrapper";

const FooterContacts = () => {
  const { isPad } = useContext(DeviceContext);
  const userData = useContext(UserPageContext);
  if (!userData?.userData) {
    return <div />;
  }
  return (
    <>
      {userData.userData?.phone && (
        <Box marginTop={3}>
          <Typography
            variant="body1"
            style={
              isPad
                ? {
                    fontSize: 16,
                  }
                : {}
            }
          >
            Мой телефон
          </Typography>
          <Typography
            variant="body1"
            style={{
              cursor: "pointer",
              color: userData.color,
              fontSize: isPad ? 16 : 24,
            }}
            onClick={() => {
              window.open("tel:" + userData.userData.phone);
            }}
          >
            {`${userData.userData.phone.slice(
              0,
              2
            )} (${userData.userData.phone.slice(
              2,
              5
            )}) ${userData.userData.phone.slice(
              5,
              8
            )}-${userData.userData.phone.slice(
              8,
              10
            )}-${userData.userData.phone.slice(10, 12)}`}
          </Typography>
        </Box>
      )}

      <Box marginTop={3}>
        {(userData?.userData?.vk ||
          userData?.userData?.website ||
          userData?.userData?.facebook ||
          userData?.userData?.instagram) && (
          <Typography
            variant="body1"
            style={
              isPad
                ? {
                    fontSize: 16,
                  }
                : {}
            }
          >
            Мои социальные сети
          </Typography>
        )}{" "}
        <div className="social-nets__container">
          {userData?.userData?.vk && (
            <img
              style={isPad ? { width: 34, height: 34 } : {}}
              onClick={() => {
                window.open(
                  userData?.userData?.vk?.includes("vk.com")
                    ? userData?.userData?.vk
                    : `https://vk.com/${userData?.userData?.vk}`,
                  "_blank"
                );
              }}
              src={`data:image/svg+xml;utf8,${encodeURIComponent(vk)}`}
              alt="vk"
            />
          )}
          
          {userData?.userData?.website && (
            <img
              style={isPad ? { width: 34, height: 34 } : {}}
              onClick={() => {
                window.open(userData?.userData?.website, "_blank");
              }}
              src={`data:image/svg+xml;utf8,${encodeURIComponent(website)}`}
              alt="website"
            />
          )}
        </div>
      </Box>
      {userData.userData.address && (
        <Box marginTop={3}>
          <Typography
            variant="body1"
            style={
              isPad
                ? {
                    fontSize: 16,
                  }
                : {}
            }
          >
            Адрес
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: "#626870",
              fontWeight: 400,
              fontSize: isPad ? 16 : 24,
            }}
            // onClick={() => {
            //   window.open("tel:" + userData.userData.phone);
            // }}
          >
            {userData.userData.address}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default FooterContacts;
