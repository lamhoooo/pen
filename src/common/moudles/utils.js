/**
 * 工具组合
 */
const utils = {
  GLOBAL_URL: typeof location === 'object' ? `${location.protocol}//${location.host}/` : '',
  // 七牛云图片格式化
  getFormatImg (src, param = '0') {
    if (!src || typeof src !== 'string') {
      return ''
    }
    // 远程服务器图片删除protocol
    if (src.indexOf('https://') === 0) {
      src = src.slice(6, src.length)
    } else if (src.indexOf('http://') === 0) {
      src = src.slice(5, src.length)
    }
    if (!src.includes('imageView2') && !src.includes('.gif')) {
      if (src.includes('.png') || src.includes('.tmp')) {
        src += '?imageView2/' + param + '/format/png'
      } else {
        src += '?imageView2/' + param + '/format/jpg'
      }
    }
    return src
  },
  getTinyImg (src, param = '0') {
    if (!src || typeof src !== 'string') {
      return ''
    }
    // 远程服务器图片删除protocol
    if (src.indexOf('https://') === 0) {
      src = src.slice(6, src.length)
    } else if (src.indexOf('http://') === 0) {
      src = src.slice(5, src.length)
    }
    if (!src.includes('imageView2') && !src.includes('.gif')) {
      src += '?imageView2/' + param + '/format/jpg'
    }
    return src
  }
}

export default utils
