import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/unboarding-request",
        name: "unboarding-request",
        component: () => import("@/views/UnboardingRequest.vue"),
        meta: {
          pageTitle: "unboardingRequest",
          breadcrumbs: ["unboardingRequest"],
        },
      },
      {
        path: "/credit",
        name: "credit",
        component: () => import("@/views/Credit.vue"),
        meta: {
          pageTitle: "credit",
          breadcrumbs: ["credit"],
        },
      },
      {
        path: "/agency",
        name: "agencies",
        component: () => import("@/views/agency/Agencies.vue"),
        meta: {
          pageTitle: "agency",
          breadcrumbs: ["agency"],
          addPathName: "agenciesAdd"
        },
      },
      {
        path: "/agency/add",
        name: "agenciesAdd",
        component: () => import("@/views/agency/AddAgence.vue"),
        meta: {
          pageTitle: "Add new agence",
          breadcrumbs: ["agency", "new"],
        },
      },
      {
        path: "/complaints",
        name: "complaints",
        component: () => import("@/views/Complaints.vue"),
        meta: {
          pageTitle: "complaint",
          breadcrumbs: ["complaint"],
        },
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/user/Index.vue"),
        meta: {
          pageTitle: "user",
          breadcrumbs: ["user"],
          addPathName: "user-add"
        },
      },
      {
        path: "/users/add",
        name: "user-add",
        component: () => import("@/views/user/AddUser.vue"),
        meta: {
          pageTitle: "add user",
          breadcrumbs: ["user", "add"],
        },
      },
      {
        path: "/questions",
        name: "questions",
        component: () => import("@/views/question/Index.vue"),
        meta: {
          pageTitle: "question",
          breadcrumbs: ["question"],
        },
      },
      {
        path: "/questions/update/:id",
        name: "questionsUpdate",
        component: () => import("@/views/question/Update.vue"),
        meta: {
          pageTitle: "Question update",
          breadcrumbs: ["question", "update"],
        },
      },
      {
        path: "/chat",
        name: "chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
          pageTitle: "Private Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
