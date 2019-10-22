import React from 'react';
import ReactDOM from 'react-dom';

import URLShortener from './URLShortener.jsx';
import TestCases from './TestCases.jsx';

import axios from "axios";
import constants from "./config/constants";
axios.defaults.baseURL = constants.apiUrl;
export const createShortUrl = obj => {
  const requestUrl = "item";
  return axios.post(requestUrl, obj);
};

ReactDOM.render(
	<div>
		<URLShortener />
		<TestCases />
	</div>,
	document.getElementById('app')
);

module.hot.accept();