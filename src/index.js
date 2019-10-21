import React from 'react';
import ReactDOM from 'react-dom';

import URLShortener from './URLShortener.jsx';

ReactDOM.render(
	<div>
		<URLShortener />
	</div>,
	document.getElementById('app')
);

module.hot.accept();