const prod = {
  AppId: 1252359508,
  SecretId: 'AKIDHXOwKGO30w5hbRuNj8FIJcuIgILVwlgC',
  SecretKey: 'dKDsWE1hIM3AGNtPusJncZO7kIAwvph0',

  Bucket: 'wapman',
  Region: 'ap-shanghai'
};
const dev = {
  AppId: 1252359508,
  SecretId: 'AKIDHXOwKGO30w5hbRuNj8FIJcuIgILVwlgC',
  SecretKey: 'dKDsWE1hIM3AGNtPusJncZO7kIAwvph0',

  Bucket: 'wapman',
  Region: 'ap-shanghai'
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
