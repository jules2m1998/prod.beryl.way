import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import i18n from "@/core/plugins/i18n";

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
          pageTitle: "dashboard",
          breadcrumbs: ["dashboard"],
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
          addPathName: "agenciesAdd",
        },
      },
      {
        path: "/agency/add",
        name: "agenciesAdd",
        component: () => import("@/views/agency/AddAgence.vue"),
        meta: {
          pageTitle: "addAgence",
          breadcrumbs: ["agency", "new"],
        },
      },
      {
        path: "/agency/:id",
        name: "update-agency",
        component: () => import("@/views/agency/AddAgence.vue"),
        meta: {
          pageTitle: "addAgence",
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
          addPathName: "user-add",
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
          pageTitle: "Chat",
          breadcrumbs: ["Apps", "Chat"],
        },
      },
      {
        path: "/zone",
        name: "zone",
        component: () => import("@/views/zone/Index.vue"),
        meta: {
          pageTitle: "adminZone",
          breadcrumbs: ["Zone"],
          addPathName: "create-zone",
        },
      },
      {
        path: "/zone/create",
        name: "create-zone",
        component: () => import("@/views/zone/Create.vue"),
        meta: {
          pageTitle: "adminZoneCreate",
          breadcrumbs: ["Zone", "new"],
        },
      },
      {
        path: "/zone/:id",
        name: "update-zone",
        component: () => import("@/views/zone/Create.vue"),
        meta: {
          pageTitle: "adminZoneCreate",
          breadcrumbs: ["Zone", "new"],
        },
      },
      {
        path: "/zone/type",
        name: "zone-type",
        component: () => import("@/views/zone/type-zone/Index.vue"),
        meta: {
          pageTitle: "adminZoneType",
          breadcrumbs: ["Zone", "Type"],
          addPathName: "zone-type-create",
        },
      },
      {
        path: "/zone/type/create",
        name: "zone-type-create",
        component: () => import("@/views/zone/type-zone/Create.vue"),
        meta: {
          pageTitle: "adminZoneTypeCreate",
          breadcrumbs: ["Zone", "Type", "Create"],
        },
      },
      {
        path: "/zone/type/:id",
        name: "zone-type-update",
        component: () => import("@/views/zone/type-zone/Create.vue"),
        meta: {
          pageTitle: "adminZoneTypeUpdate",
          breadcrumbs: ["Zone", "Type", "Update"],
        },
      },
      {
        path: "/calendar",
        name: "calendar",
        component: () => import("@/views/apps/Calendar.vue"),
        meta: {
          pageTitle: "Calendar",
          breadcrumbs: ["Calendar"],
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
  document.title = `${i18n.global.t(to.meta.pageTitle as string)} - ${
    import.meta.env.VITE_APP_NAME
  }`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  // authStore.verifyAuth();

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
