import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/home/HomePage";

const routes = [
  {
    page: "/",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
