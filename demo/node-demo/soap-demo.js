var soap = require('soap');

// 天气预报WEB服务接口说明 - 天气现象和图例

// 2400多个城市5日天气预报WEB服务
// Endpoint: http://www.webxml.com.cn/WebServices/WeatherWS.asmx
// Disco: http://www.webxml.com.cn/WebServices/WeatherWS.asmx?disco
// WSDL: http://www.webxml.com.cn/WebServices/WeatherWS.asmx?wsdl
// Help file (PDF):  PDF http://www.webxml.com.cn/files/WeatherWsHelp.pdf

// 400多个城市3日天气预报Web服务
// Endpoint: http://www.webxml.com.cn/WebServices/WeatherWebService.asmx
// Disco: http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?disco
// WSDL: http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl

// 天气图标下载  ZIP http://www.webxml.com.cn/images/weather.zip


// 天气预报 Web 服务，数据每2.5小时左右自动更新一次，准确可靠。
// 包括 340 多个中国主要城市和 60 多个国外主要城市三日内的天气预报数据。
// 此天气预报Web Services请不要用于任何商业目的，
// 若有需要请http://www.webxml.com.cn/zh_cn/contact_us.aspx联系我们，欢迎技术交流。 QQ：8409035
// 使用本站 WEB 服务请注明或链接本站：http://www.webxml.com.cn/ 感谢大家的支持
var weatherUrl = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl';

// 获得本天气预报Web Services支持的洲、国内外省份和城市信息
// 输入参数：无；
// 返回数据：一个一维字符串数组 String()，内容为洲或国内省份的名称。
function getSupportProvince(result) {
  soap.createClient(weatherUrl, function(err, client) {
    client.getSupportProvince(result);
  });
}

// 获得本天气预报Web Services支持的洲、国内外省份和城市信息
// 输入参数：无；
// 返回：DataSet 。
// DataSet.Tables(0) 为支持的洲和国内省份数据，
// DataSet.Tables(1) 为支持的国内外城市或地区数据。
// DataSet.Tables(0).Rows(i).Item("ID") 主键对应 DataSet.Tables(1).Rows(i).Item("ZoneID") 外键。
// Tables(0)：ID = ID主键，Zone = 支持的洲、省份；
// Tables(1)：ID 主键，ZoneID = 对应Tables(0)ID的外键，Area = 城市或地区，AreaCode = 城市或地区代码。
function getSupportDataSet(result) {
  soap.createClient(weatherUrl, function(err, client) {
    client.getSupportDataSet(result);
  });
}

// 查询本天气预报Web Services支持的国内外城市或地区信息
// 输入参数：byProvinceName = 指定的洲或国内的省份，若为ALL或空则表示返回全部城市；
// 返回数据：一个一维字符串数组 String()，结构为：城市名称(城市代码)。
function getSupportCity(byProvinceName, result) {
  soap.createClient(weatherUrl, function(err, client) {
    client.getSupportCity({
      'byProvinceName': byProvinceName
    }, result);
  });
}

// 根据城市或地区名称查询获得未来三天内天气情况、现在的天气实况、天气和生活指数
// 调用方法如下：输入参数：theCityName = 城市中文名称(国外城市可用英文)或城市代码(不输入默认为上海市)，
//    如：上海 或 58367，如有城市名称重复请使用城市代码查询(可通过 getSupportCity 或 getSupportDataSet 获得)；
// 返回数据： 一个一维数组 String(22)，共有23个元素。
// String(0) 到 String(4)：省份，城市，城市代码，城市图片名称，最后更新时间。
// String(5) 到 String(11)：天气趋势开始图片名称(以下称：图标一) 天气趋势结束图片名称(以下称：图标二)
// 当天的气温，概况，风向和风力，图标一，图标二，现在的天气实况，天气和生活指数。
// String(12) 到 String(16)：第二天的 气温，概况，风向和风力，图标一，图标二。
// String(17) 到 String(21)：第三天的 气温，概况，风向和风力，图标一，图标二。
// String(22) 被查询的城市或地区的介绍
// 下载天气图标(包含大、中、小尺寸)：http://www.webxml.com.cn/images/weather.zip
// 天气图例说明：http://www.webxml.com.cn/zh_cn/weather_icon.aspx
// 调用此天气预报Web Services实例下载(VB ASP.net 2.0)：http://www.webxml.com.cn/files/weather_eg.zip
function getWeatherbyCityName(theCityName, result) {
  soap.createClient(weatherUrl, function(err, client) {
    client.getWeatherbyCityName({
      'theCityName': theCityName
    }, result);
  });
}

