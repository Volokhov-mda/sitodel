import { Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import React, { useContext } from "react";
import { inst } from "../../UIconsts";
import FooterContacts from "./components/FooterContacts";
import FooterForm from "./components/FooterForm";
import { DeviceContext } from "../../App";
import GroupSection from "../GroupSection/GroupSection";
import ParagraphText from "../ParagraphText/ParagraphText";
import FooterLogo from "./components/FooterLogo";

const Footer = () => {
  const { isPad } = useContext(DeviceContext);
  return (
    <>
      <Box marginTop={4}>
        {isPad ? (
          <GroupSection headline="Контакты">
            <ParagraphText text="Свяжитесь со мной по телефону или в социальных сетях" />
            <Grid container spacing={3} style={{ margin: "0 -12px" }}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <FooterForm />
                <FooterContacts />
              </Grid>
            </Grid>
          </GroupSection>
        ) : (
          <Grid
            container
            spacing={5}
            style={
              !isPad
                ? {
                    flexWrap: "nowrap",
                  }
                : {}
            }
          >
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <FooterForm />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <GroupSection
                headline=""
                // headline="Контакты"
              >
                <ParagraphText
                  text=""
                  //  text="Свяжитесь со мной по телефону или в социальных сетях"
                />
                <FooterContacts />
              </GroupSection>
            </Grid>
          </Grid>
        )}
      </Box>
      <FooterLogo />
    </>
  );
};

export default Footer;
