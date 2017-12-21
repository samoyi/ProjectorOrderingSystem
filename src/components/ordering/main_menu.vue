<template>
    <dial-component
            :items="primaryCatas"
            :diameter="220"
            :icon-dir="'./server-side/public/images/icons/main_menu/'"
            :icon-type="'png'">
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
        // rotateIconWrapper(count, index){
        //     if(count<1 || count>4){
        //         alert('主菜单图标数量至少一个最多四个');
        //         return;
        //     }
        //
        //     let oStyle = {};
        //
        //     if(count===2){
        //         if(index){
        //             oStyle.transform = 'rotateZ(180deg)';
        //         }
        //     }
        //
        //     if(count===3){
        //         if(index===1){
        //             oStyle.transform = 'rotateZ(120deg)';
        //         }
        //         else if(index===2){
        //             oStyle.transform = 'rotateZ(240deg)';
        //         }
        //     }
        //
        //     if(count===4){
        //         if(index===1){
        //             oStyle.transform = 'rotateZ(90deg)';
        //         }
        //         else if(index===2){
        //             oStyle.transform = 'rotateZ(180deg)';
        //         }
        //         else if(index===3){
        //             oStyle.transform = 'rotateZ(270deg)';
        //         }
        //     }
        //     return oStyle;
        // },
        enter(sRoute){
            this.$router.push(sRoute);
        },
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
