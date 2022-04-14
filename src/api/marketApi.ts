import axios from "axios";
import { apiUrl } from "../Consts/Urls";
import { IMarketCard } from "../Marketplace/Marketplace";

export const marketApi = {
  get: (offset: string = "0", limit: string = "20", searchTerm:string, minRank: number): Promise<IMarketCard[]> =>
    axios
      .get(`${apiUrl}/marketplace/`, {
        params: {
          offset,
          limit,
          search_term: searchTerm,
          min_rank: minRank
        },
      })
      .then(({ data }) => data),
};
