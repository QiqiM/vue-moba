import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [{ path: "/home", name: "home", component: Home }],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//     if (!to.meta.isPublic && !localStorage.token) {
//         return next('/login')
//     }
//     next()
// })
export default router