// 根据城市或地区名称查询获得未来三天内天气情况、现在的天气实况、天气和生活指数（For商业用户）
// 调用方法同 getWeatherbyCityName，
// 输入参数：theUserID = 商业用户ID
function getWeatherbyCityNamePro(theCityName, theUserID, result) {
  soap.createClient(weatherUrl, function(err, client) {
    client.getWeatherbyCityNamePro({
      'theCityName': theCityName,
      'theUserID': theUserID
    }, result);
  });
}

// getSupportProvince(function(err, result) {
//   console.log(result.getSupportProvinceResult);
// });
//
// getSupportDataSet(function(err, result) {
//   console.log(result.getSupportDataSetResult);
// });
//
// getSupportCity('河南', function(err, result) {
//   console.log(result.getSupportCityResult);
// });
// getSupportCity('ALL', function(err, result) {
//   console.log(result.getSupportCityResult);
// });

// getWeatherbyCityName('许昌', function(err, result) {
//   console.log(result.getWeatherbyCityNameResult);
// });
//
// getWeatherbyCityNamePro('许昌', '', function(err, result) {
//   console.log(result.getWeatherbyCityNameProResult);
// });


// http://www.webxml.com.cn/
// 2500多个城市天气预报Web服务，包含2400个以上中国城市和100个以上国外城市天气预报数据。
// 数据每2.5小时左右自动更新一次，准确可靠。
// 为让更多的开发人员学习WEB服务开发，此服务支持免费用户使用。
// 为支持多种平台开发，此WEB服务接口提供了多种返回类型可选择。
// 使用本站 WEB 服务请注明或链接本站：http://www.webxml.com.cn/ 感谢大家的支持！
// 接口帮助文档：http://www.webxml.com.cn/files/WeatherWsHelp.pdf
// 部分城市介绍和气候背景：http://www.webxml.com.cn/files/about_city.zip
// 部分城市图片：http://www.webxml.com.cn/files/city_photo.zip
// 天气现象和图例：http://www.webxml.com.cn/zh_cn/weather_icon.aspx
var weatherWsUrl = 'http://www.webxml.com.cn/WebServices/WeatherWS.asmx?wsdl';

// 获得中国省份、直辖市、地区；国家名称（国外）和与之对应的ID
// 输入参数：无，
// 返回数据：DataSet。
function getRegionDataset(result) {
  soap.createClient(weatherWsUrl, function(err, client) {
    client.getRegionDataset(result);
  });
}

// 获得中国省份、直辖市、地区和与之对应的ID
// 输入参数：无，
// 返回数据：一维字符串数组。
function getRegionProvince(result) {
  soap.createClient(weatherWsUrl, function(err, client) {
    client.getRegionProvince(result);
  });
}

// 获得国外国家名称和与之对应的ID
// 输入参数：无，
// 返回数据：一维字符串数组。
function getRegionCountry(result) {
  soap.createClient(weatherWsUrl, function(err, client) {
    client.getRegionCountry(result);
  });
}

// 获得支持的城市/地区名称和与之对应的ID
// 输入参数：theRegionCode = 省市、国家ID或名称，
// 返回数据：DataSet。
function getSupportCityDataset(theRegionCode, result) {
  soap.createClient(weatherWsUrl, function(err, client) {
    client.getSupportCityDataset({
      'theRegionCode': theRegionCode
    }, result);
  });
}

// 获得支持的城市/地区名称和与之对应的ID
// 输入参数：theRegionCode = 省市、国家ID或名称，
// 返回数据：一维字符串数组。
function getSupportCityString(theRegionCode, result) {
  soap.createClient(weatherWsUrl, function(err, client) {
    client.getSupportCityString({
      'theRegionCode': theRegionCode
    }, result);
  });
}

// 获得天气预报数据
// 输入参数：城市/地区ID或名称，
// 返回数据：一维字符串数组。
function getWeather(theCityCode, theUserID, result) {
  soap.createClient(weatherWsUrl, function(err, client) {
    client.getWeather({
      'theCityCode': theCityCode,
      'theUserID': theUserID
    }, result);
  });
}

// getRegionDataset(function(err, result) {
//   console.log(result.getRegionDatasetResult);
// });

// getRegionProvince(function(err, result) {
//   console.log(result.getRegionProvinceResult);
// });

// getRegionCountry(function(err, result) {
//   console.log(result.getRegionCountryResult);
// });

// getSupportCityDataset('河南', function(err, result) {
//   console.log(result.getSupportCityDatasetResult);
// });

// getSupportCityString('河南', function(err, result) {
//   console.log(result.getSupportCityStringResult);
// });

