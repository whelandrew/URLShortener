var TinyURL = require('tinyurl');
import React, { Component } from "react";
import ReactDOM from "react-dom";

class URLShortener extends React.Component {	
	constructor(props) {
		super(props);		
		
		this.state={
			URL_Long:"",
			URL_Long_OK:false,
			URL_Short:""
		}
	}
	
	CreateRandomString()
	{
		//build the random string for the shortened URL
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
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
		console.log("BuildShortURL");
		/*
		//TODO : Not the best solution?
		let hash = this.CreateRandomString();
		
		fetch(this.state.URL_Long  + hash,{
			method: "POST",
		})
		.then(res => res.json())
		.then(
			(result) => {
				
        },
        (error) => {
          console.log(error);
        }
      )
	  */
	  
	  TinyURL.shorten(this.state.URL_Long)
		.then(function(res) {
			let link = document.getElementById("shortenedURL");
			link.innerHTML="Your new URL : <a href='"+res+"' target='_blank'>"+res;
		}, function(err) {
			alert(err);
		})
	}
	
	GetLongURL()
	{
		console.log("GetLongURL " + this.state.URL_Long);
		fetch(this.state.URL_Long)
		.then(res => this.setState({URL_Long_OK:res.statusText=="OK"}))
		.then(
			(result) => {
				if(this.state.URL_Long_OK)
				{
					console.log("URL found");
					this.BuildShortURL();
				}
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
	}
	
	ShortenURL()
	{
		//main function for shortening URL
		console.log("ShortenURL ");			
		
		let valid = this.ValidateURL(document.getElementById("urlLong").value);
		if(valid)
		{
			//set up shortened url
			this.GetLongURL();
		}
		else
		{
			alert("This is not a valid URL");
			//something was wrong with the posted url
		}		
	}

	render() {
		return (
			<div>
				<h1>URL Shortener</h1>
				Type or Copy/Paste Your URL : <input id="urlLong" type="text" name="URL_Long" value="http://www.apple.com/iphone-7/"/>
				<br />
				<button onClick={this.ShortenURL.bind(this)} > Shorten </button>
				<div id="shortenedURL"> </div>
			</div>);
	}
}

export default URLShortener;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<URLShortener />, wrapper) : false;
