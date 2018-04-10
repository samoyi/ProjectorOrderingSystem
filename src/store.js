'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        // 店铺数据
        storeData: {
            primaryCatas: [],
            menu: {},
        },

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

        // 付款成功后，nOrderState变为1，清空购物车，首页可以查看订单详情
        // 用户点击已上齐，则点餐结束，清空订单详情，nOrderState变为0
        nOrderState: 0,
    },
    getters: {
        // 当前购物车商品总金额
        nCartAmount(state){
            let nTotal = 0;
            state.oCart.list.forEach(item=>{
                nTotal += item.price*item.amount/100;
            });
            return nTotal;
        },

        // 点击“已上齐”之前的若干笔支付的总金额
        nOrderTotal(state){
            return state.oOrder.list.map(item=>item.total)
                        .reduce((accr, cur)=>{return accr + cur}, 0);
        },
    },
    mutations: {

        // 加载店铺
        loadStoreData(state, oConfig){
            state.storeData = oConfig;
        },

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

        // 支付成功
        paySuccess(state){
            state.oCart = { // 清空购物车
                list: [],
            };
            state.nOrderState = 1;
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
            state.nOrderState = 0;
        },
    },
});

export {store};
