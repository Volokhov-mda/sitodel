import axios from "axios";
import imageCompression from "browser-image-compression";
import { apiUrl } from "../Consts/Urls";

export const imagesApi = {
  loadImage: async (data: File, context: string): Promise<string> => {
    const compressOptions = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
    };
    const toBase64 = (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    return axios
      .post(`${apiUrl}/files/upload/`, {
        context,
        image: {
          ext: "jpg",
          // content: new Uint8Array(imData),
          content: await toBase64(
            await imageCompression(data, compressOptions)
          ),
        },
      })
      .then((resp) => resp.data);
  },
  deleteImage(payload?: string): Promise<boolean> {
    return axios
      .delete(`${apiUrl}/files/delete/`, {
        data: {
          image_url: payload,
        },
      })
      .then((resp) => resp.status === 200)
      .catch((_) => false);
  },
};

export const getFileFromUrl = async (
  url: string,
  name?: string,
  defaultType: string = "image/jpeg"
): Promise<IImageSet> => {
  return {
    url
  }
  const response = await fetch(url, {headers: {
    mode: 'cors',
  }});
  const data = await response.blob();

  // const response = await axios.get(url, {
  //   responseType: "blob",
  //   headers: {
  //     // Authorization: "",
  //   },
  // });
  // const data = response.data;
  return {
    file: new File([data], name || Math.random().toString(), {
      type: response.headers.get("content-type") || defaultType,
    }),
    url,
  };
};

export interface IImageSet {
  file?: File;
  url: string;
}
