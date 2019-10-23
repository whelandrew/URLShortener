var TinyURL = require('tinyurl');
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {linkToShortUrl} from "./Rerouter";;
import { createShortUrl } from "./APIHelper";
import constants from "./config/constants";

class URLShortener extends React.Component {	
	constructor(props) {
		super(props);	
				
		this.state={
			URL_Short:"",
			urlCode:""
		}
	}

	SetRequests()
	{
		let reqObj = {
			originalUrl: document.getElementById("urlLong").value,
			shortBaseUrl: constants.baseUrl
		};
		
		this.BuildShortURL(reqObj);
	}

	BuildShortURL(val)		
	{	
		createShortUrl(val)
        .then(json => {			
		  this.setState({URL_Short:json.data.shortUrl});
		  this.setState({urlCode:json.data.urlCode});
        })
        .catch(error => {
			alert(error.response.data);
        });
	}
	
	RerouteURL(state)
	{
		let params = {
			code: state.urlCode
		}
		linkToShortUrl(params)
		.then((json)=>{
			//open redirect item
			window.open(json.config.url);
		})
        .catch(error => {
			alert(error.response.data);          
        });		
	}

	render() {
		let result;
		if(this.state.URL_Short !="")
		{
			result = <div> Your Shortened URL : <button id="results" onClick={()=>{this.RerouteURL(this.state)}}>{this.state.URL_Short}</button></div>
		}
		return (
			<div>
				<h1>URL Shortener</h1>
				Type or Copy/Paste Your URL : <input id="urlLong" type="text" name="URL_Long"/>
				<br />
				<button onClick={this.SetRequests.bind(this)} > Shorten </button>
				{result}
			</div>);
	}
}

export default URLShortener;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<URLShortener />, wrapper) : false;
