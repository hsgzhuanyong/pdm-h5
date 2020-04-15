import axios from 'axios';
import Qs from 'qs';

if (process.env.NODE_ENV === 'development') {
  // 如果是开发环境，设置指定token为需要的那个活动uniqid，设置为那个活动就是获取那个活动的数据
  axios.defaults.headers.common.token = 'token123456';
}

axios.interceptors.request.use(config => {
  if (config.data) {
    config.data = Qs.stringify(config.data);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  if (response.data.status === 1) {
    return response.data;
  }
  return Promise.reject(response.data.msg || response.data.message || '网络繁忙');
}, error => {
  return Promise.reject(error);
});

export default axios;
