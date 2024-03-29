import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'home'},
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: StatisticsView
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView
        }
    ]
})

export default router
