import {
  Box,
  Button,
  Dialog,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { userApi } from "../../../api/userApi";
import { DeviceContext } from "../../../App";
import { theme } from "../../../theme";
import { createPost } from "../../../UIconsts";
import FlatButton from "../../FlatButton/FlatButton";
import FloatingButton from "../../FloatingFlatButton/FloatingFlatButton";
import { notificationsText } from "../notificationTexts";
import { emptyPriceCard, IPriceModel } from "../../PriceCard/Models";
import PriceCard from "../../PriceCard/PriceCard";
import { ReactComponent as PlusIcon } from "../icons/plus.svg";
import DeleteDialog from "../../MyPageContent/components/DeleteDialog";
import PriceDialogContent from "../../MyPageContent/components/PriceDialogContent";

const PriceList = () => {
  const { isMobile } = useContext(DeviceContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<number>();
  const deleteDialogChangeHandler = () => {
    setisDeleteDialogOpen(!isDeleteDialogOpen);
  };
  const [editableCard, setEditableCard] =
    React.useState<IPriceModel>(emptyPriceCard);
  const { enqueueSnackbar } = useSnackbar();
  const [allCards, setAllCards] = React.useState<IPriceModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaveLoading, setIsSaveLoading] = React.useState(false);
  const fetchCards = async () => {
    try {
      setIsLoading(true);
      setAllCards(await userApi.fetchPricelist());
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchCards();
  }, []);
  const deletePriceCard = async (id: number) => {
    try {
      const isSuccess = await userApi.deletePriceListCard(id.toString());
      if (!isSuccess) {
        enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar(notificationsText.defaultAlerts.successDeleted, {
        variant: "success",
      });
      fetchCards();
    } catch {
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    }
  };
  const onSave = async (card: IPriceModel, isEdit: boolean) => {
    try {
      if (!card.name) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectinfo, {
          variant: "error",
        });
        return;
      }
      setIsSaveLoading(true);
      const isSuccess = await (isEdit
        ? userApi.updatePricelistCard(card)
        : userApi.createPricelistCard(card));
      if (!isSuccess) {
        enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar(notificationsText.defaultAlerts.saved, {
        variant: "success",
      });
      dialogChangeHandler();
      fetchCards();
    } catch {
      enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
        variant: "error",
      });
    } finally {
      setIsSaveLoading(false);
    }
  };
  const dialogChangeHandler = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const openEditingDialog = (card: IPriceModel) => {
    setEditableCard(card);
    dialogChangeHandler();
  };
  if (isLoading) {
    return <LinearProgress />;
  }
  return (
    <>
      <Dialog
        onClose={dialogChangeHandler}
        open={isDialogOpen}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: isMobile
            ? {
                borderRadius: 12,
                width: "calc(100% - 32px)",
                margin: "16px",
              }
            : {
                borderRadius: 12,
              },
        }}
      >
        <PriceDialogContent
          {...{
            ...editableCard,
            onCancel: dialogChangeHandler,
            onSave,
            isEdit: editableCard !== emptyPriceCard,
            isLoading: isSaveLoading,
          }}
        />
      </Dialog>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        deleteHandler={deletePriceCard}
        closeHandler={deleteDialogChangeHandler}
        cardId={deletingId}
      />
      {allCards.length === 0 ? (
        <Box
          width="100%"
          display="flex"
          justifyContent="cetner"
          flexDirection="column"
          alignItems={isMobile ? "center" : "left"}
        >
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(createPost)}`}
            alt="createPost"
            style={{
              width: isMobile ? "60%" : "30%",
              minWidth: 250,
              maxWidth: 500,
            }}
          />
          {(!isMobile && allCards.length === 0) || isMobile ? (
            <Box
              width={isMobile ? "100%" : "350px"}
              display="flex"
              justifyContent="center"
              marginTop={2}
            >
              <FlatButton
                style={{
                  backgroundColor: isLoading
                    ? theme.palette.secondary.main
                    : theme.palette.primary.dark,
                  width: "100%",
                }}
                tabIndex={13}
                variant="contained"
                disableElevation
                disabled={isLoading}
                onClick={() => {
                  openEditingDialog(emptyPriceCard);
                }}
              >
                Создать объявление
              </FlatButton>
            </Box>
          ) : null}
        </Box>
      ) : (
        <Grid container spacing={isMobile ? 3 : 5}>
          {allCards.map((item, index) => (
            <Grid item lg={4} md={6} xs={12} key={index}>
              <PriceCard
                {...item}
                onDeleteButtonClick={(item) => {
                  deleteDialogChangeHandler();
                  setDeletingId(item.id || 0);
                }}
                onEditButtonClick={(item) => {
                  openEditingDialog(item);
                }}
              />
            </Grid>
          ))}
          {allCards.length !== 0 && !isMobile && (
            <Grid item lg={4} md={6} xs={12} key={-1}>
              <div
                style={{
                  height: "100%",
                  backgroundColor: theme.palette.primary.light,
                  borderRadius: 12,
                  position: "relative",
                  minHeight: 200,
                  cursor: "pointer",
                }}
                onClick={() => {
                  openEditingDialog(emptyPriceCard);
                }}
              >
                <Box
                  position="absolute"
                  left="50%"
                  top="50%"
                  style={{ transform: "translate(-50%,-50%)" }}
                >
                  <PlusIcon stroke="#626870" />
                </Box>
              </div>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default PriceList;
