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

// import vue sweet alert package
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)


app.use(router)

app.mount('#app')

app.use(store)

app.use(VueAwesomePaginate)

app.use(VueSweetalert2)