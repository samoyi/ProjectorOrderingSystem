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

        // 一个顾客的总订单。如果这个顾客支付了好几次，则都会汇集到oOrder里面
        oOrder: {
            curPaymentMethod: '', // 当前支付时选择的支付方式
            // 一个订单完成后，会把[购买物品、支付方式、支付时间]加入list
            // 一个用户在点击“上齐了”之前的每次支付生成一个订单，汇集到oOrder里
            list: [],
            total: 0, // 总订单价格
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
        nOrderTotal(state){
            return state.oOrder.list.map(item=>item.total)
                        .reduce((accr, cur)=>{return accr + cur}, 0);
        },
    },
    mutations: {
        // 设定当前的显示方向
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
        // 将一个商品加入购物车
        addToCart(state, oItem){
            state.oCart.list.push(oItem);
        },
        // 支付成功之后清空购物车
        emptyCart(state){
            state.oCart = {
                // total: 0,
                list: [],
            };
        },
        // 购物车里点击减号
        minusAmount(state, sID){
            state.oCart.list.find(item=>item.id===sID).amount--;
        },
        // 购物车里点击加号
        addAmount(state, sID){
            state.oCart.list.find(item=>item.id===sID).amount++;
        },
        // 记录当前支付方法（支付宝或微信），用于在总订单列表中显示每笔支付方法
        recordCurPaymentMethod(state, sMethod){
            state.oOrder.curPaymentMethod = sMethod;
        },
        // 将新支付的一笔订单加入总订单
        pushOrder(state, order){
            state.oOrder.list.push(order);
        },
        // 点击“已上齐”按钮，清空订单记录
        complete(state){
            state.oOrder = {
                curPaymentMethod: '',
                list: [],
                total: 0,
            };
        },
    },
});

export {store};
