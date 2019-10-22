import React, { Component } from "react";
import ReactDOM from "react-dom";
import URLShortener from './URLShortener.jsx';
import constants from "constants";

class TestCases extends URLShortener 
{
	constructor(props) {
		super(props);			
		
		this.state=
		{
			test:true,
			input:{},
			URL_Long:"",
			URL_Short:""
		}
	}
	
	componentDidMount()
	{
		this.setState({input:document.getElementById("urlLong")});		
	}
	
	NormalURL(){
		this.state.input.value="http://www.apple.com/iphone-7/";
		this.setState({URL_Long:"http://www.apple.com/iphone-7/"});		
		this.ShortenURL();
		
	}
	
	MissingHTTP()
	{
		console.log("MissingHTTP");
		this.state.input.value="www.apple.com/iphone-7/";
		this.setState({URL_Long:"www.apple.com/iphone-7/"});	
		this.ShortenURL();
	}
	Missingcom()
	{
		console.log("MissingHTTP");
		this.state.input.value="http://www.apple";
		this.setState({URL_Long:"http://www.apple"});	
		this.ShortenURL();
	}
	
	render() {
		if(this.state.URL_Short != ""){
			alert("Opening " + this.state.URL_Short);
			window.open(this.state.URL_Short,'', 'noopener=true');
			this.setState({URL_Short:""});
		}
		return (
			<div>
				<h1>Test Cases</h1>
				<div>
					<button onClick={this.NormalURL.bind(this)}>Normal URL</button>
					<br />
					<button onClick={this.MissingHTTP.bind(this)}>Missing HTTP</button>
					<br />
					<button onClick={this.Missingcom.bind(this)}>Missing .com</button>
				</div>
			</div>);
	}
}

export default TestCases;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<TestCases />, wrapper) : false;