import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { NhostClient } from '@nhost/vue'
import { createApolloClient } from '@nhost/apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

export const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION
})

const apolloClient = createApolloClient({ nhost })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(nhost)
app.use(PrimeVue)
app.use(ToastService)

app.provide(DefaultApolloClient, apolloClient)

router.isReady().then(() => {
  app.mount('#app')
})
