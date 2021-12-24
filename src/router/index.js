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
const PayPage = () => import("@/views/pay/PayPage");
const PayResultPage = () => import("@/views/pay/PayResultPage");
const MemberHomePage = () => import("@/views/member/home/MemberHomePage");
const OrderListPage = () => import("@/views/member/order/OrderListPage");
const OrderDetailPage = () => import("@/views/member/order/OrderDetailPage");
const OrderView = () => import("@/views/member/order/OrderView");
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
  {
    path: "/checkout/pay",
    component: PayPage,
  },
  {
    path: "/pay/callback",
    component: PayResultPage,
  },
  {
    path: "/member/home",
    component: MemberHomePage,
  },
  {
    path: "/member/order",
    component: OrderView,
    children: [
      {
        path: "",
        component: OrderListPage,
      },
      {
        path: ":id",
        component: OrderDetailPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  linkActiveClass: "fuzzy-active",
  linkExactActiveClass: "exact-active",
  routes,
});

router.beforeEach(authGuard);
export default router;
