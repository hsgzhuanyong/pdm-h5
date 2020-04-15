import axios from '@/libs/api.request';

// 客户列表
export const list = data => {
  return axios.request({
    url: '/mock/demo/list',
    data,
    methods: 'get'
  });
};
