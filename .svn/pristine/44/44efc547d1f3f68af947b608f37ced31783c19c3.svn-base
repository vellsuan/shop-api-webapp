'use strict'

var fs = require("fs")
var Promise = require('bluebird');
var xml2js = require('xml2js');
var crypto = require('crypto');
var sha1 = require('sha1');
var moment = require('moment');
var _ = require('lodash');
var passwordhash = require("password-hash");
var replyTpl = require('./../wechat-api/tpl.js');

/**
 * 读取文件
 * @param {Object} fpath
 * @param {Object} encoding
 */
exports.readFileAsync = function(fpath, encoding) {
	return new Promise(function(resolve, reject) {
		fs.readFile(fpath, encoding || "utf-8", function(err, content) {
			if(err) {
				reject(err);
			} else {
				resolve(content)
			}
		})
	});
}

/**
 * 保存文件
 * @param {Object} fpath
 * @param {Object} content
 */
exports.writeFileAsync = function(fpath, content) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(fpath, content, function(err, content) {
			if(err) {
				reject(err);
			} else {
				resolve(content)
			}
		})
	});
}
/**解析xml
 * 
 * @param {Object} xml
 */
exports.parseXMLAsync = function(xml) {
	return new Promise(function(resolve, reject) {
		xml2js.parseString(xml, {
			trim: true
		}, function(err, content) {
			if(err) {
				reject(err);
			} else {
				resolve(content)
			}
		});
	});
}

/**
 * 序列化json数据
 * @param {Object} result
 */
function formatMessage(result) {
	var message = {};
	if(typeof result === 'object') {
		var keys = Object.keys(result);
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var item = result[key];
			if(!(item instanceof Array) || item.length === 0) {
				continue;
			}
			if(item.length === 1) {
				var val = item[0];
				if(typeof val === 'object') {
					message[key] = formatMessage(val);
				} else {
					message[key] = (val || '').trim();
				}
			} else {
				message[key] = [];
				for(var j = 0, k = item.length; j < k; j++) {
					message[key].push(formatMessage(item[j]));
				}
			}
		}
	}

	return message;
}
exports.formatMessage = formatMessage;

exports.dataToXML = function(content, message) {
	var info = {};
	var type = "text";

	var fromUserName = message.FromUserName;
	var toUserName = message.ToUserName;
	if(Array.isArray(content)) {
		type = "news"
	} else {
		type = content.type || type;
	}
	info.content = content;
	info.createTime = new Date().getTime();
	info.msgType = type;
	info.toUserName = fromUserName;
	info.fromUserName = toUserName;

	return replyTpl.compile(info);
}

/**
 * 生成token
 * @param {Object} data
 */
exports.generateRandomToken = function(data) {
	return new Promise(function(resolve, reject) {
		crypto.randomBytes(256, function(err, buffer) {
			if(err) {
				reject(err);
			} else {
				var token = crypto.createHash('sha1').update(buffer).digest('hex');
				resolve(token);
			}
		});
	});
}

/**
 * 取header 中的token
 * @param headers
 * @returns {*}
 */
exports.extractTokenFromHeader = function(cookies) {
	if(cookies == null) {
		return null
	}
	if(cookies.get("authorization") == null) {
		return null
	}
	var authorization = cookies.get("authorization");
	var authArr = authorization.split(' ');
	if(authArr.length != 1) throw new Error('Authorization header value is not of length 2');

	var token = authArr[0];
	return token;
}

/**
 *生成随机字符串
 * @returns {string}
 */
exports.createNonceStr = function() {
	return Math.random().toString(36).substr(2, 15);
}

/**
 *生成时间戳
 * @returns {string}
 */
exports.createTimestamp = function() {
	return parseInt(new Date().getTime() / 1000) + '';
}

/**
 * 解码
 * @param {Object} data 需要解码的数组或者字段
 * @param {Object} name 取数组中要解码的字段名称
 */
exports.decodeURIComponent = function(data, name) {
	let [a, b] = [
		[], ''
	];
	if(typeof(data) == "string") {
		return decodeURIComponent(data);
	} else {
		for(var i = 0; i < data.length; i++) {
			a.push(decodeURIComponent(data[i][name]));
		}
		return a;
	}
}

/**
 * 对象继承方法
 * @return {[type]} [description]
 */
exports.extend = function() {
	var arr = arguments;
	var obj = {};
	var len = arr.length;
	if(len === 1) {
		obj = arr[0];
	} else {
		for(var i = 0; i < len; i++) {
			obj = _.assign(obj, arr[i])
		}
	}
	return obj;
};

/**
 * 
 */
exports.generateNewExpire = function() {
	return moment().add(global.config.TokenSettings.TokenSavePeriod, 'day').utc().format('YYYY-MM-DD HH:mm:ss');
}

exports.generateNewLocal = function() {
	return moment().utc().format('YYYY-MM-DD HH:mm:ss')
}

