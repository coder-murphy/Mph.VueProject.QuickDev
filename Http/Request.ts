import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './SafeLocalStorage'

// 1. 创建 axios 实例
const service = axios.create({
  // 基础URL（可根据环境配置）
  baseURL: '/api', 
  timeout: 10000 // 请求超时时间
})

// 2. 请求拦截器
service.interceptors.request.use(
  config => {
    // 自动携带 Token（登录后存在 localStorage）
    const token = getToken()
    if (token) {
      const realToken = token.trim(); // 🔥 必加
      config.headers.Authorization = `Bearer ${realToken}`;
    }

    // ✅ 加上这一行，强制发送 JSON 格式
    // config.headers['Content-Type'] = 'application/json'

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 3. 响应拦截器
service.interceptors.response.use(
  response => {
    // 直接返回后端数据（简化使用）
    return response.data
  },
  error => {
    // 统一错误处理
    const { response } = error

    // 网络错误直接返回
    if (error.message.includes("Network")) {
      return Promise.reject(error)
    }

    if (!response) {
      ElMessage.error('网络异常，请检查连接')
      return Promise.reject(error)
    }

    // 只处理真正的 401 授权失效
    if (response.status === 401) {
      const msg = response.data?.msg || ''
      const isTokenExpired =
        msg.includes('TOKEN') ||
        msg.includes('过期') ||
        msg.includes('未授权') ||
        msg.includes('登录已失效')

      // ✅ 只有真正 token 失效，才清理 + 跳登录
      if (isTokenExpired) {
        removeToken()
        ElMessage.warning('登录已过期，请重新登录')
        window.location.href = '/login'
      } else {
        // ✅ 普通 401（权限/跨域）不清理、不跳转！
        console.log('普通401（权限/预检），不跳登录')
      }
      return Promise.reject(error)
    }

    // 其他错误正常提示，不影响 Token
    switch (response.status) {
      case 400:
        ElMessage.error(response.data?.msg || '请求参数错误')
        break
      case 403:
        ElMessage.error('没有权限访问')
        break
      case 404:
        ElMessage.error('请求地址不存在')
        break
      case 500:
        ElMessage.error('服务器异常')
        break
      default:
        ElMessage.error(response.data?.msg || '请求失败')
    }

    return Promise.reject(error)
  }
)

export default service