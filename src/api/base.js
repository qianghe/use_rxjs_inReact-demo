import Axios from 'axios'

const service = Axios.create({
  timeout: 99000, // 请求超时时间,
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
}, error => {
  console.log('axios request:', error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  async (response) => {
    /**
     * code 0 是正常 可结合自己业务进行修改
     */
    const data = response.data
    const code = data?.code
    if (code !== 0) {
      throw data
    }
    return data.data !== undefined ? data.data : data
  }
)

export default service