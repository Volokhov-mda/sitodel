import axios from "axios";
import { apiUrl } from "../Consts/Urls";

export const mySiteApi = {
  getMySite: async (name?: string) =>
    axios
      .get(name ? `${apiUrl}/mysite/${name}/` : `${apiUrl}/mysite/`, {
        headers: name
          ? {
              Authorization: "",
            }
          : undefined,
      })
      .then(async ({ data }) => {
        if (!data) {
          return;
        }

        let resp;
        try {
          resp = {
            ...data[0],
            color: (() => {
              switch (data[0].color) {
                // Blue, LightBlue, Green, Purple, Red or Orange
                case "Blue":
                  return "#2F80ED";
                case "LightBlue":
                  return "#2D9CDB";
                case "Green":
                  return "#219653";
                case "Purple":
                  return "#9B51E0";
                case "Red":
                  return "#EB5757";
                case "Orange":
                  return "#F2994A";
                default:
                  return "#123";
              }
            })(),
          };
        } catch {
          resp = {
            ...data,
            color: (() => {
              switch (data.color) {
                // Blue, LightBlue, Green, Purple, Red or Orange
                case "Blue":
                  return "#2F80ED";
                case "LightBlue":
                  return "#2D9CDB";
                case "Green":
                  return "#219653";
                case "Purple":
                  return "#9B51E0";
                case "Red":
                  return "#EB5757";
                case "Orange":
                  return "#F2994A";
                default:
                  return "#123";
              }
            })(),
          };
        }
        return resp;
      }),
  saveMySite: async (mySiteData: any) =>
    axios[(await mySiteApi.getMySite())?.name ? "put" : "post"](
      `${apiUrl}/mysite/`,
      {
        ...mySiteData,
        // id: 2,
        color: (() => {
          switch (mySiteData.color) {
            // Blue, LightBlue, Green, Purple, Red or Orange
            case "#2F80ED":
              return "Blue";
            case "#2D9CDB":
              return "LightBlue";
            case "#219653":
              return "Green";
            case "#9B51E0":
              return "Purple";
            case "#EB5757":
              return "Red";
            case "#F2994A":
              return "Orange";
            default:
              return "";
          }
        })(),
      }
    ),

  deleteOrder: async (id: number) =>
    axios
      .delete(`${apiUrl}/crm/order/`, {
        data: {
          id,
        },
      })
      .then(() => true)
      .catch(() => false),
  editOrder: async (order: any) =>
    axios
      .put(`${apiUrl}/crm/order/`, order)
      .then(() => true)
      .catch(() => false),
  createNewOrder: async (order: any, site?: string) => {
    delete order["id"];
    return axios
      .post(`${apiUrl}/crm/order/`, {
        ...order,
        status: order?.status || "Новая",
        site,
      })
      .then(() => true)
      .catch(() => false);
  },

  getStat: async () =>
    axios.get(`${apiUrl}/crm/orderstatus/`).then(({ data }) => data),
  getApplications: async (page = 0, limit = 10) =>
    axios
      .get(`${apiUrl}/crm/order/`, {
        params: {
          offset: (page * limit).toString(),
          limit: limit.toString(),
        },
      })
      .then((resp) => {
        console.error(resp);
        page === 0 && document.dispatchEvent(
          new CustomEvent<{ isNewApplications?: boolean }>("update-user-total-applications", {
            detail: { isNewApplications: resp.data?.orders[0]?.status === "Новая" },
          })
        );
        return {
          data: resp.data.orders,
          total: resp.data.total,
        };
      }),
};
