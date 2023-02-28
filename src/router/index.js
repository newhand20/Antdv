import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from "../views/404.vue"

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
        meta:{ title:"表单"},
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

  //form

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
  next;
  NProgress.done();
  next();
})


export default router;
