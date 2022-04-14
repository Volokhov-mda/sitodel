import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { theme } from "../../theme";
import ParagraphText from "../ParagraphText/ParagraphText";
import FloatingCardButton from "./FloatingCardButton";
import { IPriceCard } from "./Models";
import { ReactComponent as BinIcon } from "./icons/1.svg";
import { ReactComponent as EditIcon } from "./icons/2.svg";
import { isFunction } from "lodash";
import { UserPageContext } from "../UserPageWrapper/UserPageWrapper";
import { DeviceContext } from "../../App";

const PriceCard = ({
  price,
  name,
  description,
  id,
  onEditButtonClick,
  onDeleteButtonClick,
}: IPriceCard) => {
  const { isMobile } = useContext(DeviceContext);
  const userData = useContext(UserPageContext);

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.light,
        borderRadius: 12,
        position: "relative",
        minHeight: isMobile ? 180 : 200,
        height: "100%",
      }}
    >
      <Box paddingX={isMobile ? 2 : 3} paddingTop={isMobile ? 8 : 2} paddingBottom={isMobile ? 4 : 7.5}>
        {isMobile ? (
            <>
            <Typography
              color="textPrimary"
              className="card-text"
              style={{
                fontWeight: "bold",
                fontSize: 18,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {name}
            </Typography>
            <Typography
              color="secondary"
              className="card-text"
              style={{
                marginTop: 24,
                color: userData?.color,
                fontWeight: "bold",
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {price}
            </Typography>
            </>
          ) : (
            <>
            <Typography
              color="textPrimary"
              className="card-text"
              style={{
                marginTop: 6,
                color: userData?.color,
                fontWeight: "bold",
                fontSize: 48,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {price}
            </Typography>
            <Typography
              color="secondary"
              className="card-text"
              style={{
                fontWeight: "bold",
                fontSize: 24,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {name}
            </Typography>
            </>
          )
        }
        <ParagraphText text={description} fontSize={isMobile ? 16 : 20} />
      </Box>
      <Box 
        display="flex" 
        position="absolute" 
        top={isMobile ? 16 : null} 
        bottom={isMobile ? null : 12} 
        right={isMobile ? 16 : 12}
      >
        {isFunction(onDeleteButtonClick) && (
          <Box marginLeft={isMobile ? 1.5 : 1}>
            <FloatingCardButton
              onClick={() => {
                onDeleteButtonClick({
                  price,
                  name,
                  description,
                  id,
                });
              }}
              component={<BinIcon stroke={theme.palette.primary.main} />}
            />
          </Box>
        )}
        {isFunction(onEditButtonClick) && (
          <Box marginLeft={isMobile ? 1.5 : 1}>
            <FloatingCardButton
              onClick={() => {
                onEditButtonClick({
                  price,
                  name,
                  description,
                  id,
                });
              }}
              component={<EditIcon stroke={theme.palette.primary.main} />}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PriceCard;
