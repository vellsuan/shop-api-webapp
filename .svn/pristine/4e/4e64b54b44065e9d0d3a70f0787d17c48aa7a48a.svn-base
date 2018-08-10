"use strict";

const logUtil = require('./utils/logUtil')("server");

const path = require('path');

const Koa = require("koa");


const historyApiFallback = require("koa-history-api-fallback");


const Router = require('koa-router');

const convert = require('koa-convert');

const gzip = require('koa-gzip');

const serve = require('koa-static');

const bodyParser = require('koa-bodyparser');

require('./utils/db.js');

const MongooseStore = require('./utils/lib/koa-session-mongoose');
const session = require('koa-session');

const json = require('koa-json');
const koaBody = require('koa-body');
const cors = require('koa-cors');

const loggers = require('./middleware/loggers');

const app = new Koa();
const router = new Router();
app.keys = ['koa2 secret web'];

const xtpl = require('koa2-xtpl');
xtpl(app, {
	//配置模板目录，指向工程的view目录
	cache: false,
	views: path.join(__dirname, './views')
})


app.use(convert.compose(
	koaBody({
		multipart: true
	}),
	json(),
//	cors()
))

const render = require('./middleware/render.js');
require("./router/index.js")(router);
app
	.use(convert(gzip()))
	.use(render())
	.use(serve(path.join(__dirname, '../dist')))
	.use(bodyParser())
	.use(session({
		store: new MongooseStore({
			expires:2592000000,
			name:"cfe.Session"
		})
	}, app))
	.use(convert(loggers()))
	.use(router.routes())
	.use(router.allowedMethods())

	.use(convert(historyApiFallback({
		rewrites: [{
		  from: /\/index/, to: '/home.html'
		}]
	})));

app.listen(3012);
logUtil.info('app started at port 3012...');
