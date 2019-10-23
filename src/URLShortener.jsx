var TinyURL = require('tinyurl');
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createShortUrl } from "./APIHelper";
import constants from "./config/constants";

class URLShortener extends React.Component {	
	constructor(props) {
		super(props);	
				
		this.state={
			URL_Short:""
		}
	}

	BuildShortURL()		
	{
		let reqObj = {
			originalUrl: document.getElementById("urlLong").value,
			shortBaseUrl: constants.baseUrl
		};
		
		createShortUrl(reqObj)
        .then(json => {
          setTimeout(() => {
			  console.log(json.data);
            this.setState({
              showLoading: false,
              showShortenUrl: true,
              shortenUrl: json.data.shortUrl,
			  useNewUrlParser: true
            });
          }, 0);
		  this.setState({URL_Short:json.data.shortUrl});
        })
        .catch(error => {
			alert(error.response.data);
          this.setState({
            showLoading: false,
            showApiError: true,
            apiError: "Server Error"
          });
        });
	}

	render() {
		let result;
		if(this.state.URL_Short !="")
		{
			result = <div id="results"> Your Shortened URL : <a href={this.state.URL_Short} target="_blank">{this.state.URL_Short}</a></div>
		}
		return (
			<div>
				<h1>URL Shortener</h1>
				Type or Copy/Paste Your URL : <input id="urlLong" type="text" name="URL_Long"/>
				<br />
				<button onClick={this.BuildShortURL.bind(this)} > Shorten </button>
				{result}
			</div>);
	}
}

export default URLShortener;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<URLShortener />, wrapper) : false;
