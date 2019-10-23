'use strict';

function generateshort() 
{
	var text = "";
	var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";

	for (var i = 0; i < 5; i++)
	{
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

module.exports = generateshort;
module.exports.generateshort = generateshort;