// getWeather('许昌', '', function(err, result) {
//   console.log(result.getWeatherResult);
// });


// 中国开放式基金数据 WEB 服务，数据每天15：30以后及时更新。
// 输出数据包括：证券代码、证券简称、单位净值、累计单位净值、前单位净值、净值涨跌额、净值增长率(%)、净值日期。
// 只有商业用户可获得此中国开放式基金数据Web Services的全部功能，
// 若有需要测试、开发和使用请QQ：8698053 或 联系我们

// http://www.webxml.com.cn/
// 中国开放式基金数据 WEB 服务，当日的最新开放式基金净值数据每天15：30以后及时更新。
// 输出数据包括：证券代码、证券简称、单位净值、累计单位净值、前单位净值、净值涨跌额、净值增长率(%)、净值日期。
// 此中国开放式基金数据WEB服务仅作为用户获取信息之目的，并不构成投资建议。 和/或其各供应商不为本页面提供信息的错误、残缺、延迟或因依靠此信息所采取的任何行动负责。
// 市场有风险，投资需谨慎
// 只有商业用户可获得此中国开放式基金数据Web Services的全部功能，
// 若有需要测试、开发和使用请QQ：8409035或http://www.webxml.com.cn/zh_cn/contact_us.aspx联系我们
// 获得用户ID。使用本站 WEB 服务请注明或链接本站：http://www.webxml.com.cn/ 感谢大家的支持
var chinaOpenFundUrl = 'http://webservice.webxml.com.cn/WebServices/ChinaOpenFundWS.asmx?wsdl';

// 获得中国开放式基金的基金代号和基金名称 DataSet。
// 输入参数：无；
// 返回数据：DataSet，结构为：Item(FundCode)=基金代号，Ietm(FundName)=基金名称。
function getFundCodeNameDataSet(result) {
  soap.createClient(chinaOpenFundUrl, function(err, client) {
    client.getFundCodeNameDataSet(result);
  });
}

// 获得中国开放式基金的基金代号和基金名称 String()。
// 输入参数：无；
// 返回数据：一个一维字符串数组 String()，结构为：基金代号@基金名称。
function getFundCodeNameString(result) {
  soap.createClient(chinaOpenFundUrl, function(err, client) {
    client.getFundCodeNameString(result);
  });
}

// 获得全部中国开放式基金数据 DataSet。（免费用户只能获得最新 10 条数据）
// 输入参数：userID = 商业用户ID；
// 返回数据：DataSet，结构为：
// Item(FundCode)=基金代号，
// Ietm(FundName)=基金名称，
// Ietm(NetWorth_1)=前单位净值，
// Ietm(NetWorth_2)=单位净值，
// Ietm(NetWorth_3)=累计单位净值，
// Ietm(WorthUp)=净值涨跌额，
// Ietm(WorthPercent)=净值增长率（%），
// Ietm(WorthDate)=净值日期，
// Ietm(ModifyDate)=数据更新时间。
// 免费用户不需要输入 userID 参数
function getOpenFundDataSet(theUserID, result) {
  soap.createClient(chinaOpenFundUrl, function(err, client) {
    client.getOpenFundDataSet({
      'theUserID': theUserID
    }, result);
  });
}

// 获得全部中国开放式基金数据 String()。（免费用户只能获得最新 10 条数据）
// 输入参数：userID = 商业用户ID；
// 返回数据：一个一维字符串数组 String()，
// 结构为：基金代号@基金名称@前单位净值@单位净值，@累计单位净值@净值涨跌额@净值增长率（%）@净值日期@数据更新时间。
// 免费用户不需要输入 userID 参数
function getOpenFundString(theUserID, result) {
  soap.createClient(chinaOpenFundUrl, function(err, client) {
    client.getOpenFundString({
      'theUserID': theUserID
    }, result);
  });
}

// 通过开放式基金代号查询基金数据 DataSet。（免费用户不能使用）
// 输入参数：userID = 商业用户ID；
// 返回数据：DataSet，结构为：同获得全部中国开放式基金数据 DataSet。
function getOpenFundDataSetByCode(theUserID, FundCode, result) {
  soap.createClient(chinaOpenFundUrl, function(err, client) {
    client.getOpenFundDataSetByCode({
      'theUserID': theUserID,
      'FundCode': FundCode
    }, result);
  });
}

