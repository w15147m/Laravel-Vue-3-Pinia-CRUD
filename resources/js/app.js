import './bootstrap';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import PostComp from './components/PostComp.vue';

createApp(PostComp)
.use(createPinia())
.mount('#app');
