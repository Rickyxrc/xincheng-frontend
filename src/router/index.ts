import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/problems/XC:pid/",
    props: true,
    name: "problem",
    component: () => import("../views/ProblemView.vue"),
  },
  {
    path: "/problems/XC:pid/edit",
    props: true,
    name: "editproblem",
    component: () => import("../views/EditProblem.vue"),
  },
  {
    path: "/problems/XC:pid/submit",
    props: true,
    name: "submitproblem",
    component: () => import("../views/SubmitProblem.vue"),
  },
  {
    path: "/records/list",
    name: "recordlist",
    component: () => import("../views/RecordList.vue"),
  },
  {
    path: "/records/:rid",
    props: true,
    name: "recordproblem",
    component: () => import("../views/RecordView.vue"),
  },
  {
    path: "/problems/list/",
    name: "problemlist",
    component: () => import("../views/ProblemList.vue"),
  },
  {
    path: "/repasswd",
    component: () => import("../views/RepasswordView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
