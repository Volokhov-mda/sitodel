import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Box } from "@material-ui/core";

import { DeviceContext } from "../../App";

import MyProfile from "./components/MyProfile";
import TopBar from "./components/TopBar";

export enum EMyProfileTabs {
  MY_DATA = "0",
  PRICE_LIST = "1",
  GALLERY = "2",
}

export interface IContentPageProps {
  tab?: string;
}

const topBarButtons = [  
  {
    text: "Личные данные",
    val: EMyProfileTabs.MY_DATA,
  },
]

const MyPageContent = ({ tab }: IContentPageProps) => {
  const history = useHistory();
  const { isMobile } = useContext(DeviceContext);
  
  const [activeTab, setActiveTab] = React.useState(EMyProfileTabs.MY_DATA);

  React.useEffect(() => {
    tab && setActiveTab(tab as EMyProfileTabs);
  }, [tab]);
  
  const activeTabHandler = (tab: EMyProfileTabs) => {
    history.push(`/me/${tab}`);
  };

  return (
    <Box marginX={isMobile ? 0 : 5} width="100%">
      <TopBar
        handler={activeTabHandler}
        activeTab={activeTab}
        allTabButtons={topBarButtons}
      />
      {activeTab === EMyProfileTabs.MY_DATA && <MyProfile key={activeTab} />}
    </Box>
  );
};

export default MyPageContent;
