import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NProgress from 'nprogress'
import { notification } from 'ant-design-vue';
import 'nprogress/nprogress.css'
import findLast from 'lodash/findLast'
import NotFound from "../views/404.vue"
import Forbidden from "../views/403.vue" //权限不够页面，因为提前把页面隐掉了，所以不会出现在导航栏里
import {check, isLogin} from '../utils/auth'

const routes = [
  //User
  {
    path: "/user",
    hideInMenu:true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/UserLayout.vue"),
    children:[
      {
        path: "/user",
        redirect:"/user/login"
      },
      {
        path: "/user/login",
        name:"login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Login.vue"),
      },
      {
        path: "/user/register",
        name:"register",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Register.vue"),
      },
    ]
  },


  //Dashboard
  {
    path: "/",
    meta: {authority: ["user", "admin"]},
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/BasicLayout.vue"),
    children:[
      //dashboard
      {
        path: "/dashboard",
        name:"dashboard",
        meta:{title:"仪表盘"},
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Dashboard/Dashboard.vue"),
        children:[
          {
            path: "/dashboard/analysis",
            name:"analysis",
            meta:{ title:"分析页"},
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/Dashboard/Analysis.vue"),
          }
        ]
      },

      {
        path: "/form",
        name:"form",
        meta:{ title:"表单", authority: ["admin"]},
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Forms/form.vue"),
    
        children:[
          {
            path: "/form/basic-form",
            name:"basicform",
            meta:{ title:"基础表单"},
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/Forms/BasicForm.vue"),
          },
          {
            path: "/form/step-form",
            name:"stepform",
            hideChildInMenu:true,
            meta:{ title:"分步表单"},
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/Forms/StepForm/index.vue"),
            children:[
              {
                path: "/form/step-form",
                redirect:"/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name:"info",
                component:()=>
                  import(/* webpackChunkName: "about" */ "../views/Forms/StepForm/Step1.vue"),
              },
              {
                path: "/form/step-form/confirm",
                name:"confirm",
                component:()=>
                  import(/* webpackChunkName: "about" */ "../views/Forms/StepForm/Step2.vue"),
              },
              {
                path: "/form/step-form/result",
                name:"result",
                component:()=>
                  import(/* webpackChunkName: "about" */ "../views/Forms/StepForm/Step3.vue"),
              },
            ]
          },
        ]
      },
    ]
  },

  {
    path: "/403",
    name:"403",
    hideInMenu:true,
    component:Forbidden
  }

  // {
  //   path: "*",
  //   name:"NotFound",
  //   hideInMenu:true,
  //   component:NotFound
  // }
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next)=>{
  if(to.path != from.path){
    NProgress.start();
  }
  const record = findLast(to.matched, record=>record.meta.authority)
  console.log("record",record)
  //存在且权限不足，分两种情况
  if(record && !check(record.meta.authority)){
    //未登录跳到登录界面
    if(!isLogin && to.path !== "/user/login"){
      next({
        path:"/user/login"
      });
      //已登录信息提示权限不够，跳到403
    } 
    else if (to.path !== "/403") {
      notification[type]({
        message: '403',
        description: '你没权限访问，请联系管理员',
      });
      next({
        path:"/403"
      })
    }
  }
  
  NProgress.done();
  next();
})


export default router;
