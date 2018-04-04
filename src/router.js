'use strict';

import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App';
import games from './components/games/games.vue';
import main_menu from './components/main_menu.vue';
import ordering from './components/ordering/ordering.vue';
import cart from './components/ordering/cart.vue';
import pay from './components/ordering/pay.vue';
import payCode from './components/ordering/payCode.vue';

const routes = [
    { path: '/', component: App },
    { path: '/games', component: games },
    { path: '/main_menu', component: main_menu },
    { path: '/ordering', component: ordering },
    { path: '/cart', component: cart },
    { path: '/pay', component: pay },
    { path: '/payCode', component: payCode },
];

const router = new VueRouter({
    routes,
});

export {router};
