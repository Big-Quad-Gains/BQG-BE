
var logUtil = {};
exports.logUtil = logUtil;


var log4js = require('log4js');

var loggerRun = null;

var localIP = "";

/**
 * 初始化日志
 * @param level 日志级别
 * @returns 
 */
logUtil.InitLog = function (level) {
	log4js.configure({
		appenders: [
			{
				type: 'console',
				category: 'console',
				layout: {
					type: 'pattern',
					pattern: "%m"
				}
			},
		],
		replaceConsole: false,
		levels: {
			console: level || 'debug'
		}
	});
	loggerRun = log4js.getLogger('console');
	localIP = getLocalIP();
};

/**
 * 写运行日志
 * @param level 日志级别
 * @param methodName 接口模块名
 * @param msg 日志关键信息描述点
 * @returns 
 */
logUtil.RunLog = function (level, methodName, msg) {
	var form = "";
	var split = "|";
	form += methodName + split;
	form += msg;
	if (loggerRun != null) {
		if (level.toLowerCase() == "debug") {
			loggerRun.debug(form);
		}
		if (level.toLowerCase() == "info") {
			loggerRun.info(form);
		}
		if (level.toLowerCase() == "warn") {
			loggerRun.warn(form);
		}
		if (level.toLowerCase() == "error") {
			loggerRun.error(form);
		}
	}
};

/**
 * 获取当前时间
 * @returns 
 */
logUtil.GetNowTime = function () {
	var nowDate = new Date();
	var result = nowDate.toLocaleDateString() + " " + nowDate.toLocaleTimeString();
	return result;
};


/**
 * 获取本地IP地址
 * @returns 本地IP地址
 */
function getLocalIP() {
	var network = require('os').networkInterfaces();
	for (var key in network) {
		var iface = network[key];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
	return "";
}






