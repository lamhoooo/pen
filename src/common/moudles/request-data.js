import Fetch from './fetch'

let requestData = function (config, that) {
  let user = ''
  if (config.needLogin && config.needLogin !== '') {
    user = '/user'
  }
  new Fetch({
    url: `${user}/?funid=${config.funid}&service=${config.service}&rd=${Date.now()}`,
    body: JSON.stringify(config.data)
  }).then(response => {
    if (response.status >= 400) {
      if (response.status === 401) {
        console.log('有进入401')
        localStorage.clear()
        that.$router.push('/login')
      } else {
        throw new Error('Bad response from server')
      }
    }
    return response.json()
  }).then(data => {
    if (config.success) {
      // 在这里调用
      config.success(data)
    }
  }).catch(e => {
    config.error ? config.error(e) : alert(e.message)
  })
}

export default requestData
