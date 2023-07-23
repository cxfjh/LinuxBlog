import '../assets/font/iconfont.css';

import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// 全局组件
import ArticleListing from './components/article/ArticleListing.vue';
import MessageAlert from './components/modals/MessageAlert.vue';
import BookmarkActions from './components/layouts/BookmarkActions.vue';
import ConfirmDialog from './components/modals/ConfirmDialog.vue';
import PopupMenu from './components/modals/PopupMenu.vue';
import HeaderNavigation from './components/layouts/HeaderNavigation.vue';

app.component(ArticleListing.name, ArticleListing);
app.component(MessageAlert.name, MessageAlert);
app.component(BookmarkActions.name, BookmarkActions);
app.component(HeaderNavigation.name, HeaderNavigation);
app.component(ConfirmDialog.name, ConfirmDialog);
app.component(PopupMenu.name, PopupMenu);

// pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

// 路由
import router from './router/index.js';
app.use(router);

// UI库
import Varlet from '@varlet/ui';
import '@varlet/ui/es/style';
app.use(Varlet);

// axios
import axios from 'axios';
axios.defaults.baseURL = 'https://j464g00137.zicp.fun/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
app.config.globalProperties.$ajax = axios;

app.mount('#app');