// 通过开放式基金代号查询基金数据 String()。（免费用户不能使用）
// 输入参数：userID = 商业用户ID；
// 返回数据：一个一维字符串数组 String()，结构为：获得全部中国开放式基金数据 String()。
function getOpenFundStringByCode(theUserID, FundCode, result) {
  soap.createClient(chinaOpenFundUrl, function(err, client) {
    client.getOpenFundStringByCode({
      'theUserID': theUserID,
      'FundCode': FundCode
    }, result);
  });
}

// getFundCodeNameDataSet(function(err, result) {
//   console.log(result.getFundCodeNameDataSetResult);
// });

// getFundCodeNameString(function(err, result) {
//   console.log(result.getFundCodeNameStringResult);
// });

// getOpenFundDataSet('', function(err, result) {
//   console.log(result.getOpenFundDataSetResult);
// });

// getOpenFundString('', function(err, result) {
//   console.log(result.getOpenFundStringResult);
// });

// getOpenFundDataSetByCode('', '001008', function(err, result) {
//   console.log(result.getOpenFundDataSetByCodeResult);
// });

// getOpenFundStringByCode('', '001008', function(err, result) {
//   console.log(result.getOpenFundStringByCodeResult);
// });


// http://www.webxml.com.cn/
// 国内手机号码归属地查询WEB服务，提供最新的国内手机号码段归属地数据，每月更新。
// 使用本站 WEB 服务请注明或链接本站：感谢大家的支持！
var mobileCodeWSUrl = 'http://webservice.webxml.com.cn/WebServices/MobileCodeWS.asmx?wsdl';

// 获得国内手机号码归属地省份、地区和手机卡类型信息
// 输入参数：mobileCode = 字符串（手机号码，最少前7位数字），
// userID = 字符串（商业用户ID） 免费用户为空字符串；
// 返回数据：字符串（手机号码：省份 城市 手机卡类型）。
function getMobileCodeInfo(mobileCode, userID, result) {
  soap.createClient(mobileCodeWSUrl, function(err, client) {
    client.getMobileCodeInfo({
      'mobileCode': mobileCode,
      'userID': userID
    }, result);
  });
}

// 获得国内手机号码归属地数据库信息
// 输入参数：无；
// 返回数据：一维字符串数组（省份 城市 记录数量）。
function getDatabaseInfo(result) {
  soap.createClient(mobileCodeWSUrl, function(err, client) {
    client.getDatabaseInfo(result);
  });
}

// getMobileCodeInfo('13849873940', '', function(err, result) {
//   console.log(result.getMobileCodeInfoResult);
// });

// getDatabaseInfo(function(err, result) {
//   console.log(result.getDatabaseInfoResult);
// });


// http://www.webxml.com.cn/
// 中国邮政编码搜索 WEB 服务
// 包含中国全部邮政编码共计187285条记录，是目前最完整的邮政编码数据，精确到乡镇级、城市精确到街道，
// 支持邮政编码<->城市、乡镇、街道的双向查询。
// 此邮政编码查询仅供参考，如邮政编码或地址有变动请以当地邮局为准，也请及时通知我们进行更正。
// 此邮政编码查询Web Services请不要用于任何商业目的，若有需要请联系我们，欢迎技术交流。 QQ：8409035
// 使用本站 WEB 服务请注明或链接本站：http://www.webxml.com.cn/ 感谢大家的支持
var chinaZipUrl = 'http://webservice.webxml.com.cn/WebServices/ChinaZipSearchWebService.asmx?wsdl';

// 获得本邮政编码查询Web Services支持的省份/直辖市信息
// 输入参数：无；
// 返回数据：一个一维字符串数组 String()，内容为省份/直辖市的名称。
function getSupportProvince(result) {
  soap.createClient(chinaZipUrl, function(err, client) {
    client.getSupportProvince(result);
  });
}

// 获得本邮政编码查询Web Services支持的全部省份/直辖市 和 城市、地区信息
// 输入参数：空；
// 返回数据：DataSet，结构为：Item.(CITY)=城市、地区，Item.(PROVINCE)=省份/直辖市。
function getSupportProvinceCity(result) {
  soap.createClient(chinaZipUrl, function(err, client) {
    client.getSupportProvinceCity(result);
  });
}

// 通过省份/直辖市查询本邮政编码查询Web Services支持的城市、地区信息
// 输入参数：byProvinceName = 指定的省份/直辖市，若为空则默认上海；
// 返回数据：一个一维字符串数组 String()，结构为：城市、地区(省份/直辖市)。
function getSupportCity(byProvinceName, result) {
  soap.createClient(chinaZipUrl, function(err, client) {
    client.getSupportCity({
      'byProvinceName': byProvinceName
    }, result);
  });
}

