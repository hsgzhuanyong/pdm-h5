import Mock from 'mockjs';
import * as demo from './module/demo';

// 正则匹配/mock/demo开头
Mock.mock(/^\/mock\/demo.*/, 'get', demo.list);
