import scrollLoading from './module/scrollLoading';

const importDirective = Vue => {
  // 滚动加载指令 v-scroll="options"
  Vue.directive('scroll', scrollLoading);
};

export default importDirective;
