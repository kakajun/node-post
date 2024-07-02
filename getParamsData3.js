import 'dotenv/config'
// 请求地址
const updateCdZdymc = process.env.BASEURL + '/cdpz/updateCdZdymc'
const updateMappStatus = process.env.BASEURL + '/bzcd/updateMappStatus'
const getCdpzLickMultCdmc = process.env.BASEURL + 'cdpz/getCdpzLickMultCdmc'   // 查询
const getBzcdList = process.env.BASEURL + '/bzcd/getBzcdList'   // 得到总的列表(主要从里面找bm)
// {
//   "keyword": "支路电流1组串式_many1.0_BCG_1321000000128_xlbxygfdz,支路电流1组串式_many1.1_BCG_1321000000128_xlbxygfdz,支路电流1组串式_dq__1321000000128_xlbxygfdz"
//
'支路电压1组串式_many1.0_A_1801063816405577728_gtjjlfgdz,支路电压1组串式_many1.1_A_1801063816405577728_gtjjlfgdz,支路电压1组串式_many1.4_A_1801063816405577728_gtjjlfgdz'
'支路电压1组串式_many1.0_A_1799008028174422016_gtjjlfgdz,支路电压1组串式_many1.1_A_1799008028174422016_gtjjlfgdz,支路电压1组串式_many1.4_A_1799008028174422016_gtjjlfgdz'
// }

export function test() {
  return {
    api: updateCdZdymc,
    params: { keyword: '支路电压1组串式_many1.0_BBM_1321000000128_xlbxygfdz' }
  }
}

// 写死的参数
const cdModelName = 'many1.0'
const cdModelName2 = 'many1.1'
const cdModelName3 = 'many1.4'
const fc = 'gtjjlfgdz'

/**
 * @description: 专门处理电流
 * @param {*} index  路数 1
 * @param {*} code  编码 BCG
 */
export function getParamsDl(code, road = 1, bm,listName) {
  function getbaseKeyword(cdModelName) { return `${listName}_${cdModelName}_${code}_${bm}_${fc}` };
  // 初始化关键词数组
  const keywords = [getbaseKeyword(cdModelName)];
  // 根据路数量决定是否添加额外的关键词
  if (road === 2) {
    keywords.push(getbaseKeyword(cdModelName2));
  }
  if (road === 3) {
    keywords.push(getbaseKeyword(cdModelName2));
    keywords.push(getbaseKeyword(cdModelName3));
  }

  return {
    api: updateCdZdymc,
    params: {
      keyword: keywords.join(',')
    }
  };
}


// {
//   "mappingWord": "支路电流1组串式_many1.0_BCG_xlbxygfdz,支路电流1组串式_many1.1_BCG_xlbxygfdz",
//   "keywordsSplit": "支路电流1组串式",
//   "id": "1321000000128"

// 支路电压1组串式_many1.0_A_gtjjlfgdz,支路电压1组串式_many1.1_A_gtjjlfgdz,支路电压1组串式_many1.4_A_gtjjlfgdz
// }

/**
 * @description: 专门处理电流
 * @param {*} index  路数 1
 * @param {*} code  编码 BCG
 */

export function getParamsDlData( code, road = 1, bm,listName) {
  function getmappingWord(cdModelName) { return listName + '_' + cdModelName + '_' + code + '_' + fc }
  const keywords = [getmappingWord(cdModelName)];
  // 根据路数量决定是否添加额外的关键词
  if (road === 2) {
    keywords.push(getmappingWord(cdModelName2));
  }
  if (road === 3) {
    keywords.push(getmappingWord(cdModelName2));
    keywords.push(getmappingWord(cdModelName3));
  }
  return {
    api: updateMappStatus,
    params: {
      mappingWord: keywords.join(','),
      keywordsSplit:'',
      id: bm
    }
  }
}

export function serchData(code) {
  return {
    api: getCdpzLickMultCdmc,
    params: {
      "fdlx": 2,
      "cdmc": "",
      "cdbhLen": 6,
      "dwbm": "1799008028174422016",
      "cdbh": code,
      "fc": fc
    }
  }

}
export function getList() {
  return {
      api: getBzcdList,
    params: {
    "keyword": "组串",
    "cdLx": "",
    "fdlx": 2,
    "page": 1,
    "pageSize": 100000,
    "cdSxfl": "",
    "bjCode": ""
  }
  }
}
