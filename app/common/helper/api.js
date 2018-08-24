const axios = require('axios');

class ClientApi {
  constructor () {

  }

  async referer (url, headers, params) {
    try {
      return await axios(url, { headers, params });
    } catch (e) {
      throw `第三方请求未知错误${JSON.stringify(e)}`;
    }
  }

  async fetch (url, params) {
    try {
      return await axios(url, { params });
    } catch (e) {
      throw `FETCH请求错误: ${JSON.stringify(e)}`;
    }
  }
}

module.exports = new ClientApi();
