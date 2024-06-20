// 引入axios
import axios from 'axios';
import 'dotenv/config'
const accessToken = process.env.ACCESS_TOKEN;
// 封装带token的POST请求方法
export default async function postRequest(url, data) {
  if (!accessToken) {
    throw new Error('Access token is required.');
  }

  try {
    // 配置请求头
    const config = {
      headers: {
        Authorization: accessToken
      },
    };
    const response = await axios.post(url, data, config);

    // 后置守卫：处理成功响应
    return handleSuccessResponse(response);
  } catch (error) {
    // 后置守卫：处理错误响应
    return handleError(error);
  }
}

// 处理成功响应的函数示例
function handleSuccessResponse(response) {
  // console.log('Request successful:', response.data);
  return response.data; // 或者根据需要处理返回数据
}

// 处理错误的函数示例
function handleError(error) {
  console.error('Request failed:', error.message);
  throw error;
}
