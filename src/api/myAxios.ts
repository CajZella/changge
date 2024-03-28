import axios from "axios";
import {ElMessage} from "element-plus";

const myAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

myAxios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    ElMessage.warning('网络连接异常,请稍后再试')
    return Promise.reject(error)
  }
);
myAxios.interceptors.response.use(
  response => {
    if (response.data['code'] === 200) {
      ElMessage.success(response.data['msg'])
      return Promise.resolve(response)
    } else {
      ElMessage.error(response.data['msg'])
      return Promise.reject(response)
    }
  },
  error => {
    const {response} = error
    if (response) {
      ElMessage.error(response.data['msg'])
      return Promise.reject(response)
    } else {
      ElMessage.warning('网络连接异常,请稍后再试')
    }
  }
)

export default myAxios;