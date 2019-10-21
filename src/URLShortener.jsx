import React, { Component } from "react";
import ReactDOM from "react-dom";

class URLShortener extends React.Component {	
	constructor(props) {
		super(props);
	}

	render() {
		return (<div><h1>URL Shortener</h1></div>);
	}
}

export default URLShortener;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<URLShortener />, wrapper) : false;
