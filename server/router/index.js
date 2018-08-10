'use strict'
const convert = require('koa-convert');

module.exports = function(router) {
	require("./page_base_router.js")(router);
	require("./api_base_router.js")(router)
	require("./page_router.js")(router);
	require("./api_router.js")(router)
}

