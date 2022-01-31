import { createRouter, createWebHistory } from "vue-router";
import TasksPage from "../views/pages/TasksPage";
import LoginPage from "../views/pages/auth/LoginPage";

const routes = [
    {
        path: "/",
        name: TasksPage,
        component: TasksPage,
        meta: {
            layout: "main",
        },
    },
    {
        path: "/login",
        name: LoginPage,
        component: LoginPage,
        meta: {
            layout: "auth",
        },
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: "active",
    linkExactActiveClass: "active",
});

export default router;
