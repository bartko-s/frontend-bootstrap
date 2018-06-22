"use strict";

// global css
require("./css/base.scss");

console.log("Hi");

// React Test
import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';

ReactDOM.render(<App />, document.getElementById('react-root'));
