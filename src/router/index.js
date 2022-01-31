import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Single from "../views/Single.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    name: "task",
    path: "/task/:id",
    component: Single,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
