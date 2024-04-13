import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import BookPage from "@/views/BookPage.vue"; // Import Books component
import CartPage from "@/views/CartPage.vue"; // Import Cart component
import NotFound from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "login" }, // Redirect to login page by default
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
    meta: { requiresAuth: true },
    children: [
      {
        path: "books", // Route for Books component
        name: "books",
        component: BookPage,
        meta: { requiresAuth: true }, // Add meta if authentication is required
      },
      {
        path: "cart", // Route for Cart component
        name: "cart",
        component: CartPage,
        meta: { requiresAuth: true }, // Add meta if authentication is required
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },

  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If route requires authentication, check if user is authenticated
    if (!localStorage.getItem("token")) {
      // If user is not authenticated, redirect to login
      next({ name: "login" });
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Proceed to the route
  }
});

export default router;
