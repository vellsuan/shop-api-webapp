'use strict'
const convert = require('koa-convert');
const loginAction = require("../controller/base/loginAction.js");
const indexAction = require("../controller/home/indexAction.js");
const userAction = require("../controller/home/userAction.js");
const shopAction = require("../controller/home/shopAction.js");
const assentAction = require("../controller/home/assentAction.js");

const auth = require("../middleware/auth.js");

const prefix = config.ServerPath.PagePath||"";

module.exports = function(router) {



}
