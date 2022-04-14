import { Container, Box, Typography, Grid } from "@material-ui/core";
import React, { ChangeEvent, useContext } from "react";
import { getFileFromUrl, IImageSet } from "../../../api/imagesApi";
import { FilledTextInput, FilledTextInputMobile } from "../../../styledComponents/FilledTextInput/FilledTextInput";
import { theme } from "../../../theme";
import { IGalleryModel } from "../../Gallery/Models";
import ImagesLoader from "../../ImagesLoader/ImagesLoader";
import Button from "../../../styledComponents/Button";
import { DeviceContext } from "../../../App";

interface IProps extends IGalleryModel {
  onSave: (card: IGalleryModel, isEdit: boolean) => void;
  onCancel: () => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

const GalleryDialogContent = ({
  name,
  onSave,
  onCancel,
  description,
  image_url,
  id,
  isEdit = true,
  isLoading = false,
}: IProps) => {
  const { isMobile, isPad } = useContext(DeviceContext);
  const [imageFile, setImageFile] = React.useState<IImageSet>();
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  let galleryCardImageUrl = "";
  const [editingCard, setEditingCard] = React.useState<IGalleryModel>({
    name,
    description,
    image_url,
    id,
  });
  const editInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingCard({ ...editingCard, [event.target.name]: event.target.value });
  };
  const [isImageFileLoading, setIsImageFileLoading] = React.useState(false);

  React.useEffect(() => {
    editingCard.image_url &&
      (async () => {
        try {
          setIsImageFileLoading(true);
          const file = await getFileFromUrl(editingCard.image_url as string);
          console.log(file);
          setImageFile(file);
        } catch {
        } finally {
          setIsImageFileLoading(false);
        }
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container
      style={{
        backgroundColor: "#FFF",
        borderRadius: 12,
      }}
    >
      <Box paddingY={isMobile ? 1 : 4} paddingX={isMobile ? 0 : 4} width={"100%"}>
        {isMobile ?
          <Box textAlign="center">
            <Typography
              style={{
                color: "#191E34",
                paddingTop: 16,
                paddingBottom: 24,
                fontSize: 18,
              }}
            >
              Создать объявление
            </Typography>
          </Box>
          : null
        }

        <Grid container>
          <Grid item md={12} sm={12} xs={12} lg={7}>
            <Box textAlign="left">
              {isMobile ? (
                <FilledTextInputMobile
                  onChange={editInputHandler}
                  variant="filled"
                  value={editingCard.name}
                  multiline
                  name="name"
                  fullWidth
                  label="Название"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <FilledTextInput
                  onChange={editInputHandler}
                  variant="filled"
                  value={editingCard.name}
                  multiline
                  name="name"
                  fullWidth
                  label="Название"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </Box>
            <Box textAlign="left" marginTop={3}>
              {isMobile ? (
                <FilledTextInputMobile
                  onChange={editInputHandler}
                  variant="filled"
                  value={editingCard.description}
                  name="description"
                  fullWidth
                  label="Описание"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows={1}
                />
              ) : (
                <FilledTextInput
                  onChange={editInputHandler}
                  variant="filled"
                  value={editingCard.description}
                  name="description"
                  fullWidth
                  label="Описание"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows={6}
                />
              )
              }
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={5}>
            <Box marginX={isPad ? 0 : 2} marginTop={isPad ? 3 : 4.5}>
              {!isImageFileLoading && (
                <ImagesLoader
                  onInitLoading={() => {
                    setIsImageLoading(true);
                  }}
                  onFinishLoading={() => {
                    setIsImageLoading(false);
                  }}
                  context="gallery"
                  onLoadChanger={(urls: string[]) => {
                    urls.length !== 0 &&
                      (() => {
                        galleryCardImageUrl = urls[0];
                      })();
                  }}
                  initialPhotoFiles={imageFile ? [imageFile] : []}
                  filesLimit={1}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display={isPad ? "block" : "flex"} width={"100%"} marginTop={3}>
          <Box
            style={{
              width: !isPad ? "50%" : "100%",
            }}
            paddingRight={isPad ? 0 : 1}
            marginTop={1}
          >
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor:
                  isLoading || isImageLoading
                    ? theme.palette.secondary.main
                    : theme.palette.primary.dark,
              }}
              onClick={() => {
                onSave(
                  {
                    ...editingCard,
                    image_url: galleryCardImageUrl || editingCard.image_url,
                  },
                  !!isEdit
                );
              }}
              variant="contained"
              disableElevation
              disabled={isLoading || isImageLoading}
            >
              <Typography style={{ color: "#FFF", fontSize: isPad ? 14 : 24 }}>
                Сохранить
              </Typography>
            </Button>
          </Box>
          <Box
            style={{
              width: !isPad ? "50%" : "100%",
            }}
            marginTop={isPad ? 0 : 1}
            paddingLeft={isPad ? 0 : 1}
          >
            <Button
              fullWidth
              style={{
                textTransform: "none",
                borderRadius: 12,
                minHeight: 61,
                backgroundColor: isMobile ? "transparent" : theme.palette.primary.light,
              }}
              onClick={onCancel}
              variant="contained"
              disableElevation
              disabled={isLoading || isImageLoading}
            >
              <Typography
                style={{ color: "#626870", fontSize: isPad ? 14 : 24 }}
              >
                Отменить
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default GalleryDialogContent;
