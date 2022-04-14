import { LinearProgress } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { mySiteApi } from "../../api/mySiteApi";
import { userApi } from "../../api/userApi";
import ErrorPage from "../ErrorPage/ErrorPage";
import UserSitePage from "../UserSitePage/UserSitePage";

export const UserPageContext = React.createContext<any>(null);
// export const initMetaTags = ({ title, imageURL, description }: any) => {
//   const head = document.getElementsByTagName("head")[0];

//   const addTag = (content: string, name: string) => {
//     const meta = document.createElement("meta");
//     meta.setAttribute("content", content);
//     meta.setAttribute("property", name);
//     head.appendChild(meta);
//   };
//   console.error(window.location);
//   addTag(title, "og:title");
//   addTag(imageURL, "og:image");
//   addTag("website", "og:type");
//   addTag(imageURL, "twitter:image");
//   addTag(description, "og:description");
// };

const UserPageWrapper = () => {
  const [mySiteData, setMySiteData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await mySiteApi.getMySite(
          window.location.pathname.slice(1, 500)
        );
        console.error(resp);
        if (resp?.name) {
          const userData = await userApi.fetchUserData(resp.owner_id);
          const priceListData = await userApi.fetchPricelist(resp.owner_id);
          const galleryCardsData = await userApi.fetchGallery(resp.owner_id);
          setMySiteData({ ...resp, userData, priceListData, galleryCardsData });
          // initMetaTags({
          //   title: `${userData.first_name} ${userData.last_name} | ${userData.occupation}`,
          //   imageURL: userData.image_url || "meta/image.png",
          //   description: "Мастер своего дела с samodelkin.me",
          // });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  // if (isLoading) {
  //   return <LinearProgress />;
  // }
  if (isLoading || mySiteData) {
    return (
      <UserPageContext.Provider value={mySiteData}>
        <UserSitePage />
      </UserPageContext.Provider>
    );
  }
  return <ErrorPage />;
};

export default UserPageWrapper;
