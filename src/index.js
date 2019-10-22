import React from 'react';
import ReactDOM from 'react-dom';

import URLShortener from './URLShortener.jsx';
import TestCases from './TestCases.jsx';

ReactDOM.render(
	<div>
		<URLShortener />
		<TestCases />
	</div>,
	document.getElementById('app')
);

module.hot.accept();