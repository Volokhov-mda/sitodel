import { useContext } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectIsUserLoaded } from "../../../store/ducks/user/selectors";
import Button from "../../../styledComponents/Button";
import { DeviceContext } from "../../../App";
interface IProps {
  isSmall?: boolean;
}
const CreateAccoutButton = ({ isSmall }: IProps) => {
  const { isMobile } = useContext<any>(DeviceContext);
  const history = useHistory();
  const redirectToRegister = () => {
    history.push("/registration");
  };
  const redirectToDashboard = () => {
    history.push("/me");
  };
  const isUserLoaded = useSelector(selectIsUserLoaded);

  return (
    <Button
      endIcon={
        isSmall ? undefined : <img src="./assets/RightArrow.svg" alt="right" />
      }
      style={{
        fontWeight: 700,
        backgroundColor: "#FFF",
        textTransform: "none",
        borderRadius: 30,
        width: isMobile ? 248 : "unset",
        height: isSmall ? 50 : (isMobile ? 58 : "auto"),
        paddingLeft: isSmall ? 26 : 24,
        paddingRight: isSmall ? 26 : 24,
        fontSize: isSmall ? (isMobile ? 12 : 18) : isMobile ? 16 : 24,
        filter: "drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.25))",
        whiteSpace: "nowrap",
      }}
      color="primary"
      onClick={isUserLoaded ? redirectToDashboard : redirectToRegister}
    >
      {isUserLoaded ? "Личный кабинет" : "Создать аккаунт"}
    </Button>
  );
};

export default CreateAccoutButton;
