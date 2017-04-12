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