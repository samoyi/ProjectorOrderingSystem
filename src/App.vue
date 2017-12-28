<template>
    <div id="app">
        <div id="touchArea"></div>
        <router-view
            :store-data="storeData"
            :cart="aCart"
            @add="add"
            @order="order">
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
            aCart: [],
            oOrder: null,
        }
    },
    methods:{
        // 两款商品可以同名但id肯定不同，如果用户买了两个同名商品，这里用id来区分
        add(sCata, oItem){
            let oFound = this.aCart.find(item=>{
                return item.id === oItem.id;
            });
            if(oFound){
                oFound.amount++;
            }
            else{
                this.aCart.push({
                    id: oItem.id,
                    amount: 1,
                    price: oItem.price,
                    name: oItem.name,
                });
            }
        },
        order(){
            if(this.aCart.length){
                this.aCart.forEach(item=>{
                    console.log(item.name + '：' +
                            (item.price/100)+'x'+item.amount);
                });
            }
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
