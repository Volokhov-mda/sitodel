import React, { useContext } from "react";
import { Tooltip, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";

import { IMarketCard } from "../Marketplace";

import { DeviceContext } from "../../../App";
import TooltipClickable from "../../TooltipClickable/TooltipClickable";
import { theme } from "../../../theme";

const MarketplaceCard = (card: IMarketCard) => {
  const { isMobile } = useContext(DeviceContext);

  return (
    <Box
      onClick={() => {
        card.site_name &&
          window.open(`${window.location.origin}/${card.site_name}`, "_blank");
      }}
      style={{
        background: card.image_url ? `url(${card.image_url})` : theme.palette.primary.dark,
        minHeight: isMobile ? 235 : ((card.size || 3) / 4) * 450,
        width: "100%",
        borderRadius: 14,
        position: "relative",
        cursor: "pointer",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      {card.image_url && <div className="market-overlay" />}
      <Box padding={3}>
        <Box position="absolute" top="0px" maxWidth="70%" maxHeight="50%">
          <Typography
            style={{
              color: "#FFF",
              paddingTop: 24,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: isMobile ? 18 : 24,
            }}
          >
            {card.first_name} {card.last_name}
          </Typography>
        </Box>
        {card.verified && (
          <Box position="absolute" top={isMobile ? 23 : 20} right={20}>
            <TooltipClickable
              title={
                <div style={{ textAlign: "center" }}>
                  Зарегистрированный <br /> самозанятый
                </div>
              }
            >
              <svg
                width={`${isMobile ? 25 : 50}`}
                height={`${isMobile ? 25 : 50}`}
                // stroke="#FFFFFF"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M44.8896 8.09628L25.7489 0.149304C25.2694 -0.0497192 24.7305 -0.0498169 24.2511 0.149304L5.11045 8.09628C4.38145 8.39901 3.90625 9.11073 3.90625 9.90008V19.5607C3.90625 32.8628 11.9462 44.8283 24.2619 49.8552C24.735 50.0482 25.2649 50.0482 25.7381 49.8552C38.0536 44.8284 46.0938 32.8629 46.0938 19.5607V9.90008C46.0938 9.11073 45.6187 8.39901 44.8896 8.09628ZM42.1875 19.5607C42.1875 30.8688 35.5469 41.2787 25 45.9254C14.735 41.4028 7.8125 31.1753 7.8125 19.5607V11.204L25 4.06786L42.1875 11.204V19.5607ZM22.8412 26.1441L31.2361 17.7493C31.9988 16.9866 33.2354 16.9865 33.9982 17.7493C34.761 18.5121 34.7609 19.7487 33.9981 20.5114L24.2223 30.2873C23.4594 31.0502 22.2228 31.0499 21.4602 30.2873L16.0018 24.8289C15.239 24.0661 15.239 22.8295 16.0018 22.0668C16.7646 21.3041 18.0012 21.304 18.7639 22.0668L22.8412 26.1441Z"
                    fill="url(#paint0_linear)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="3.90625"
                    y1="25"
                    x2="46.0938"
                    y2="25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                  <clipPath id="clip0">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </TooltipClickable>
          </Box>
        )}

        <Box position="absolute" bottom={isMobile ? 24 : 28} width={"calc(100% - 54px)"}>
          <Typography
            style={{
              color: "#FFF",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {card.city}
          </Typography>
          <Typography
            style={{
              color: "#FFF",
              fontSize: 20,
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {card.occupation}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MarketplaceCard;
