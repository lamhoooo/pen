import 'isomorphic-fetch'
import es6Promise from 'es6-promise'
es6Promise.polyfill()

/**
 * 集成fetch-post
 * config对象包含要发送的body,url,success回调函数
 */
export default class Fetch {
  constructor (config) {
    this.config = {
      body: {},
      url: '',
      // 默认为post
      method: 'POST',
      // 默认1min超时
      timeout: 60000
    }
    Object.assign(this.config, config)
    return this.exec()
  }

  exec () {
    const requestConfig = new Request(this.config.url, {
      method: this.config.method,
      body: this.config.body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.JWT_TOKEN ? `token ${localStorage.JWT_TOKEN}` : ''
      }
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('abort promise'))
      }, this.config.timeout)
      fetch(requestConfig).then(resolve, reject)
    })
  }
}