// 通过邮政编码查询本邮政编码查询Web Services支持地址数据
// 输入参数：theZipCode = 中国的6位邮政编码，若为空则默认上海200080，
// userID = 商业用户ID（普通用户不需要）；
// 返回数据：DataSet，结构为：
// Item.(ADDRESS)=街道、乡镇，
// Item.(CITY)=城市、地区，
// Item.(PROVINCE)=省份/直辖市，
// Item.(ZIP)=邮政编码。
function getAddressByZipCode(theZipCode, userID, result) {
  soap.createClient(chinaZipUrl, function(err, client) {
    client.getAddressByZipCode({
      'theZipCode': theZipCode,
      'userID': userID
    }, result);
  });
}

// 通过省份、城市、地址查询本邮政编码查询Web Services支持邮政编码数据
// 输入参数：theProvinceName = 省份/直辖市（必须按照 getSupportProvince 输入），
// theCityName = 城市、地区，
// theAddress = 街道、乡镇，
// userID = 商业用户ID（普通用户不需要），
// theProvinceName若为空则默认上海，支持模糊查询，
// 免费用户最多输出20条相关数据
// （如需显示更多请http://www.webxml.com.cn/zh_cn/contact_us.aspx联系我们）；
// 返回数据：DataSet，结构为：
// Item.(ADDRESS)=街道、乡镇，
// Item.(CITY)=城市、地区，
// Item.(PROVINCE)=省份/直辖市，
// Item.(ZIP)=邮政编码。
function getZipCodeByAddress(theProvinceName, theCityName, theAddress, userID, result) {
  soap.createClient(chinaZipUrl, function(err, client) {
    client.getZipCodeByAddress({
      'theProvinceName': theProvinceName,
      'theCityName': theCityName,
      'theAddress': theAddress,
      'userID': userID
    }, result);
  });
}

// getSupportProvince(function(err, result) {
//   console.log(result.getSupportProvinceResult);
// });

// getSupportProvinceCity(function(err, result) {
//   console.log(result.getSupportProvinceCityResult);
// });

// getSupportCity('河南', function(err, result) {
//   console.log(result.getSupportCityResult);
// });

// getAddressByZipCode('715103', '', function(err, result) {
//   console.log(result.getAddressByZipCodeResult);
// });
//
// getZipCodeByAddress('河南', '许昌', '魏都区', '', function(err, result) {
//   console.log(result.getZipCodeByAddressResult);
// });


// http://www.webxml.com.cn/" target="_blank">WebXml.com.cn
// IP地址搜索 WEB 服务
// 包含中国和国外已知的IP地址数据，是目前最完整的IP地址数据，
// 记录数量现已超过37万条并还在不断更新和增加中，因IP地址在不断变化，此IP地址数据查询仅供参考。
// 此IP地址搜索Web Services请不要用于任何商业目的，若
// 有需要请http://www.webxml.com.cn/zh_cn/contact_us.aspx联系我们，欢迎技术交流。 QQ：8409035
// 使用本站 WEB 服务请注明或链接本站：http://www.webxml.com.cn/ 感谢大家的支持
var ipAddressUrl = 'http://webservice.webxml.com.cn/WebServices/IpAddressSearchWebService.asmx?wsdl';

// 通过输入IP地址查询国家、城市、所有者等信息。没有注明国家的为中国
// 输入参数：IP地址（自动替换 " 。" 为 "."），
// 返回数据： 一个一维字符串数组String(1)，String(0) = IP地址；String(1) = 查询结果或提示信息
function getCountryCityByIp(theIpAddress, result) {
  soap.createClient(ipAddressUrl, function(err, client) {
    client.getCountryCityByIp({
      'theIpAddress': theIpAddress
    }, result);
  });
}

// 获得您的IP地址和地址信息(已停用)
// 输入参数：无，
// 返回数据： 一个一维字符串数组String(1)，String(0) = IP地址；String(1) = 地址信息
function getGeoIPContext(result) {
  soap.createClient(ipAddressUrl, function(err, client) {
    client.getGeoIPContext(result);
  });
}

// 获得本IP地址搜索 WEB 服务的数据库版本更新时间
// 输入参数：无，
// 输出参数 String
function getVersionTime(result) {
  soap.createClient(ipAddressUrl, function(err, client) {
    client.getVersionTime(result);
  });
}


// getCountryCityByIp('218.28.73.73', function(err, result) {
//   console.log(result.getCountryCityByIpResult);
// });

// getGeoIPContext(function(err, result) {
//   console.log(result.getGeoIPContextResult);
// });

// getVersionTime(function(err, result) {
//   console.log(result.getVersionTimeResult);
// });
