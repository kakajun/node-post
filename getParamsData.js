import 'dotenv/config'
// 请求地址
const api1 = process.env.BASEURL + '/cdpz/updateCdZdymc'
const api2 = process.env.BASEURL + '/bzcd/updateMappStatus'
// {
//   "keyword": "支路电流1组串式_many1.0_BCG_1321000000128_xlbxygfdz,支路电流1组串式_many1.1_BCG_1321000000128_xlbxygfdz,支路电流1组串式_dq__1321000000128_xlbxygfdz"
// }

export function test() {
  return {
    api: api1,
    params: { keyword: '支路电压1组串式_many1.0_BBM_1321000000128_xlbxygfdz' }
  }
}

// 写死的参数
const cdModelName = 'many1.0'
const cdModelName2 = 'many1.1'
const fc = 'xlbxygfdz'
let cdbh = 1321000000147
/**
 * @description: 专门处理电流
 * @param {*} index  路数 1
 * @param {*} code  编码 BCG
 */
export function getParamsDl(index, code, name, road = 1) {
  const voltageOrCurrent = name.includes('电流') ? '电流' : '电压';
  const bzcdName = `支路${voltageOrCurrent}${index}组串式`;
  function getbaseKeyword(cdModelName) { return `${bzcdName}_${cdModelName}_${code}_${(cdbh + index * 1)}_${fc}` };
  // 初始化关键词数组
  const keywords = [getbaseKeyword(cdModelName)];
  // 根据路数量决定是否添加额外的关键词
  if (road === 2) {
    keywords.push(getbaseKeyword(cdModelName2));
  }

  return {
    api: api1,
    params: {
      keyword: keywords.join(',')
    }
  };
}


// {
//   "mappingWord": "支路电流1组串式_many1.0_BCG_xlbxygfdz,支路电流1组串式_many1.1_BCG_xlbxygfdz",
//   "keywordsSplit": "支路电流1组串式",
//   "id": "1321000000128"
// }

/**
 * @description: 专门处理电流
 * @param {*} index  路数 1
 * @param {*} code  编码 BCG
 */
export function getParamsDlData(index, code, name, road = 1) {
  const bzcdName = `支路${name.indexOf('电流') > -1 ? '电流' : '电压'}${index}组串式`
  function getmappingWord(cdModelName) { return bzcdName + '_' + cdModelName + '_' + code + '_' + fc }
  const keywords = [getmappingWord(cdModelName)];
  // 根据路数量决定是否添加额外的关键词
  if (road === 2) {
    keywords.push(getmappingWord(cdModelName2));
  }

  return {
    api: api1,
    params: {
      mappingWord: keywords.join(','),
      keywordsSplit: bzcdName,
      id: (cdbh + index * 1)
    }
  }
}
