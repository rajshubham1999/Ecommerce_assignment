
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import ListingPage from "../components/ListingPage.vue";

const routes = [
  { path: "/", name: "login", component: LoginPage },
  {
    path: "/list",
    name: "list",
    component: ListingPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem("authToken");
      if (isAuthenticated) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
