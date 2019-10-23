'use strict';

function isValid(val)
{
		if (!val)	return;

        // check for illegal characters
        if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(val)) return;
		
		if(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(val))
		{
			
		}
		
		return true;
}

module.exports = isValid;
module.exports.isValid = isValid;