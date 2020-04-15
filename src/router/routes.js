export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      title: 'home'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: '404'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
];
