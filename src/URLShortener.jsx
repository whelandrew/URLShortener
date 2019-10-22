var TinyURL = require('tinyurl');
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class URLShortener extends React.Component {	
	constructor(props) {
		super(props);		
		
		this.state={
			Endpoint:"https://www.jsonstore.io/0a0a2a040bf84c3ce45a12f0c53fd111f0433479eda96f13fa0d5ccfe73e452e",
			Request:"",
			URL_Long:"",
			URL_Long_OK:false,
			URL_Short:""
		}
	}
	CreateNewAddress() {    
		var text = "";    
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";   
		for (var i = 0; i < 5; i++)        
		{
			text += possible.charAt(Math.floor(Math.random() * possible.length));    
		}
		
		return text;
	}
	
	ValidateURL(url)
	{
		if(url === "undefined" || url==="") {
			alert("URL Input is Empty");
			return false;		
		}
		
		if(url === this.state.URL_Long)
		{
			if(this.state.URL_Long_OK)
			{
				alert("This URL has already been validated.");
				return true;
			}
			else
			{
				alert("This URL is identical to the one just entered.")
			}
		}
		
		//using RegEx code to verify that the URL is properly formatted
		let regex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
				
		
		if(regex.test(url)){
			this.setState({URL_Long:url});			
			return true;
		}
		else
		{		
			return false;
		}
	}
	
	BuildShortURL()
	{
		//using jsonstore.io to generate my own short URL. The server was to unstable for constant use.
		/*
		this.setState({Request:this.state.Endpoint + "/" + this.CreateNewAddress().substr(1)});
		
		axios.post(this.state.Request, {
			longURL : JSON.stringify(this.state.URL_Long)
		})
		.then((response)=>{
			console.log(response);
			axios.get(this.state.Request)
			.then((resoibse)=>{
				console.log(response);
				this.setState({URL_Short:reponse.result.longurl});
			})
			.catch((error)=>
			{
				console.log(error);
			})
		})
		.catch((error)=>
		{
			console.log(error)
		});
		*/
	  
		TinyURL.shorten(this.state.URL_Long)		//.then(function(res) {
		.then((res) => {
			this.setState({URL_Short:res});		
		}, function(err) {
			alert(err);
		})
	}
	
	GetLongURL()
	{
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
			result = <div> Your Shortened URL : <a href={this.state.URL_Short} target="_blank">{this.state.URL_Short}</a></div>
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
