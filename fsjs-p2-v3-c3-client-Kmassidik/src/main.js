import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
let pinia = createPinia()

app.use(vue3GoogleLogin, {
    clientId: '728100902051-q8n8sa5e3ubnrlpvkkgqj84k9090eb8g.apps.googleusercontent.com'
})

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
