//封装axios和feach
import axios from 'axios'
const baseUrl = "http://172.16.58.62:3001"

// 创建axios实例
const service = axios.create({
    baseURL: baseUrl, // api 的 base_url
    timeout: 30000 // 请求超时时间
})

// 获取缓存的token和email
const token = localStorage.getItem('token')
const email = localStorage.getItem('email')
service.interceptors.request.use(
    config => {
        config.headers.email = email
        config.headers.token = token
        return config
    },
    error => {
        console.log(error) // for debug 11
        Promise.reject(error)
    }
)
const Api = async (e) => {
    try {
        let res = await service.request({
            method: e.method,
            url: e.url,
            data: e.data,
            headers: e.header
        })
        return  e.success(res.data)
    }catch (err) {
        return err
    }
}

// @ts-ignore
export default Api