exports.generateHash = function (str) {
    return passwordhash.generate(str, secretOptions);
}

exports.verifyHash = function (str, secret) {
    return passwordhash.verify(str, secret);
}

/**
 * 格式化时间
 * @param {Object} date
 * @param {Object} friendly
 */
exports.formatDate = function (date, friendly) {
    date = moment(date);
    if (friendly) {
        return date.fromNow();
    }
    else {
        return date.format('YYYY-MM-DD HH:mm:ss');
    }
};

/**
 * 获取数组下标
 * @param {Array} arr
 * @param {String} itemStr
 */
exports.indexOf = function(arr, itemStr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == itemStr) return i;
    }
    return -1;
};


/**
 * 时间戳转换成字符串   
 * @param {Object} time
 * @param {Object} num
 */
exports.formatTime = function(time, num) {
		var yy, mm, dd, hh, min, ss;
		var formatTime = '';
		if(time != '') {
			time = new Date(parseInt(time));
			yy = time.getFullYear();
			mm = (time.getMonth() + 1);
			if(mm + 1 < 10) {
				mm = "0" + mm;
			}
			dd = time.getDate();
			if(dd < 10) {
				dd = "0" + dd;
			}
			hh = time.getHours();
			if(hh < 10) {
				hh = "0" + hh;
			}
			min = time.getMinutes();
			if(min < 10) {
				min = "0" + min;
			}
			ss = time.getSeconds();
			if(ss < 10) {
				ss = "0" + ss;
			}
			switch(num) {
				case 0:
					formatTime = yy + mm + dd + hh + min + ss;
					break;
				case 1:
					formatTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss;
					break;
				case 2:
					formatTime = yy + "/" + mm + "/" + dd + " " + hh + ":" + min + ":" + ss;
					break;
				case 3:
					formatTime = yy + "年" + mm + "月" + dd + "日" + hh + "时" + min + "分" + ss + "秒";
					break;
				case 4:
					formatTime = yy + "-" + mm + "-" + dd;
					break;
				case 5:
					formatTime = yy + "_" + mm + "_" + dd + " " + hh + "_" + min + "_" + ss;
					break;
				case 6:
					formatTime = mm + "/" + dd;
					break;
				case 7:
					formatTime = hh + ":" + min + ":" + ss;
					break;
				case 8:
					formatTime = yy + "." + mm + "." + dd;
					break;
				case 9:
					formatTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + min;
					break;
				case 10:
					formatTime = yy + "年" + mm + "月" + dd + "日";
					break;
				case 11:
					formatTime = mm + "月" + dd + "日";
					break;
			}
		}
		return formatTime;
	};
	
/**
 * 将数值转换为简写数值
 * @param num 原始数值
 * @param omitTheDigits 省略位数（默认值4，以万为单位）
 * @param digit 保留小数点位数（默认值1，保留1位小数）
 * @returns {*} 如：1.5万
 */
exports.numToChCapital = function (num, omitTheDigits, digit) {
	var chArr = ["个", "十", "百", "千", "万", "十万", "百万", "千万", "亿"],
		segmentNum = 0,
		num2 = "";

	num = isNaN(parseFloat(num)) ? 0 : parseFloat(num);
	omitTheDigits = isNaN(parseInt(omitTheDigits)) ? 4 : Math.abs(parseInt(omitTheDigits)) < chArr.length ? Math.abs(parseInt(omitTheDigits)) : chArr.length - 1;
	digit = isNaN(parseInt(digit)) ? 1 : parseInt(digit) > 0 ? parseInt(digit) : -1;

	segmentNum = Math.pow(10, omitTheDigits);

	if (num < segmentNum) {
		return num;
	} else {
		num2 = num / segmentNum + "";
		return (num2.indexOf(".") >= 0 ? num2.substr(0, num2.indexOf(".") + 1 + digit) : num2) + chArr[omitTheDigits];
	}
}

exports.toFixed = function(str,num){
	return str.toFixed(num);
}


exports.isEmptyObject = function (obj) {   
　　for (var name in obj){
　　　　return false;//返回false，不为空对象
　　}　　
　　return true;//返回true，为空对象
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
exports.formatCurrency = function(num) {
	num = (num||"").toString().replace(/\$|\,/g, '');
	if(isNaN(num))
		num = "0";
	var sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	var cents = num % 100;
	num = Math.floor(num / 100).toString();
	if(cents < 10)
		cents = "0" + cents;
	for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ',' +
		num.substring(num.length - (4 * i + 3));
	return(((sign) ? '' : '-') + num + '.' + cents);
};

/**
 * 字符串替换
 * @param {Object} str
 * @param {Object} sptr
 * @param {Object} sptr1
 */
exports.ReplaceAll = function(str, sptr, sptr1) {
	while(str.indexOf(sptr) >= 0) {
		str = str.replace(sptr, sptr1);
	}
	return str;
}
