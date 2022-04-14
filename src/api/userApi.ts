import { IGalleryModel } from "./../components/Gallery/Models";
import { IPriceModel } from "./../components/PriceCard/Models";
import axios, { AxiosError } from "axios";
import { apiUrl } from "../Consts/Urls";

import {
  Tokens,
  User,
  UserLogginData,
  UserRegistrationData,
} from "../store/ducks/user/store/state";
import { notificationsText } from "../components/MySite/notificationTexts";
export const userApi = {
  fetchPricelist(userId?: string): Promise<IPriceModel[]> {
    return axios
      .get(
        `${apiUrl}${
          !userId
            ? "/accounts/pricelist/"
            : `/accounts/view/pricelist/${userId}`
        }`
      )
      .then(({ data }) => data);
  },
  deletePriceListCard(id: string): Promise<boolean> {
    return axios
      .delete(`${apiUrl}/accounts/pricelist/`, { data: { id } })
      .then((resp) => true)
      .catch(() => false);
  },
  updatePricelistCard: (data: IPriceModel): Promise<boolean> =>
    axios
      .put(`${apiUrl}/accounts/pricelist/`, data)
      .then((resp) => true)
      .catch(() => false),
  createPricelistCard: (data: IPriceModel): Promise<boolean> =>
    axios
      .post(`${apiUrl}/accounts/pricelist/`, { ...data, id: undefined })
      .then((resp) => true)
      .catch(() => false),
  fetchGallery(userId?: string): Promise<IGalleryModel[]> {
    return axios
      .get(
        `${apiUrl}${
          !userId ? "/accounts/gallery/" : `/accounts/view/gallery/${userId}`
        }`
      )
      .then(({ data }) => data);
  },
  deleteGalleryCard(id: string): Promise<boolean> {
    return axios
      .delete(`${apiUrl}/accounts/gallery/`, { data: { id } })
      .then((resp) => true)
      .catch(() => false);
  },
  updateGalleryCard: (data: IGalleryModel): Promise<boolean> =>
    axios
      .put(`${apiUrl}/accounts/gallery/`, data)
      .then((resp) => true)
      .catch(() => false),
  createGalleryCard: (data: IGalleryModel): Promise<boolean> =>
    axios
      .post(`${apiUrl}/accounts/gallery/`, { ...data, id: undefined })
      .then((resp) => resp.status === 201)
      .catch(() => false),
  saveuserProfile: (data: User): Promise<boolean> =>
    axios
      .post(`${apiUrl}/accounts/profile/`, data)
      .then((resp) => true)
      .catch(() => false),
  fetchUserTokens(payload: UserLogginData): Promise<Tokens> {
    return axios
      .post(`${apiUrl}/token/`, {
        username: payload.email,
        password: payload.password,
      })
      .then(({ data }) => ({
        accessToken: data.access,
        refreshToken: data.refresh,
      }));
  },
  fetchUserData(userId?: string): Promise<User> {
    return axios
      .get(
        `${apiUrl}${
          !userId ? "/accounts/profile/" : `/accounts/view/profile/${userId}`
        }`
      )
      .then(({ data }) => data);
  },
  fetchNewTokens(payload: string): Promise<Tokens> {
    return axios
      .post(`${apiUrl}/token/refresh/`, { refresh: payload })
      .then(({ data }) => ({
        accessToken: data.access || "",
        refreshToken: data.refresh || "",
      }));
  },
  deleteToken(payload: string) {
    axios.delete(`${apiUrl}/auth/token`, {
      data: { refreshToken: payload },
    });
  },
  resetPassword(password: string, q: any) {
    return axios
      .post(`${apiUrl}/auth/reset-password/`, {
        ...q,
        password,
      })
      .then(() => true)
      .catch((resp: AxiosError) => resp.response?.data?.detail);
  },
  sendResetPasswordEmail(email: string) {
    return axios
      .post(`${apiUrl}/auth/send-reset-password-link/`, {
        email,
      })
      .then(() => true)
      .catch((resp: AxiosError) => resp.response?.data?.detail);
  },
  regUser(payload: UserRegistrationData): Promise<boolean | string> {
    return (
      axios
        // .post(`${apiUrl}/api/auth/signup`, qs.stringify(payload), {
        //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // })
        .post(`${apiUrl}/auth/register/`, {
          password: payload.password,
          username: payload.email,
          email: payload.email,
          password_confirm: payload.password2,
        })
        .then((resp) => {
          return true;
        })
        .catch((err: AxiosError) => {
          const errData = err.response?.data;
          if (!Object.keys(errData).length) {
            return "Произошла неизвестная ошибка регистрации";
          }
          try {
            const err = errData[Object.keys(errData)[0]][0];
            console.error(err);
            switch (err) {
              case "Enter a valid email address.":
                return notificationsText.defaultAlerts.incorrectEmail;
              case "This password is too short. It must contain at least 8 characters.":
                return notificationsText.account.passwordIsTooShort;
              case "This password is too common.":
                return notificationsText.account.passwordIsTooSimple;
              // case :
              // return notificationsText.account.passwordIsTooShort;
              default:
                break;
            }
            if (err?.includes("password")) {
              return notificationsText.account.passwordIsTooSimple;
            }
            return "Произошла ошибка регистрации";
          } catch {
            return "Произошла ошибка регистрации";
          }
          // for (const key in errData) {
          //   if (Object.prototype.hasOwnProperty.call(errData, key)) {
          //     return errData.key[0] || "";
          //   }
          // }
          // for (const [, val] of Object.entries(errData)) {
          //   return val;
          // }
          // if (errData?.email) {
          //   return errData?.email;
          // }
        })
    );
  },
};
