<template>
    <dial-component
            :items="primaryCatas"
            :diameter="220"
            :icon-dir="'./server-side/public/images/icons/main_menu/'"
            :icon-type="'png'"
            @dial-enter="routes">
    </dial-component>
</template>

<script>

import ajax from '../../js/ajax';
import dial from './dial';

export default {
    name: 'main_menu',
    components: {
        'dial-component': dial,
    },
    data () {
        return {
            primaryCatas:[],
        }
    },
    methods: {
        routes(sCata){
            this.$router.push(sCata);
        }
    },
    mounted(){
        ajax.ajax_get('./server-side/merchants/testMerchant/testStore/config.json', res=>{
            let oConfig = JSON.parse(res);
            this.primaryCatas = oConfig.primaryCatas;
        }, err=>{
            alert('读取店铺配置失败：' + err);
        });
    }
}
</script>

<style scoped lang="scss">

</style>
