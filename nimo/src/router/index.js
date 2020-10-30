import Vue from 'vue'
import VueRouter from 'vue-router'
// 测验组件
import CoverFlow from '../components/index/CoverFlow.vue'
import Cube from '../components/index/Cube.vue'

// 组件
import Header from '../components/index/Header.vue'

// 页面组件


Vue.use(VueRouter)

const routes = [
  {
    path: '/cube',
    component: Cube
  },
  {
    path: '/coverFlow',
    component: CoverFlow
  },

  // 页面组件
  {
    path: '/header',
    component: Header
  },

  // 懒加载
  {
    path: '/',
    component: () => import('@/views/layout'),
    // 路由嵌套
    children: [
      {
        path: "",//默认子路由，
        component: () => import('@/views/Home.vue'),
      },
      {
        path: "/love",
        component: () => import('@/views/Love.vue'),
      },
      {
        path: "/message",
        component: () => import('@/views/Message.vue'),
      },
      {
        path: "/me",
        component: () => import('@/views/Me.vue'),
      },
    ]
  },

  {
    path: '/login',
    component: () => import("@/views/Login.vue")
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  // 路由传递参数
  {
    path: '/details/:roomid',
    component: () => import('@/views/Details'),
    // 组件中动态的获取路由参数
    props: true
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
