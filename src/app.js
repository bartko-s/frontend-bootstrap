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
import ReactDOM from 'react-dom';
import MyReactComponent from './js/MyReactComponent';
import { AppContainer } from 'react-hot-loader'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('react-root'),
    )
};

render(MyReactComponent);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./js/MyReactComponent', () => { render(MyReactComponent) })
}