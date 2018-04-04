import Vue from 'vue'
// import VueRouter from 'vue-router';
// import Vuex from 'vuex';
import App from './App';




// router ----------------------------------------------------------------------
// Vue.use(VueRouter);
//
// import App from './App';
// import games from './components/games/games.vue';
// import main_menu from './components/main_menu.vue';
// import ordering from './components/ordering/ordering.vue';
// import cart from './components/ordering/cart.vue';
// import pay from './components/ordering/pay.vue';
// import payCode from './components/ordering/payCode.vue';
//
// const routes = [
//     { path: '/', component: App },
//     { path: '/games', component: games },
//     { path: '/main_menu', component: main_menu },
//     { path: '/ordering', component: ordering },
//     { path: '/cart', component: cart },
//     { path: '/pay', component: pay },
//     { path: '/payCode', component: payCode },
// ];
//
// const router = new VueRouter({
//     routes,
// });


// Vuex ------------------------------------------------------------------------
// Vue.use(Vuex);
//
// const store = new Vuex.Store({
//     state: {
//         nPosition: 1,
//     },
//     mutations: {
//         changePositionStatus(state, nStatus){
//             if(nStatus===1){
//                 state.nPosition = 1;
//             }
//             else if(nStatus===0){
//                 state.nPosition = 0;
//             }
//             else{
//                 throw new RangeError('nPosition must be 0 or 1');
//             }
//         },
//     },
// })
import {store} from './store';
import {router} from './router';


// 按钮点击时的动画
// 这个方法必须要放在Vue实例化之前
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
    store,
    render: h => h(App)
});







// 默认两个触摸点时触发右键菜单，这里禁止
document.addEventListener('contextmenu', (ev)=>{
    ev.preventDefault();
});
