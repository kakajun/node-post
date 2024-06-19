// 请求地址
const api1 = process.env.BASEURL + '/cdpz/updateCdZdymc'

// {
//   "keyword": "支路电流1组串式_many1.0_BCG_1321000000128_xlbxygfdz,支路电流1组串式_many1.1_BCG_1321000000128_xlbxygfdz,支路电流1组串式_dq__1321000000128_xlbxygfdz"
// }

// 写死的参数
const cdModelName = 'many1.0'
const fc = 'xlbxygfdz'
let cdbh = 1321000000127
/**
 * @description: 专门处理电流
 * @param {*} index  路数 1
 * @param {*} code  编码 BCG
 */
export function getParamsDl(index, code, name) {
  const bzcdName = `支路${name.indexOf('电流') > -1 ? '电流' : '电压'}${index}组串式`
  let keywd =
    bzcdName +
    '_' +
    cdModelName +
    '_' +
    code +
    '_' +
    (cdbh + index * 1) +
    '_' +
    fc
  return {
    api: api1,
    params: {
      keyword: keywd
    }
  }

}
