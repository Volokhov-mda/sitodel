import { ReactElement, useEffect, useState } from "react";
import { Box } from "@material-ui/core";
// import {useDropZoneStyles} from '../../Components/FormEvent/FormEventStyles';
import { useSnackbar } from "notistack";
import { AlertType, DropzoneArea } from "material-ui-dropzone";
import { IImageSet, imagesApi } from "../../api/imagesApi";
import { ReactComponent as UploadPlusIcon } from "./icons/uploadPlusIcon.svg";
import { notificationsText } from "../MySite/notificationTexts";

interface IProps {
  onLoadChanger: (urls: string[]) => void;
  initialPhotoFiles: IImageSet[];
  context?: string;
  filesLimit: number;
  isAnimateHover?: boolean;
  onInitLoading?: () => any;
  onFinishLoading?: () => any;
}
const ImagesLoader = (props: IProps) => {
  const {
    onLoadChanger,
    initialPhotoFiles: eventInitialPhotoFiles,
    filesLimit,
    context = "profile",
    isAnimateHover = false,
    onInitLoading = () => {},
    onFinishLoading = () => {},
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [eventPhotoFiles, setEventPhotoFiles] = useState<File[]>([]);
  const [eventUrls, setEventUrls] = useState<string[]>(
    eventInitialPhotoFiles.map((x) => x.url)
  );
  useEffect(() => {
    eventPhotoFiles.length && getPhotosUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventPhotoFiles]);
  const deletePhoto = async (file: File) => {
    if (eventInitialPhotoFiles) {
      const index = eventInitialPhotoFiles.map((x) => x.file).indexOf(file);
      if (index > -1) {
        // try {
        //     imagesApi.deleteImage(eventInitialPhotoFiles[index].url);
        // } catch {}
        setEventUrls(
          eventUrls.filter((x) => x !== eventInitialPhotoFiles[index].url)
        );
        eventPhotoFiles &&
          setEventPhotoFiles(
            eventPhotoFiles.filter(
              (x) => x !== eventInitialPhotoFiles[index].file
            )
          );
      }
    }
  };

  useEffect(() => {
    onLoadChanger(eventUrls);
  }, [eventUrls, onLoadChanger]);

  const [displayableImg, setDisplayableImg] = useState<string>();
  const getPhotosUrl = async () => {
    if (eventPhotoFiles?.length) {
      setIsImagesLoading(true);
      try {
        const fr = new FileReader();
        fr.readAsDataURL(eventPhotoFiles[eventPhotoFiles.length - 1]);
        fr.onload = function (e) {
          setDisplayableImg(fr.result as string);
        };
        onInitLoading();
        const urls: string[] = await Promise.all(
          eventPhotoFiles.map((photo) => {
            if (
              eventInitialPhotoFiles &&
              eventInitialPhotoFiles.map((x) => x.file).indexOf(photo) > -1
            ) {
              return eventInitialPhotoFiles.filter((x) => x.file === photo)[0]
                .url as string;
            } else {
              const resp = imagesApi.loadImage(photo, context);
              if (!resp) {
                throw Error("");
              }
              enqueueSnackbar(notificationsText.defaultAlerts.dataLoaded, {
                variant: "success",
              });
              return resp;
            }
          })
        );
        if (urls.length) {
          setEventUrls(urls);
        }
      } catch {
        enqueueSnackbar(notificationsText.defaultAlerts.dataLoadingError, {
          variant: "error",
        });
      } finally {
        setIsImagesLoading(false);
        onFinishLoading();
      }
    } else {
      enqueueSnackbar(notificationsText.filesLoding.noSelectedFiles, {
        variant: "info",
      });
    }
  };
  const onAlert = (message: string, type: AlertType) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };
  return (
    <Box marginTop={0} marginX={0}>
      <Box position="relative">
        <Box position="absolute" width="100%" height="100%">
          <DropzoneArea
            dropzoneText=""
            filesLimit={filesLimit}
            maxFileSize={10000000}
            acceptedFiles={["image/png", "image/jpeg"]}
            onChange={setEventPhotoFiles}
            showPreviews
            initialFiles={[]}
            showPreviewsInDropzone={true}
            getFileLimitExceedMessage={(filesLimit: number) =>
              `Ошибка: Максимальное количество файлов - ${filesLimit}`
            }
            getFileAddedMessage={(name: string) => `Файл ${name} добавлен`}
            getFileRemovedMessage={(name: string) =>
              parseFloat(name) ? "Файл удален" : `${name} удален`
            }
            onAlert={onAlert}
            onDelete={deletePhoto}
            showAlerts={false}
            previewText=""
            Icon={
              (() => (
                <UploadPlusIcon
                  stroke={"#FFF"}
                  style={{
                    zIndex: 31,
                    position: "relative",
                  }}
                />
              )) as unknown as ReactElement
            }
          />
        </Box>
        <Box
          width={"100%"}
          height={"304px"}
          style={{
            backgroundColor: "#EAEEF3",
            borderRadius: 12,
            position: "relative",
            pointerEvents: "none",
          }}
        >
          {displayableImg || eventUrls[eventUrls.length - 1] ? (
            <img
              style={{
                borderRadius: 12,
                width: "100%",
                height: 304,
                objectFit: "cover",
              }}
              src={displayableImg || eventUrls[eventUrls.length - 1]}
            />
          ) : (
            <UploadPlusIcon
              stroke={"#FFF"}
              style={{
                zIndex: 31,
                position: "absolute",
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "50%",
              }}
            />
          )}
        </Box>
      </Box>

      {/* <label htmlFor="input-logo">
        <Box marginTop={2}>
          <Tooltip title="Загрузить медиавложения" aria-label="load">
            <Button
              variant="contained"
              onClick={getPhotosUrl}
              color={isImagesLoading ? "default" : "primary"}
            >
              {isImagesLoading ? (
                <CircularProgress size="1rem" />
              ) : (
                <CloudUploadIcon />
              )}
            </Button>
          </Tooltip>
        </Box>
      </label> */}
    </Box>
  );
};

export default ImagesLoader;
