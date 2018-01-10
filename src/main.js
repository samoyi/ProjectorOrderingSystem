import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App';
import game from './components/game';
import main_menu from './components/ordering/main_menu.vue';
import ordering from './components/ordering/ordering.vue';
import cart from './components/ordering/cart.vue';
import pay from './components/ordering/pay.vue';
import payCode from './components/ordering/payCode.vue';

const routes = [
    { path: '/', component: App },
    { path: '/game', component: game },
    { path: '/main_menu', component: main_menu },
    { path: '/ordering', component: ordering },
    { path: '/cart', component: cart },
    { path: '/pay', component: pay },
    { path: '/payCode', component: payCode },
];

const router = new VueRouter({
    routes,
});


// 按钮点击时的动画
Vue.directive('btnTouchAni', {
    inserted: btn=>{
        btn.addEventListener('touchstart', ()=>{
            btn.style.transform = 'scale3d(0.9, 0.9, 0.9)';
        });
        btn.addEventListener('touchend', ()=>{
            btn.style.transform = 'scale3d(1, 1, 1)';
        });
    },
});



new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
