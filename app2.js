import fs from 'fs';
import postRequest from './request.js';
import xlsx from 'node-xlsx';
import 'dotenv/config'
import { getParamsDl, getParamsDlData, test, serchData, getList } from './getParamsData2.js';
// 读取Excel文件
const buffer = fs.readFileSync('ceshi2.xls');
const data = xlsx.parse(buffer);

// 假设我们读取第一个工作表
const sheet = data[0].data;


function getTotalList(aNum) {
  return new Promise(async (resolve, reject) => {
    const paramsBz = getList()
    const res = await postRequest(paramsBz.api, paramsBz.params)
    const totalList = res.datas.rows
    if (totalList && totalList.length > 0) {
      const onlyNum = totalList.filter(o => o.nbqGroup == 'N' + aNum)
      // resolve(totalList)
      resolve(onlyNum)
    } else {
      reject(new Error('No data found'));
    }
  });

}

/**
 * @desc:  根据excel中的name找 list 中编码
 * @param {*} totalList
 */
function getCode(name, totalList, postName) {
  // 这里面已经是选中区的数据
  console.log('name:', name);
  const regex =  /_PV(\d{1,2})/;
  const match = name.match(regex);
  if (match) {
    const sherchIndex = match[1]
    console.log('匹配到的数字:', sherchIndex);
    const listName = `支路${postName}${sherchIndex}组串式`
    const listObj = totalList.find(o => o.cdName == listName)
    const bm = listObj && listObj.id
    if (!bm) {
      console.log('没有找到编码:', postName, sherchIndex);
      return null
    }
    return {bm,sherchIndex}
  }
}


function posetData(totalList, aNum, postName) {
  // 遍历Excel中的数据
  sheet.forEach(async (row, index) => {
    if (index === 0) return; // 跳过标题行
    // 假设我们读取第一列和第二列的数据
    const name = row[8];
    const code = row[9];
    const matches = name.split('_')
    const arrear = matches[0]
    if (arrear == aNum && name.includes(postName)) {
      const codeObj = getCode(name, totalList, postName)
      if (codeObj) {
        const {bm,sherchIndex}=codeObj
        // 先搜索,确保有测点
        const sherchParams = serchData(code)
        try {
          const res = await postRequest(sherchParams.api, sherchParams.params)
          if (res.code == 200) {
            // 只要0,1,4 这记路
            const datas = [res.datas[0], res.datas[1], res.datas[4]]
            const flag = datas.every(o => o.data.length > 0)
            if (flag) {
              // const bm = datas[0].data[0].dwbm
              const dataA = getParamsDl(sherchIndex, code, name, 3, bm)
              const dataB = getParamsDlData(sherchIndex, code, name, 3, arrear, bm)
              await postRequest(dataA.api, dataA.params)
              await postRequest(dataB.api, dataB.params)
              console.log('请求成功:', name, code, sherchIndex)
              console.log(dataA);
              console.log(dataB);

            } else {
              console.log(name, code, "不符合条件");
            }
          }

        } catch (error) {
          console.error('请求失败:', error);
        }
      }


    }
  });
}



async function main() {
  // 暂读几区
  const aNum = 1
  const postName = '电压'

  const totalList = await getTotalList(aNum)

  posetData(totalList, aNum, postName)

}

main()
