import './assets/main.css'

// import { createPinia } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css';

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)
// const pinia = createApp(pinia)

app.use(router)

app.mount('#app')

app.use(store)

app.use(VueAwesomePaginate)