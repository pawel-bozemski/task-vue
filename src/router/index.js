import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Task from "../views/Task.vue";
import NewTask from "../views/NewTask.vue";

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
    component: Task,
  },
  {
    name: "new-task",
    path: "/new-task",
    component: NewTask,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
