import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes, // short for routes: routes
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active"
});

export default router;
