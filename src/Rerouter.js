import axios from "axios";
import constants from "constants";
axios.defaults.baseURL = constants.apiUrl;

export const linkToShortUrl = obj => {	
	const requestUrl ="item/"+obj.code;
	return axios.get(requestUrl);
}