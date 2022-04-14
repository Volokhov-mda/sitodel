import {
  Box,
  Dialog,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { userApi } from "../../../api/userApi";
import { DeviceContext } from "../../../App";
import { isPad } from "../../../device";
import Button from "../../../styledComponents/Button";
import { theme } from "../../../theme";
import { createGallery } from "../../../UIconsts";
import FlatButton from "../../FlatButton/FlatButton";
import FloatingButton from "../../FloatingFlatButton/FloatingFlatButton";
import GalleryCard from "../../Gallery/components/GalleryCard";
import { emptyGallery, IGalleryModel } from "../../Gallery/Models";
import { notificationsText } from "../notificationTexts";
import { ReactComponent as PlusIcon } from "../icons/plus.svg";
import DeleteDialog from "../../MyPageContent/components/DeleteDialog";
import GalleryDialogContent from "../../MyPageContent/components/GalleryDialogContent";

const Gallery = () => {
  const { isMobile } = useContext(DeviceContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = React.useState(false);
  const [editableCard, setEditableCard] =
    React.useState<IGalleryModel>(emptyGallery);
  const [deletingId, setDeletingId] = React.useState<number>();
  const { enqueueSnackbar } = useSnackbar();
  const [allCards, setAllCards] = React.useState<IGalleryModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaveLoading, setIsSaveLoading] = React.useState(false);
  const fetchCards = async () => {
    try {
      setIsLoading(true);
      setAllCards(await userApi.fetchGallery());
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchCards();
  }, []);
  const deleteGalleryCard = async (id: number) => {
    try {
      const isSuccess = await userApi.deleteGalleryCard(id.toString());
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
  const onSave = async (card: IGalleryModel, isEdit: boolean) => {
    try {
      if (!card.name) {
        enqueueSnackbar(notificationsText.defaultAlerts.incorrectinfo, {
          variant: "error",
        });
        return;
      }
      setIsSaveLoading(true);
      const isSuccess = await (isEdit
        ? userApi.updateGalleryCard(card)
        : userApi.createGalleryCard(card));
      if (!isSuccess) {
        enqueueSnackbar(notificationsText.defaultAlerts.unknownError, {
          variant: "error",
        });
        return;
      }
      enqueueSnackbar(notificationsText.defaultAlerts.created, {
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

  const deleteDialogChangeHandler = () => {
    setisDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const openEditingDialog = (card: IGalleryModel) => {
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
        <GalleryDialogContent
          {...{
            ...editableCard,
            onCancel: dialogChangeHandler,
            onSave,
            isEdit: editableCard !== emptyGallery,
            isLoading: isSaveLoading,
          }}
        />
      </Dialog>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        deleteHandler={deleteGalleryCard}
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
            src={`data:image/svg+xml;utf8,${encodeURIComponent(createGallery)}`}
            alt="createPost"
            style={{
              width: isMobile ? "60%" : "30%",
              minWidth: 250,
              maxWidth: 500,
            }}
          />
          {((!isMobile && allCards.length === 0) || isMobile) && (
            <Box
              width={isMobile ? "100%" : "350px"}
              display="flex"
              justifyContent="center"
              marginTop={2}
            >
              <FlatButton
                tabIndex={13}
                style={{
                  backgroundColor: isLoading
                    ? theme.palette.secondary.main
                    : theme.palette.primary.dark,
                  width: "100%",
                }}
                variant="contained"
                disableElevation
                disabled={isLoading}
                onClick={() => {
                  openEditingDialog(emptyGallery);
                }}
              >
                Создать объявление
              </FlatButton>
            </Box>
          )}
        </Box>
      ) : (
        <Grid container spacing={isMobile ? 3 : 5}>
          {allCards.map((item, index) => (
            <Grid item lg={4} md={6} xs={12} key={index}>
              <GalleryCard
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
          {allCards.length === 0 || isMobile ? null : (
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
                  openEditingDialog(emptyGallery);
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
export default Gallery;
