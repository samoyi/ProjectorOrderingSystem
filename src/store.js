'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    // strict: true,
    strict: process.env.NODE_ENV !== 'production',
    state: {
        // 在操作方向有影响的情况下，例如进入购物车。0为当前方向，1为对向
        // 用于计算元素显示时的rotete是0还是180
        nPosition: 0,

        // 购物车数据
        oCart: {
            total: 0, // 购物车商品总金额
            list: [
            ], // 商品列表
        },
    },
    getters: {
        // 这里吧购物车总金额单独出来作为了getter，不过组件里使用总金额的地方还都是使
        // 用oCart.total。
        nCartAmount(state){
            let nTotal = 0;
            state.oCart.list.forEach(item=>{
                nTotal += item.price*item.amount/100;
            });
            return nTotal;
        },
    },
    mutations: {
        changePosition(state, nStatus){
            if(nStatus===1){
                state.nPosition = 1;
            }
            else if(nStatus===0){
                state.nPosition = 0;
            }
            else{
                throw new RangeError('nPosition must be 0 or 1');
            }
        },
        addToCart(state, oItem){
            state.oCart.list.push(oItem);
        },
        setCartTotal(state, nTotal){
            state.oCart.total = nTotal;
        },
        emptyCart(state){
            state.oCart = {
                total: 0,
                list: [],
            };
        },
    },
});

export {store};
