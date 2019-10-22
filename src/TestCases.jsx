import React, { Component } from "react";
import ReactDOM from "react-dom";
import URLShortener from './URLShortener.jsx';
import constants from "constants";

class TestCases extends URLShortener 
{
	constructor(props) {
		super(props);		
	}
	
	componentDidMount()
	{
		this.setState({input:document.getElementById("urlLong")});		
	}
	
	NormalURL(){	
		document.getElementById("urlLong").value = "http://www.apple.com/iphone-7/";
		this.BuildShortURL();		
	}
	
	MissingHTTP()
	{
		console.log("MissingHTTP");
		document.getElementById("urlLong").value = "www.apple.com/iphone-7/";
		this.BuildShortURL();
	}
	Missingcom()
	{
		console.log("MissingHTTP");
		document.getElementById("urlLong").value = "http://www.apple";
		this.BuildShortURL();
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