import axios from "axios";
import constants from "constants";
axios.defaults.baseURL = constants.apiUrl;
export const createShortUrl = obj => {
  const requestUrl = "item";
  return axios.post(requestUrl, obj);
};