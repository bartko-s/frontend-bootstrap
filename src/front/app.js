"use strict";

// global css
require("./css/base.css");

import $ from 'jquery';

(() => {
    let elm = $('.counter');
    setInterval(() => {
        elm.text(parseInt(elm.text()) + 1);
    }, 1000);
})();

console.log("Hi");

// React Test
import React from 'react';
import {render} from 'react-dom';
import MyReactComponent from './js/MyReactComponent';

render(<MyReactComponent/>, document.getElementById('react-root'));