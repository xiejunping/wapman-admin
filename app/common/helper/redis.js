const redis = require('redis')
const { host, port, password } = require('../config/redis')

/**
 * redis
 */
class Redis {
  constructor(host, port, password) {
    this.host = host;
    this.port = port;
    this.password = password;

    this.client = this.init()
  }

  init() {
    return redis.createClient({
      host: this.host,
      port: this.port,
      password: this.password
    });
  }

  /**
   * 设置key
   * @param key
   * @param value
   * @returns {Promise<any>}
   */
  set(key, value) {
    const { client } = this
    return new Promise((resolve, reject) => {
      client.set(key, value, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }

  /**
   * 获取key
   * @param key
   * @returns {Promise<any>}
   */
  get(key) {
    const { client } = this
    return new Promise((resolve, reject) => {
      client.get(key, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }

  /**
   * 删除key
   * @param key
   * @returns {Promise<any>}
   */
  del(key) {
    const { client } = this
    return new Promise((resolve, reject) => {
      client.del(key, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }

  /**
   * 存在key
   * @param key
   * @returns {Promise<any>}
   */
  exists(key) {
    const { client } = this
    return new Promise((resolve, reject) => {
      client.exists(key, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }

  /**
   * 设置过期时间缀
   * @param key
   * @param timestamp
   * @returns {Promise<any>}
   */
  pexpireat(key, timestamp) {
    const { client } = this
    return new Promise((resolve, reject) => {
      client.pexpireat(key, timestamp, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }

  /**
   * 查找所有key
   * @param pattern
   * @returns {Promise<any>}
   */
  keys(pattern) {
    const { client } = this
    return new Promise((resolve, reject) => {
      client.keys(pattern, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }

  /**
   * 判断过期
   * @param key
   * @returns {Promise<any>}
   */
  pttl(key) {
    const { client } = this
    return new Promise((resolve, reject) => {
      client.pttl(key, (error, response) => {
        if (error) reject(error)
        else resolve(response)
      })
    })
  }

}

module.exports = new Redis(host, port, password)
