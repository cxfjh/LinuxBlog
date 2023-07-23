import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../views/Home.vue';
import Publish from '../views/Publish.vue';
import User from '../views/User.vue';

import userLogin from '../permissions/userLogin.vue';
import userRegistration from '../permissions/userRegistration.vue';
import userLikes from '../permissions/userLikes.vue';
import userArticles from '../permissions/userArticles.vue';
import userComments from '../permissions/userComments.vue';
import userFavorites from '../permissions/userFavorites.vue';

import userSettings from '../pages/userSettings.vue';
import searchPanel from '../pages/searchPanel.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { name: 'home', path: '/home', meta: { keepAlive: true }, component: Home },
        { name: 'publish', path: '/publish', meta: { keepAlive: true }, component: Publish },
        { name: 'user', path: '/user', meta: { keepAlive: true }, component: User },
        { name: 'userlogin', path: '/userlogin', meta: { keepAlive: true }, component: userLogin },
        { name: 'userregistration', path: '/userregistration', meta: { keepAlive: true }, component: userRegistration },
        { name: 'userlikes', path: '/userlikes', meta: { keepAlive: true }, component: userLikes },
        { name: 'userarticles', path: '/userarticles', meta: { keepAlive: true }, component: userArticles },
        { name: 'usercomments', path: '/usercomments', meta: { keepAlive: true }, component: userComments },
        { name: 'userfavorites', path: '/userfavorites', meta: { keepAlive: true }, component: userFavorites },
        { name: 'usersettings', path: '/usersettings', meta: { keepAlive: true }, component: userSettings },
        { name: 'searchpanel', path: '/searchpanel', meta: { keepAlive: true }, component: searchPanel },
    ]
})

router.beforeEach((to, from, next) => {
    if ((to.path == '/publish' || to.path == '/userarticles' || to.path == '/userlikes' || to.path == '/userfavorites' || to.path == '/usercomments') && !localStorage.getItem('token')) {
        return next({ path: '/userlogin' })
    }
    next()
})

export default router