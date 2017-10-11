export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _zero(str))
    }
  }
  return fmt
}

/* 这个写法比较固定, 适合项目只有单一的时间格式 */
export function formatDate2 (date) {
  let o = {
    Year: date.getFullYear(),
    Month: date.getMonth() + 1,
    Day: date.getDate(),
    Hour: date.getHours(),
    Minute: date.getMinutes(),
    Second: date.getSeconds()
  }
  return `${o.Year}-${_zero2(o.Month)}-${_zero2(o.Day)} ${_zero2(o.Hour)}:${_zero2(o.Minute)}`
}

/* 要把getDate的Number转化为字符串才能用substr()截取 */
function _zero (str) {
  return ('00' + str).substr(str.length)
}

function _zero2 (val) {
  return val < 10 ? `0${val}` : val
}
