import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { theme } from "../../theme";
import BackButton from "../BackButton/BackButton";
import Button from "../../styledComponents/Button";
import LoginForm from "../LoginScreen/components/LoginForm";
import LoginScreen from "../LoginScreen/LoginScreen";
// import { initMetaTags } from "../UserPageWrapper/UserPageWrapper";

interface IProps {
  code?: string;
  targetUrl?: string;
}
const ErrorPage = ({ code = "404", targetUrl }: IProps) => {
  const [isDelayed, setIsDelayed] = React.useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setIsDelayed(true)
    }, 1000)
    return () => {
      clearTimeout(t)
    }
    // initMetaTags({
    //   title: "Самоделкин",
    //   imageURL: "meta/image.png",
    //   description:
    //     "Набор инструментов для продвижения своего дела и поиска клиентов",
    // });
  }, []);
  const history = useHistory();
  const getTextByCode = () => {
    switch (code) {
      case "404":
        return (
          <>
            <Typography
              variant="h1"
              style={{ fontWeight: "bold", color: theme.palette.primary.dark, marginTop: 300 }}
            >
              {code}
            </Typography>
            Данной страницы не существует
          </>
        );
      case "403":
        return (
          <LoginScreen {...{ targetUrl }} />
          // <>
          //   <Grid container>
          //     <Grid item sm={12} xs={12} md={7}>
          //       У Вас нет доступа к этой
          //       <br /> странице <br />
          //     </Grid>
          //     <Grid item sm={12} xs={12} md={5}>
          //       <Box marginTop={20}>
          //         <LoginForm {...{ targetUrl }} />
          //       </Box>
          //     </Grid>
          //   </Grid>
          // </>
        );
      default:
        return "";
    }
  };

  if (!isDelayed) {
    return <div/>
  }
  return (
    <>
      {/* <BackButton isToHomePage /> */}
      <Container maxWidth="md">
        <Box marginTop={1}>
          <Typography variant="h3">{getTextByCode()}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default ErrorPage;
