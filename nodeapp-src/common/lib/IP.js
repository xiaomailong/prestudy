var os = require('os');
function getLocalIP() {
	var map = [];
	var inet = os.networkInterfaces();
	console.log(inet);
	for (var dev in inet) {
		// console.log(dev);
		// console.log(inet[dev]);
		for (var addr in inet[dev]) {
			// console.log(addr);
			// console.log(inet[dev][addr]);
			if (inet[dev][addr].family == 'IPv4') {
				var ip = inet[dev][addr].address;
				if (ip.indexOf('10.') == 0 || ip.indexOf('172.') == 0 || ip.indexOf('192.') == 0) {
					map.push(ip);
				}
			}
		}
		// if (dev.indexOf('eth0') != -1) {
		// 	var tokens = dev.split(':');
		// 	var dev2 = null;
		// 	if (tokens.length == 2) {
		// 		dev2 = 'eth1:' + tokens[1];
		// 	} else if (tokens.length == 1) {
		// 		dev2 = 'eth1';
		// 	}
		// 	if (null == inet[dev2]) {
		// 		continue;
		// 	}
		// 	// 找到eth0和eth1分别的ip
		// 	var ip = null, ip2 = null;
		// 	inet[dev].forEach(function(details) {
		// 		if (details.family == 'IPv4') {
		// 			ip = details.address;
		// 		}
		// 	});
		// 	inet[dev2].forEach(function(details) {
		// 		if (details.family == 'IPv4') {
		// 			ip2 = details.address;
		// 		}
		// 	});
		// 	if (null == ip || null == ip2) {
		// 		continue;
		// 	}
		// 	// 将记录添加到map中去
		// 	if (ip.indexOf('10.') == 0 ||
		// 	ip.indexOf('172.') == 0 ||
		// 	ip.indexOf('192.') == 0) {
		// 		map.push({"intranet_ip" : ip, "internet_ip" : ip2});
		// 	} else {
		// 		map.push({"intranet_ip" : ip2, "internet_ip" : ip});
		// 	}
		// }
	}
	return map;
}

function getClientIp(req) {
	return req.headers['x-forwarded-for'] ||
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;
};

module.exports = getLocalIP;

// console.log(getLocalIP());
