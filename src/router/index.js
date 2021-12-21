import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "@/router/authGuard";
const LoginPage = () => import("@/views/login/LoginPage");
const HomePage = () => import("@/views/home/HomePage");
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");
const LoginCallbackPage = import("@/views/login/LoginCallbackPage");
const cartPage = import("@/views/cart/cartPage");
const CheckoutPage = () => import("@/views/pay/CheckoutPage");
const routes = [
  {
    page: "/",
    component: HomePage,
  },
  {
    path: "/category/:id",
    component: TopCategoryPage,
  },
  {
    path: "/category/sub/:id",
    component: SubCategoryPage,
  },
  {
    path: "/goods/:id",
    component: GoodsDetailPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/login/callback",
    component: LoginCallbackPage,
  },
  {
    path: "/cart",
    component: cartPage,
  },
  {
    path: "/checkout/order",
    component: CheckoutPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

router.beforeEach(authGuard);
export default router;
