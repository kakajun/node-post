import fs from 'fs';
import axios from 'axios';
import xlsx from 'node-xlsx';
import { getParamsDl } from './getParamsData.js';
// 读取Excel文件
const buffer = fs.readFileSync('ceshi.xlsx');
const data = xlsx.parse(buffer);

// 假设我们读取第一个工作表
const sheet = data[0].data;

// 遍历Excel中的数据
sheet.forEach((row, index) => {
  if (index === 0) return; // 跳过标题行

  // 假设我们读取第一列和第二列的数据
  const name = row[8];
  const code = row[9];

  const pattern = /(?<=NB|PV)(\d{1,2})/g;
  const matches = name.match(pattern);
  // 如果格式符合才发请求
  if (matches.length == 2) {
     const [arrear,ls]= matches;
     // 只发21区的
     if (arrear==21) {
      console.log(ls,code);
      const dataA = getParamsDl(ls,code,name)
      console.log(dataA);
      // axios.post(dataA.api, dataA.getParamsDl())
      //   .then(response => {
      //     console.log('请求成功:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('请求失败:', error);
      //   });
     }
  }
});
