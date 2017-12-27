<template>
    <div id="app">
        <div id="touchArea"></div>
        <router-view
            :store-data="storeData">
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
            }
        }
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
