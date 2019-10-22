var TinyURL = require('tinyurl');
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';

import { createShortUrl } from "./APIHelper";

class URLShortener extends React.Component {	
	constructor(props) {
		super(props);		
		
		this.ShortenURL = this.ShortenURL.bind(this);
				
		this.state={
			URL_Long:"",
			URL_Long_OK:false,
			URL_Short:"",
			apiUrl: "http://localhost:7000/api/",
			baseUrl: "http://localhost"
		}
	}
	
	ValidateURL(url)
	{
		console.log("ValidateURL");
		if(url === "undefined" || url==="") {
			alert("URL Input is Empty");
			return false;		
		}
		
		if(!url.includes("http://"))
		{
			url = "https://" + url;
		}
		
		//using RegEx code to verify that the URL is properly formatted
		let regex = new RegExp(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/gm);
				
		
		if(regex.test(url)){
			this.setState({URL_Long:url});			
			return true;
		}
		else
		{		
			alert("Invalic URL");
			return false;
		}
	}
	
	BuildShortURL()
	{		
		console.log("BuildShortURL");
		
		let url = this.state.apiUrl + "item"
		
		axios.post(url)
		.then((response)=>{
			console.log(response);
		})
		.catch((error)=>
		{
			alert(error);
		});
		
	}
	
	GetLongURL()
	{
		console.log("GetLongURL");
	  axios.get(this.state.URL_Long)
		.then((response) => {
			if(response.status==200)
			{
				this.setState({URL_Long_OK:true});
				this.BuildShortURL();
			}
		})
		.catch((error)=>{console.log(error)})
	}
	
	ShortenURL()
	{
		console.log("ShortenURL");
		//main function for shortening URL
		let valid = this.ValidateURL(document.getElementById("urlLong").value);
		if(valid)
		{
			//set up shortened url
			this.GetLongURL();
		}
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
				<button onClick={this.ShortenURL.bind(this)} > Shorten </button>
				{result}
			</div>);
	}
}

export default URLShortener;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<URLShortener />, wrapper) : false;
