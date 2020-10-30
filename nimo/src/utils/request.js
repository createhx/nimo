// 封装axios请求模块
import axios from "axios"
const request = axios.create({
    baseURL: "http://127.0.0.1:3000"
})

// 请求拦截
// 响应拦截
export default request