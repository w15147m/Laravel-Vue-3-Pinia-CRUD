import './bootstrap';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import PostComp from './components/PostComp.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


createApp(PostComp)
.use(createPinia())
.use(VueSweetalert2)
.mount('#app');
