/**
 * @desc: 字符串相似度比较算法。一个常见的算法是Levenshtein距离（编辑距离），它衡量两个字符串之间需要多少次插入、删除或替换操作才能将一个字符串转换成另一个字符串。
 * @param {*} a
 * @param {*} b
 */
function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill(0).map(() => Array(a.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

function calculateSimilarity(a, b) {
  const maxLength = Math.max(a.length, b.length);
  const distance = levenshteinDistance(a, b);
  return (maxLength - distance) / maxLength;
}

export function filterNames(fullNameList, targetName, threshold = 0.25) {
 return fullNameList
    .filter(name => calculateSimilarity(name, targetName) >= threshold)
    .sort((a, b) => calculateSimilarity(b, targetName) - calculateSimilarity(a, targetName));
}

// 创建一个方法, 通过name找到comparisonTable里面的name中相似度最高的对象,匹配出targetName
export function getSimilarName(name, threshold = 0.6) {
const fullNameList =comparisonTable.map(item => item.name)
  const filteredNames = filterNames(fullNameList, name, threshold);
  const filter = filteredNames.length > 0 ? filteredNames[0] : null
  if (filter) {
    const obj = comparisonTable.find(item => item.name === filter)
    return obj.targetName
  }
  return null ;
}
// 绝缘阻抗值组串式
export const comparisonTable = [
  //  {name:'1_PV17输入电压', targetName:'支路电压3组串式'},
  // { name: '1_PV17输入电流', targetName: '支路电流17组串式' },
  { name: '1_线电压 L1-L2', targetName: '电网AB电压组串式' },
  { name: '1_线电压 L2-L3', targetName: '电网BC电压组串式' },
  { name: '1_线电压 L3-L1', targetName: '电网CA电压组串式' },
  { name: '1_R相并网电压', targetName: '电网A相电压组串式' },
  { name: '1_S相并网电压', targetName: '电网B相电压组串式' },
  { name: '1_T相并网电压', targetName: '电网C相电压组串式' },
  { name: '1_R相并网电流', targetName: '电网A相电流组串式' },
  { name: '1_S相并网电流', targetName: '电网B相电流组串式' },
  { name: '1_T相并网电流', targetName: '电网C相电流组串式' },
  { name: '1_电网频率', targetName: '电网频率组串式' },
  { name: '1_有功功率', targetName: '有功功率组串式' },
  { name: '1_无功功率', targetName: '无功功率组串式' },
  { name: '1_功率因数', targetName: '功率因数组串式' },
  { name: '1_输入功率', targetName: 'DC输入总功率组串式' },
  { name: '1_机内温度', targetName: '内部温度组串式' },
  // { name: '1_转换效率', targetName: '支路电流17组串式' },
  { name: '1_设备上报逆变器日发电量', targetName: '当日发电量组串式' },
  { name: '1_设备上报总累计发电量', targetName: '总发电量组串式' },
  { name: '1_逆变器运行状态', targetName: '逆变器状态组串式' },
  { name: '1_逆变器开机时间', targetName: '逆变器开机时间组串式' },
  { name: '1_逆变器关机时间', targetName: '逆变器关机时间组串式' },
  { name: '1_月发电量', targetName: '月发电量组串式' },
  { name: '1_年发电量', targetName: '年发电量组串式' },
  // { name: '1_逆变器运行状态（天津）', targetName: '逆变器状态组串式' },
 ]
