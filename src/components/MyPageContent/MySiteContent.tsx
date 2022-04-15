import { Box } from "@material-ui/core";
import React, { useContext } from "react";
import MySite from "../MySite/MySite";
import CreateSite from "../MySite/CreateSite";
import TopBar from "./components/TopBar";
import { IContentPageProps } from "./MyPageContent";
import { useHistory } from "react-router";
import { mySiteApi } from "../../api/mySiteApi";
import { DeviceContext, MySiteContext } from "../../App";

export enum EMySiteTabs {
  MY_SITE = "0",
  CREATE_SITE = "1",
}

const topTabs = [
  {
    text: "Мой сайт",
    val: EMySiteTabs.MY_SITE,
  },
  {
    text: "Создать сайт",
    val: EMySiteTabs.CREATE_SITE,
  },
];

const MySiteContent = ({ tab }: IContentPageProps) => {
  const history = useHistory();
  const { isMobile } = useContext(DeviceContext);
  const { mySiteData, setMySiteData } = useContext<any>(MySiteContext);

  const isAlreadyExists = !!mySiteData?.name;
  const [activeTab, setActiveTab] = React.useState(EMySiteTabs.MY_SITE);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await mySiteApi.getMySite();
        if (resp?.name) {
          setMySiteData(resp);
        }
        console.error(resp);
      } catch {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const activeTabHandler = (tab: EMySiteTabs) => {
    history.push(`/my-site/${tab}`);
  };

  React.useEffect(() => {
    tab && setActiveTab(tab as EMySiteTabs);
  }, [tab]);

  return (
    <Box marginX={isMobile ? 0 : 5} width="100%">
      <>
        <TopBar
          handler={activeTabHandler}
          activeTab={activeTab}
          isLoading={isLoading}
          allTabButtons={
            isLoading
              ? [...topTabs]
              : topTabs.map((x) => {
                  return x.val === EMySiteTabs.CREATE_SITE
                    ? (() => {
                        return {
                          ...x,
                          text: isAlreadyExists ? "Редактировать сайт" : x.text,
                        };
                      })()
                    : x;
                })
          }
        />
        {activeTab === EMySiteTabs.MY_SITE && <MySite />}
        {activeTab === EMySiteTabs.CREATE_SITE && <CreateSite />}
      </>
    </Box>
  );
};

export default MySiteContent;
