import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './style.css'

// Archivo de entrada principal que inicializa la aplicación de Vue, 
// monta el enrutador y conecta los estilos globales en el navegador.

createApp(App)
    .use(router)
    .mount('#app')