<template>
    <div id="app">
        <div id="touchArea"></div>
        <router-view
            :store-data="storeData"
            :cart="oCart"
            :order-state="nOrderState"
            :position="nPosition"
            @add="add"
            @order="order"
            @complete="complete">
        </router-view>
    </div>
</template>

<script>

import ajax from './js/ajax';

export default {
    name: 'app',
    data () {
        return {
            storeData: {
                primaryCatas: [],
                menu: {},
            },
            oCart: {
                total: 0,
                list: [],
            },
            oOrder: null,
            // bPaid: false, // 付款成功时，清空购物车；
            // bComplete: false, // 用户点击已上齐，则点餐结束，清空订单详情
            // 付款成功后，nOrderState变为1，清空购物车，首页可以查看订单详情
            // 用户点击已上齐，则点餐结束，清空订单详情，nOrderState变为0
            nOrderState: 1,
            // 在操作方向有影响的情况下，例如进入购物车。0为当前方向，1为对向
            nPosition: 0,
        }
    },
    methods:{
        // 两款商品可以同名但id肯定不同，如果用户买了两个同名商品，这里用id来区分
        add(sCata, oItem){
            let oFound = this.oCart.list.find(item=>{
                return item.id === oItem.id;
            });
            if(oFound){
                oFound.amount++;
            }
            else{
                this.oCart.list.push({
                    id: oItem.id,
                    amount: 1,
                    price: oItem.price,
                    name: oItem.name,
                });
            }
        },
        order(){
            if(this.oCart.list.length){
                this.oCart.list.forEach(item=>{
                    console.log(item.name + '：' +
                            (item.price/100)+'x'+item.amount);
                });
            }
        },
        complete(){
            this.nOrderState = 0;
        },
    },
    mounted(){
        ajax.ajax_get('./server-side/merchants/testMerchant/testStore/config.json', res=>{
            let oConfig = JSON.parse(res);
            this.storeData.primaryCatas = oConfig.primaryCatas;
            this.storeData.menu = oConfig.menu;
        }, err=>{
            alert('读取店铺配置失败：' + err);
        });
    },
}
</script>

<style lang="scss">
@import "./scss/common.scss";

#app{
    background-color: pink;
    #touchArea{
        width: $TOUCH_WIDTH;
        height: $TOUCH_HEIGHT;
        position: relative;
        top: $TOUCH_TOP;
        left: $TOUCH_LEFT;
        background: gray;
    }
}
</style>
