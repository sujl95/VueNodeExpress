import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/Register",
      name: "Register",
      component: Register,
    },
  ],
});