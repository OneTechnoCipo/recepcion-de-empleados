import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './style.css'

// Primary application entry point that bootstraps the Vue framework instance, 
// mounts global styling, and injects routing logic.

createApp(App)
    .use(router)
    .mount('#app')