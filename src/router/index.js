import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import SingleProductView from "@/views/SingleProductView.vue";
import OrdersView from "@/views/OrdersView.vue";
import AdditionalView from "@/views/AdditionalView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ReservesView from "@/views/ReservesView.vue";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "home",
         meta: { layout: "main" },
         component: HomeView,
      },
      {
         path: "/mahsulotlar",
         name: "products",
         meta: { layout: "main" },
         component: ProductsView,
      },
      {
         path: "/mahsulotlar/:id",
         name: "single-product",
         meta: { layout: "main" },
         component: SingleProductView,
      },
      {
         path: "/xaridlar",
         name: "orders",
         meta: { layout: "main" },
         component: OrdersView,
      },
      {
         path: "/zaxira",
         name: "reserves",
         meta: { layout: "main" },
         component: ReservesView,
      },
      {
         path: "/qo'shimcha",
         name: "additional",
         meta: { layout: "main" },
         component: AdditionalView,
      },
      {
         path: "/login",
         name: "login",
         meta: { layout: "empty" },
         component: LoginView,
      },
      {
         path: "/:pathMatch(.*)*",
         name: "not-found",
         meta: { layout: "empty" },
         component: NotFoundView,
      },
   ],
});

export default router;
