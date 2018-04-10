import Vue from 'vue'
import App from './App';

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
