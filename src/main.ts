import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from '@/route/index'
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App)
app.use(router)
app.use(pinia)
.mount('#app')
