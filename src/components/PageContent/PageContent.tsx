import React from "react";
import { Route, Switch } from "react-router";
import HomeScreen from "../HomeScreen/HomeScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import MyPage from "../MyPage/MyPage";
import Policy from "../Policy/Policy";
import RegistrationScreen from "../RegistrationScreen/RegistrationScreen";
import ResetPassword from "../ResetPassword/ResetPassword";
import UserPageWrapper from "../UserPageWrapper/UserPageWrapper";
import VerifyUser from "../VerifyUser/VerifyUser";

const PageContent = () => {
  // let isUserOwnPage = false;
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if (!isUserOwnPage) {
  //       initMetaTags({
  //         title: "Самоделкин",
  //         imageURL: "meta/image.png",
  //         description:
  //           "Набор инструментов для продвижения своего дела и поиска клиентов",
  //       });
  //     }
  //   }, 100);
  // }, []);
  return (
    <Switch>
      <Route
        exact
        path={[
          "/me",
          "/my-site",
          "/my-cards",
          "/my-requests",
          "/about-us",
          "/marketplace",
          "/me/:tab",
          "/my-site/:tab",
        ]}
      >
        <MyPage />
      </Route>

      <Route exact path="/registration">
        <RegistrationScreen />
      </Route>
      <Route exact path="/login">
        <LoginScreen />
      </Route>
      <Route exact path="/policy">
        <Policy />
      </Route>
      <Route path="/verify-user">
        <VerifyUser />
      </Route>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route exact path="/">
        <HomeScreen />
      </Route>
      <Route
        render={() => {
          // isUserOwnPage = true;
          return <UserPageWrapper />;
        }}
      ></Route>
    </Switch>
  );
};

export default PageContent;
