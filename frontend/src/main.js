import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as TablerIcons from '@tabler/icons-vue';


const app = createApp(App)


Object.entries(TablerIcons).forEach(([name, component])=>{
    app.component(name, component)
})
// pinia persisted
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.directive('number', {
  mounted:(el) => {
    el.addEventListener('input', (e)=>{
       e.target.value = e.target.value.replace(/\d/, '')
    })
  }
})

// element
app.use(ElementPlus)



// route
app.use(router)

app.mount('#app')
