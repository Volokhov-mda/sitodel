import { Box, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { DeviceContext } from "../../App";
import GroupSection from "../GroupSection/GroupSection";
import { UserPageContext } from "../UserPageWrapper/UserPageWrapper";
import GalleryCard from "./components/GalleryCard";
import { IGalleryModel } from "./Models";
import "./styles.css";

const Gallery = () => {
  const { isPad } = useContext(DeviceContext);
  const userData = useContext(UserPageContext);
  if (!userData?.galleryCardsData) {
    return <div />;
  }

  return (
    <GroupSection headline="Галерея">
      <Grid container spacing={isPad ? 3 : 4}
        style={isPad ? {
          margin: "0 -12px -12px",
        } : {}}
      >
        {userData?.galleryCardsData.map((item: any) => (
          <Grid item lg={4} xs={12} md={6} key={item.id}>
            <Box marginTop={isPad ? 0 : 3}>
              <GalleryCard {...item} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </GroupSection>
  );
};

export default Gallery;
