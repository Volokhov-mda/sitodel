import { useContext } from "react";
import { Container } from "@material-ui/core";

import { UserPageContext } from "../UserPageWrapper/UserPageWrapper";

import Footer from "../Footer/Footer";
import Gallery from "../Gallery/Gallery";
import GroupSection from "../GroupSection/GroupSection";
import ParagraphText from "../ParagraphText/ParagraphText";
import PriceList from "./PriceList/PriceList";
import UserHeader from "../UserHeader/UserHeader";

const UserSitePage = () => {
  const userData = useContext(UserPageContext);

  return (
    <Container>
      <UserHeader />
      {userData?.description && (
        <GroupSection headline="Обо мне">
          <ParagraphText text={userData.description} />
        </GroupSection>
      )}
      {(userData?.priceListData.length && <PriceList />) || ""}
      {(userData?.galleryCardsData.length && <Gallery />) || ""}
      {(userData && <Footer />) || ""}
    </Container>
  );
};

export default UserSitePage;
