const axios = require('axios');
const logger = require('../../controllers/logger')

class ClientApi {
  constructor () {

  }

  async referer (url, headers, params) {
    try {
      return await axios(url, { headers, params });
    } catch (e) {
      throw new Error(`第三方请求未知错误${e}`);
    }
  }

  async fetch (url, params) {
    try {
      logger(url);
      logger(params);
      return await axios(url, { params });
    } catch (e) {
      // throw new Error(`FETCH请求错误: ${e}`);
      logger(e);
    }
  }
}

module.exports = new ClientApi();
