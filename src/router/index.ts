import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import AuthLayout from "../layouts/AuthLayout.vue";
import AppLayout from "../layouts/AppLayout.vue";

import RouteViewComponent from "../layouts/RouterBypass.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "dashboard" },
  },
  {
    name: "admin",
    path: "/",
    component: AppLayout,
    redirect: { name: "dashboard" },
    children: [
      {
        name: "dashboard",
        path: "dashboard",
        component: () => import("../pages/admin/dashboard/Dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "settings",
        path: "settings",
        component: () => import("../pages/settings/Settings.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "preferences",
        path: "preferences",
        component: () => import("../pages/preferences/Preferences.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "users",
        path: "users",
        component: () => import("../pages/users/UsersPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "projects",
        path: "projects",
        component: () => import("../pages/contests/ConstestsPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "fotoclubs",
        path: "fotoclubs",
        component: () => import("../pages/fotoclubs/FotoclubsPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "secciones",
        path: "secciones",
        component: () => import("../pages/sections/SectionsPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "categorias",
        path: "categorias",
        component: () => import("../pages/categorys/CategorysPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "metricas",
        path: "metricas",
        component: () => import("../pages/metrics/MetricsPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("../pages/auth/Login.vue"),
      },
      {
        name: "signup",
        path: "signup",
        component: () => import("../pages/auth/Signup.vue"),
      },
      {
        name: "recover-password",
        path: "recover-password",
        component: () => import("../pages/auth/RecoverPassword.vue"),
      },
      {
        name: "recover-password-email",
        path: "recover-password-email",
        component: () => import("../pages/auth/CheckTheEmail.vue"),
      },
      {
        path: "",
        redirect: { name: "login" },
      },
    ],
  },
  {
    name: "404",
    path: "/404",
    component: () => import("../pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      window.scrollTo(0, 0);
    }
  },
  routes,
})

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
