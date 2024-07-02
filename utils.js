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
  return fullNameList.filter(name => calculateSimilarity(name, targetName) >= threshold);
}
