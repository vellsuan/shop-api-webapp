let path = require('path');

//日志根目录
let baseLogPath = path.resolve(__dirname, '../../logs')

//错误日志目录
let errorPath = "/error";
//错误日志文件名
let errorFileName = "error";
//错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// let errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志目录
let responsePath = "/response";
//响应日志文件名
let responseFileName = "response";
//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// let   = path.resolve(__dirname, "../logs/response/response");

module.exports = {

	"appenders": {
		"rule-console": {
			"type": "console"
		},
		error: {
			"category": "errorLogger", //logger名称
			"type": "dateFile", //日志类型
			"filename": errorLogPath, //日志输出位置
			"alwaysIncludePattern": true, //是否总是有后缀名
			"pattern": "-yyyy-MM-dd-hh.log", //后缀，每小时创建一个新的日志文件
			"path": errorPath
		},
		response: {
			"category": "resLogger",
			"type": "dateFile",
			"filename": responseLogPath,
			"alwaysIncludePattern": true,
			"pattern": "-yyyy-MM-dd-hh.log",
			"path": responsePath,
		}
	},
	replaceConsole: true,
	"categories": {
		error: {
			appenders: ['error'],
			level: 'debug'
		},
		response: {
			appenders: ['response',"rule-console"],
			level: 'debug'
		},
		default: {
			appenders: ['response',"rule-console"],
			level: 'debug'
		},
	}

}