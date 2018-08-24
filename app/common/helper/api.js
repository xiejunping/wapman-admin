const axios = require('axios');

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
      return await axios(url, { params });
    } catch (e) {
      throw new Error(`FETCH请求错误: ${e}`);
    }
  }
}

module.exports = new ClientApi();
