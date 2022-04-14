import { Box, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { DeviceContext } from "../../../App";
import GroupSection from "../../GroupSection/GroupSection";
import PriceCard from "../../PriceCard/PriceCard";
import { UserPageContext } from "../../UserPageWrapper/UserPageWrapper";

const PriceList = () => {
  const { isPad } = useContext(DeviceContext);
  const userData = useContext(UserPageContext);
  if (!userData?.priceListData) {
    return <div />;
  }
  return (
    <GroupSection headline="Прайс-лист">
      <Grid container spacing={isPad ? 3 : 5}
        style={isPad ? {
          margin: "0 -12px -12px",
        } : {}}
      >
        {(userData?.priceListData || []).map((item: any, index: any) => (
          <Grid item lg={3} md={6} xs={12} key={index}>
            <Box marginTop={isPad ? 0 : 3}>
              <PriceCard {...item} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </GroupSection>
  );
};

export default PriceList;
