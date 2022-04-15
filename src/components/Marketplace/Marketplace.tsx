import React, { useContext, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import lodash from "lodash";

import { marketApi } from "../../api/marketApi";
import useFetchOnScroll from "../../hooks/useFetchOnScroll";
import { selectUserData } from "../../store/ducks/user/selectors";

import { DeviceContext } from "../../App";

import { balanceCards } from "./tools";

import { theme } from "../../theme";
import {
  emptyMarket,
  noApplicationsSmall,
  searchMarketplace,
} from "../../UIconsts";

import {
  FilledTextInput,
  FilledTextInputMobile,
} from "../../styledComponents/FilledTextInput/FilledTextInput";

import MarketplaceCard from "./components/MarketplaceCard";

export interface IMarketCard {
  first_name: string;
  last_name: string;
  occupation: string;
  image_url: string;
  city: string;
  verified: boolean;
  site_name: string;
  size?: 2 | 3 | 4;
}

const limit = 30;

const Marketplace = () => {
  const { isMobile } = useContext(DeviceContext);
  const userData = useSelector(selectUserData);

  const [searchTerm, setSearchTerm] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCardsFinished, setIsCardsFinished] = useState(false);

  const [allCards, setAllCards] = useState<any[]>([]);
  const [displayableCards, setDisplayableCards] = useState<IMarketCard[][]>();

  // balanceCards(data)
  const fetch = async () => {
    if (isCardsFinished) {
      return;
    }
    try {
      const fetched: any[] = await marketApi.get(
        (limit * currentPage).toString(),
        limit.toString(),
        searchTerm,
        searchTerm?.length >= 5 ? 0.07 : 0.01
      );
      fetched?.length === limit
        ? (() => {
            setCurrentPage(currentPage + 1);
            setAllCards([...allCards, ...fetched]);
          })()
        : (() => {
            fetched?.length && setAllCards([...allCards, ...fetched]);
            resetObserver();
            setIsCardsFinished(true);
          })();
    } catch {}
  };
  const fetchWithResetDebounced = React.useCallback(
    lodash.debounce(() => {
      setCurrentPage(0);
      setAllCards([]);
      setIsCardsFinished(false);
    }, 700),
    []
  );

  const OnChangeSearchInput = (e: any) => {
    setSearchTerm(e.target.value);
    fetchWithResetDebounced();
  };
  const history = useHistory();

  const [resetObserver] = useFetchOnScroll(loaderRef, fetch);

  useEffect(() => {
    setDisplayableCards(balanceCards(allCards));
    return resetObserver;
  }, [allCards, resetObserver]);

  const FilledTextInputDevice = isMobile
    ? FilledTextInputMobile
    : FilledTextInput;

  return (
    <Box width="100%" marginX={isMobile ? 0 : 2} marginTop={isMobile && -3}>
      <Box position="relative" display={"flex"}>
        {!userData && !isMobile && (
          <Box
            marginRight={5}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              history.push("/");
            }}
          >
            <img src="../assets/logo.svg" className="sidebar-logo" alt="logo" />
          </Box>
        )}
        <Box position="relative">
          <FilledTextInputDevice
            onChange={OnChangeSearchInput}
            value={searchTerm}
            variant="filled"
            placeholder="Поиск"
            style={
              isMobile
                ? {
                    paddingRight: 68,
                    width: "100%",
                  }
                : {}
            }
            InputProps={
              isMobile
                ? {
                    style: {
                      padding: 0,
                      minHeight: 44,
                    },
                  }
                : {}
            }
            inputProps={{
              style: {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 42,
              },
            }}
          />
          <img
            style={{
              position: "absolute",
              left: 16,
              top: isMobile ? "50%" : "calc(50% - 3px)",
              width: 18,
              height: 18,
              transform: "translateY(-50%)",
            }}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              searchMarketplace
            )}`}
            alt="search"
          />
        </Box>
      </Box>
      <Box marginTop={3.7} minHeight={"calc(100vh - 71px)"}>
        {isCardsFinished && allCards?.length ? (
          <Grid
            container
            spacing={3}
            style={{
              minHeight: "calc(100vh - 71px)",
            }}
          >
            {displayableCards?.flat().map((t, i) => (
              <Grid key={i} item xs={12} sm={12} md={6} lg={4} xl={4}>
                <MarketplaceCard {...t} />
              </Grid>
            ))}
            {isMobile ? (
              <Box
                style={{
                  marginTop: 100,
                  padding: 30,
                  width: "100%",
                  fontSize: 14,
                  textAlign: "center",
                  alignSelf: "flex-end",
                  background: theme.palette.background.paper,
                }}
              >
                Вы просмотрели все результаты
              </Box>
            ) : (
              <Grid key={-1} item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#EAEEF3",
                    borderRadius: "16px",
                    position: "relative",
                    minHeight: 330,
                  }}
                >
                  <Box marginLeft="107px">
                    <img
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        noApplicationsSmall
                      )}`}
                      alt="no applications"
                    />
                  </Box>
                  <Typography
                    style={{
                      position: "absolute",
                      fontSize: 24,
                      lineHeight: "29px",
                      color: "#212C4D",
                      left: 36,
                      bottom: 26,
                    }}
                  >
                    Вы просмотрели <br /> все результаты
                  </Typography>
                </Box>
              </Grid>
            )}
            {/* {displayableCards?.map((t, i) => (
            <Grid key={i} item xs={12} sm={12} md={6} lg={4} xl={4}>
            {t.map((z, index) => (
              <Box key={index} marginBottom={3}>
              <MarketplaceCard {...z} />
              </Box>
              ))}
              </Grid>
            ))} */}
          </Grid>
        ) : null}

        {isCardsFinished ? (
          !allCards?.length && (
            //  (
            //   <div/>
            // ) :
            <>
              <Box
                width="100%"
                display="flex"
                justifyContent="cetner"
                flexDirection="column"
                alignItems="center"
                textAlign={isMobile && "center"}
              >
                <img
                  style={{
                    width: isMobile ? "64%" : "40%",
                  }}
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    emptyMarket
                  )}`}
                  alt="facebook"
                />
                <Typography
                  style={{
                    color: "#000000",
                    fontSize: isMobile ? 16 : 30,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  Ничего не найдено
                </Typography>
                <Typography
                  style={{
                    color: "#000000",
                    fontSize: isMobile ? 16 : 24,
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  попробуйте изменить запрос
                </Typography>
              </Box>
            </>
          )
        ) : (
          <div ref={loaderRef}>
            <Grid container spacing={3}>
              {Array(6)
                .fill("")
                .map((z, index) => (
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Box key={index}>
                      <Skeleton height={isMobile ? 235 : 337} />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Marketplace;
