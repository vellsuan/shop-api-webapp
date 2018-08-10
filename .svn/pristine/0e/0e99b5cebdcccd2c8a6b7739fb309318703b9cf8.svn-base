'use strict'

var config = require('../config/config.js');

// 引入 mongoose 模块
var mongoose = require('mongoose');
//Use bluebird
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);
mongoose.connect(config.MongoSettings.mongodb,config.MongoSettings.options);

//导出 mongoose 模块
module.exports = mongoose;


