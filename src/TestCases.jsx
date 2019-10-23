import React, { Component } from "react";
import ReactDOM from "react-dom";
import URLShortener from './URLShortener.jsx';

class TestCases extends URLShortener 
{
	constructor(props) {
		super(props);		
	}
	
	componentDidMount()
	{
		this.setState({input:document.getElementById("urlLong")});		
	}
	
	NormalURL()
	{			
		let reqObj = {
			originalUrl: "http://www.apple.com/iphone-7/",
			shortBaseUrl: "http://localhost"
		};		
		
		this.BuildShortURL(reqObj);
	}
	
	MissingHTTP()
	{		
		let reqObj = {
			originalUrl: "www.apple.com/iphone-7/",
			shortBaseUrl: "http://localhost"
		};		
		
		this.BuildShortURL(reqObj);
	}
	
	Missingcom()
	{
		let reqObj = {
			originalUrl: "www.apple",
			shortBaseUrl: "http://localhost"
		};		
		
		this.BuildShortURL(reqObj);
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
					<button onClick={this.Missingcom.bind(this)}>Missing .com</button>
				</div>
			</div>);
	}
}

export default TestCases;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<TestCases />, wrapper) : false;