import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router) //中间件

//整个项目的路由词典：访问路径 <=> 视图组件
//为每个视图组件指定对应的挂载地址
export default new Router({
  routes: [
    { path:'/',redirect:'/login'},
    { path:'/login',component:Login },
    { path:'/main',component:Main },
    { path:'/*',component:NotFound }
  ]
})
