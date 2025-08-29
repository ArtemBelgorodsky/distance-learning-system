import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
	{ path: '/', name: 'home', component: () => import('../views/Home.vue') },
	{ path: '/login', name: 'login', component: () => import('../views/Login.vue') },
	{ path: '/logout', name: 'logout', component: () => import('../views/Logout.vue') },
	{ path: '/dashboard', name: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { requiresAuth: true } },
	{ path: '/block/:blockId', name: 'block', component: () => import('../views/Block.vue'), props: true, meta: { requiresAuth: true } },
	{ path: '/block/:blockId/quiz', name: 'block-quiz', component: () => import('../views/Quiz.vue'), props: true, meta: { requiresAuth: true } },
	{ path: '/hr', name: 'hr', component: () => import('../views/hr/HrDashboard.vue'), meta: { requiresAuth: true, requiresHR: true } },
	{ path: '/hr/user/:userId', name: 'hr-user', component: () => import('../views/hr/HrUserDetail.vue'), props: true, meta: { requiresAuth: true, requiresHR: true } },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to) => {
	const auth = useAuthStore()
	if (to.name === 'home' && auth.isAuthenticated) {
		return { name: 'dashboard' }
	}
	if (to.meta?.requiresAuth && !auth.isAuthenticated) {
		return { name: 'login', query: { redirect: to.fullPath } }
	}
	if (to.meta?.requiresHR && !auth.isHR) {
		return { name: 'dashboard' }
	}
	return true
})

export default router
