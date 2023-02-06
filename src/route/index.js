import { createRouter,createWebHashHistory } from "vue-router";

const routes= [
	{
			path: '/',
			component: () => import('@/views/index.vue'),
			name: 'home'
	},
	{
		path: '/rabbit',
		component: () => import('@/views/rabbit/index.vue'),
		name: 'rabbit'
	},
	{
		path: '/mainScene',
		component: () => import('@/views/rabbit/mainScene.vue'),
		name: 'mainScene'
	},
]
const router = createRouter({
	routes,
	history:createWebHashHistory()
})

export default router;