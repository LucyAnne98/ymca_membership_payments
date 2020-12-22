import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      authenticatedPath: '/admin'
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    meta: {
      authRequired: true
    }

  },
  {
    path: "/check",
    name: "Membership Check",
    component: () => import("../views/MembershipCheck.vue"),
    meta: {
      authRequired: false
    }
  },
  {
    path: "/memberships",
    name: "Memberships",
    component: () => import("../views/Memberships.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/superadmin",
    name: "SuperAdmin",
    component: () => import("../views/SuperAdmin.vue"),
    meta: {
      authRequired: false
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

});


router.resolveAuthenticated = function (to, from, next) {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({
        path: '/sign'
      });
    } else {
      next();
    }
  } else if(to.matched.some(record => record.meta.superAdmin)) {
    if (!store.state.isSuperAdmin) {
      next({
        path: '/sign'
      });
    } else {
      next();
    }
  }
  else {
    if (store.state.isAuthenticated && to.meta.authenticatedPath !== null && to.meta.authenticatedPath !== undefined) {
      next({
        path: to.meta.authenticatedPath
      });
    } else {
      next();
    }
  }
};

router.beforeEach((to, from, next) => {
  if (store.state.isAuthenticated === null || store.state.isAuthenticated === undefined) {
    store.dispatch('getUser').then(() => {
      router.resolveAuthenticated(to, from, next);
    }).catch(() => {
      router.resolveAuthenticated(to, from, next);
    });
  } else {
    router.resolveAuthenticated(to, from, next);
  }
});


export default router;
