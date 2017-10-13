/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  /**
   * 正则:
   *  [?&]   包含?和&
   *  [^?&]+ 并且后面跟着非?和&的一个或多个的字符
   *  =[^?&]+ 中间用等号连接, 等号后面跟着非?和&的一个或多个的字符
   *  /g 全局匹配
   *  ^  非
   *  +  表示一个或者多个
   */
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
