import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import config from '@/config';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: config.rootPath,
  routes
});

router.beforeEach((to, form, next) => {
  if (to.meta && to.meta.title) document.title = to.meta.title;
  next();
});

export default router;
