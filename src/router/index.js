import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MyPageView from "../views/MyPageView2.vue";
import ProjectMainView from "../views/ProjectMainView.vue";
import MonitoringView from "../components/MonitoringView.vue";
import AuthView from "../components/AuthView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPageView,
  },
  {
    path: "/project",
    name: "ProjectMainView",
    component: ProjectMainView,
    children: [
      {
        path: "monitor/",
        name: "MonitoringView",
        component: MonitoringView,
      },
      {
        path: "auth/",
        name: "AuthView",
        component: AuthView,
      },
    ]
  },

  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
