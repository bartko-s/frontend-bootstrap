"use strict";

// global css
require("./css/main.scss");

console.log("Hi");

// React Test
import { createRoot } from 'react-dom/client';
import React from 'react';
// import ReactDOM from 'react-dom';
import App from './js/App';

const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

