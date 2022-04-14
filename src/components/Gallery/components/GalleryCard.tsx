import { Box, Typography } from "@material-ui/core";
import { isFunction } from "lodash";
import React, { useContext } from "react";
import { DeviceContext } from "../../../App";
import { theme } from "../../../theme";
import FloatingCardButton from "../../PriceCard/FloatingCardButton";
import { IGalleryCard } from "../Models";
import { ReactComponent as BinIcon } from "./icons/1.svg";
import { ReactComponent as EditIcon } from "./icons/2.svg";

const GalleryCard = ({
  name,
  image_url,
  description,
  id,
  onEditButtonClick,
  onDeleteButtonClick,
}: IGalleryCard) => {
  const { isMobile } = useContext(DeviceContext);

  return (
    <Box
      position="relative"
      className={
        !(onDeleteButtonClick && onEditButtonClick) ? "gallery-card-main" : ""
      }
    >
      <Box
        display="flex"
        position="absolute"
        top={16}
        right={16}
        className="gallery-card-actions-wrapper"
      >
        {isFunction(onDeleteButtonClick) && (
          <Box marginLeft={isMobile ? 1.5 : 1}>
            <FloatingCardButton
              onClick={() => {
                onDeleteButtonClick({
                  name,
                  description,
                  id,
                  image_url,
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
                  name,
                  description,
                  id,
                  image_url,
                });
              }}
              component={<EditIcon stroke={theme.palette.primary.main} />}
            />
          </Box>
        )}
      </Box>
      <div
        className={isMobile ? "gallery-card-wrapper-mobile" : "gallery-card-wrapper"}
        style={{
          backgroundImage: `url(${image_url})`,
        }}
      >
        <div className={isMobile ? "gallery-card-content-mobile" : "gallery-card-content"}>
          <Typography
            className="card-text"
            style={{
              fontWeight: "bold",
              fontSize: isMobile ? 18 : 24,
              color: "#FFF",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              whiteSpace: "pre-wrap",
            }}
          >
            {name}
          </Typography>
          <Typography
            className="card-text"
            style={{
              marginTop: isMobile ? 16 : 0,
              fontWeight: 500,
              fontSize: isMobile ? 16 : 20,
              color: "#FFF",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              whiteSpace: "pre-wrap",
            }}
          >
            {description}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default GalleryCard;
