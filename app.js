import fs from 'fs';
import postRequest from './request.js';
import xlsx from 'node-xlsx';
import 'dotenv/config'
import { getParamsDl,getParamsDlData,test } from './getParamsData.js';
// 读取Excel文件
const buffer = fs.readFileSync('ceshi.xlsx');
const data = xlsx.parse(buffer);

// 假设我们读取第一个工作表
const sheet = data[0].data;

// 遍历Excel中的数据
sheet.forEach(async (row, index) => {
  if (index === 0) return; // 跳过标题行
  // 假设我们读取第一列和第二列的数据
  const name = row[8];
  const code = row[9];

  const pattern = /(?<=NB|PV)(\d{1,2})/g;
  const matches = name.match(pattern);
  // 如果格式符合才发请求
  if (matches.length == 2) {
     const [arrear,index]= matches;

   const aNum=21  // 只发21区的
   const postName='电压'

     if (arrear==aNum&&name.includes(postName)) {
      const dataA = getParamsDl(index,code,name,2)
      const dataB = getParamsDlData(index,code,name,2)
      // console.log(index,code);
      // console.log(dataA);
      // console.log(dataB);

      try {
        await postRequest(dataA.api, dataA.params)
        await postRequest(dataB.api, dataB.params)
        console.log('请求成功'+index)
      } catch (error) {
        console.error('请求失败:', error);
      }
     }
  }
});
