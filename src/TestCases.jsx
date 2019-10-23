import React, { Component } from "react";
import ReactDOM from "react-dom";
import URLShortener from './URLShortener.jsx';

class TestCases extends URLShortener 
{
	constructor(props) {
		super(props);		
		
		this.state={
			URL_Short:"",
			urlCode:""
		}
	}
	
	componentDidMount()
	{
		this.setState({input:document.getElementById("urlLong")});		
	}
	
	NormalURL()
	{			
		let reqObj = {
			originalUrl: "https://www.google.com/",
			shortBaseUrl: "http://localhost"
		};		
		
		document.getElementById("urlLong").value = reqObj.originalUrl;
	}
	
	MissingHTTP()
	{		
		let reqObj = {
			originalUrl: "www.apple.com/iphone-7/",
			shortBaseUrl: "http://localhost"
		};		
		document.getElementById("urlLong").value = reqObj.originalUrl;
	}
	
	BadURL()
	{
		let reqObj = {
			originalUrl: "qwertksls.dot",
			shortBaseUrl: "http://localhost"
		};		
		
		document.getElementById("urlLong").value = reqObj.originalUrl;
	}
	
	render() {
		return (
			<div>
				<h1>Test Cases</h1>
				<div>
					<button onClick={this.NormalURL.bind(this)}>Normal URL</button>
					<br />
					<button onClick={this.MissingHTTP.bind(this)}>Missing HTTP</button>
					<br />
					<button onClick={this.BadURL.bind(this)}>Bad URL</button>
				</div>
			</div>);
	}
}

export default TestCases;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<TestCases />, wrapper) : false;